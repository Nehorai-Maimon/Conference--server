const users = require("../../DL/controllers/userController");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const generatePassword = require("../../Utils/generatePassword");
const { validateCreateUserBody } = require("./userValidation");
const sendMail = require("../../Utils/sendMail");

const getAllUsers = async () => {
  // const allUsers = await users.read();
  const allUsers = await users.read({ isActive: { $ne: false } });
  return allUsers;
};

const getOneUser = async (email) => {
  try {
    const user = await users.readOne({ email: email });
    user.password = undefined;
    return user;
  } catch {
    throw ({ code: 404, message: "not find a user" });
  }
};

const createUser = async (data, token) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    userType,
    discountPercent,
    creditMonth,
    creditBalance,
    password,
  } = data;
  // === AUTH CHECK & PERMISSIONS ===
  const isTokenAdmin = token?.includes("admin"); // ! this is a fake check for DEV only!
  //TODO: check if the request have an authorization to create member and admin (check the token)
  if (!isTokenAdmin && userType !== "user") {
    throw new Error("Unauthorized");
  }
  if (!isTokenAdmin && !password) {
    throw new Error("must have a password");
  }

  // ? Business Rule: only member and admin can have discount and credit
  if (userType === "user") {
    delete discountPercent;
    delete creditMonth;
    delete creditBalance;
  }

  const validationErrors = validateCreateUserBody(data);
  if (validationErrors.length) {
    throw new Error(validationErrors.join(";"));
  }

  const upsertRes = await upsertUser(data);

  if (isTokenAdmin && upsertRes.type === "create") {
    const { email, password, firstName, lastName } = upsertRes.data;
    sendMailToNewUser({ email, password, firstName, lastName });
  }

  return upsertRes.data;
};

async function findUserIdByPhone(phone) {
  const readRes = await users.read({
    phone: phone,
  });
  const foundUserId = readRes.length ? readRes[0]._id.valueOf() : null;
  return foundUserId;
}

/**
 * Check if a user have already the same phone
 *
 * If yes,
 *  update this user
 *
 * Else,
 *  create a new user
 *
 * @param {object} data - all the user data
 * @returns object with id of the updated/created user
 */
async function upsertUser(data) {
  const {
    firstName,
    lastName,
    email,
    phone,
    userType,
    discountPercent,
    creditMonth,
    creditBalance,
    password,
  } = data;

  // ? Business Rule: a client exist if he has the same phone
  const foundUserId = await findUserIdByPhone(phone);

  if (foundUserId) {
    // ? We do not update the phone and email because they are unique and we need the phone to find the client in the first place
    const updateRes = await users.update(foundUserId, {
      firstName,
      lastName,
      discountPercentage: discountPercent,
      creditsData: {
        monthlyCredits: creditMonth,
        currentMonthBalance: creditBalance,
      },
      isAdmin: userType === "admin",
      isSubscribed: userType === "member" || userType === "admin",
    });
    console.log("\n\nUPDATE USER RES\n", updateRes);
    return { type: "update", data: updateRes };
  } else {
    const createRes = await users.create({
      firstName,
      lastName,
      email,
      phone,
      discountPercentage: discountPercent,
      creditsData: {
        monthlyCredits: creditMonth,
        currentMonthBalance: creditBalance,
      },
      password: password ? password : generatePassword(),
      isAdmin: userType === "admin",
      isSubscribed: userType === "member" || userType === "admin",
    });
    console.log("\n\nCREATE USER RES\n", createRes);
    return { type: "create", data: createRes };
  }
}

async function sendMailToNewUser(userData) {
  const { email, password, firstName, lastName } = userData;
  const emailTemplate = createNewUserEmailTemplate({
    password,
    firstName,
    lastName,
  });

  try {
    const emailRes = await sendMail(
      {
        email: process.env.BINYAMIN_TECH_EMAIL,
        name: process.env.BINYAMIN_TECH_NAME,
      },
      { email: email, name: `${firstName} ${lastName}` },
      emailTemplate
    );
    console.log("Email has been sent to " + email);
    console.log(emailRes);
  } catch (error) {
    console.error(
      "New user created from backoffice, Email failed to send. " + email
    );
    console.error(error);
  }
}

async function deleteUser(userId) {
  try {
    const res = await users.delete(userId);
    return res;
  } catch (error) {
    throw error;
  }
}

function createNewUserEmailTemplate(userData) {
  const { password, firstName, lastName } = userData;
  const htmlContent = `<html lang="en">
  <body>
      <h1>BinyaminTech has created a user for you! </h1>
      <p>
          Hello ${firstName} ${lastName}, <br/>
          As a member of BinyaminTech, we created for you a user. <br/>
          You username is this email. <br/>
          And your password is: <b>${password}</b>
      </p>
      <p>
          We created a Application for renting rooms in BinyaminTech!
      </p>
      <a href="${process.env.BINYAMIN_TECH_URL}">
          <button>Go to app</button>
      </a>
  </body>
  </html>`;
  const subject = "BinyaminTech has created a user for you!";
  return { htmlContent, subject };
}

module.exports = { getAllUsers, getOneUser, createUser, deleteUser };
