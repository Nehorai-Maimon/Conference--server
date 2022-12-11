const axios = require("axios").default;
const general = require("../DL/controllers/generalController");
const jwt = require("jsonwebtoken");
const { getXML } = require("./xmlTools");

class AuthError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const createVerificationCode = (digits = 4) => {
  const lowest = Math.pow(10, digits - 1);
  const hightest = Math.pow(10, digits) - 1;
  const code = Math.floor(Math.random() * (hightest - lowest)) + lowest;
  return code.toString();
};

/**
 *
 * @param {object} user
 * @returns {{auth_token: string}}
 */
const createUserToken = ({ email }) => {
  const token = jwt.sign(
    {
      email,
    },
    process.env.RANDOM_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
  return { auth_token: token };
};

const api = axios.create({
  baseURL: "https://www.019sms.co.il/api",
});

const getTokenSms = async () => {
  try {
    const xml = getXML({
      getApiToken: {
        user: {
          username: "חבלבנימין",

          password: "Btech@2022",
        },
        username: "חבלבנימין",
        action: "new",
      },
    });
    const res = await api.post("/", xml, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
    const newToken = res.data.message;
    const createToken = await general.create({
      message: newToken,
    });
    console.log("🚀 ~ file: authUserTools.js ~ line 62 ~ getTokenSms ~ createToken", createToken)
    api.defaults.headers.common["Authorization"] = `bearer ${createToken.message}`
    return createToken;
  } catch (err) {
    console.error(err);
  }
};
// TODO: refresh evrey 24 month: getTokenSms()


module.exports = {
  createVerificationCode,
  createUserToken,
  api,
  getTokenSms,
  AuthError,
};
