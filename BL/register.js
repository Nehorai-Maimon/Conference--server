// @ts-check
require("dotenv").config();
const users = require("../DL/controllers/userController");
const bcrypt = require("bcrypt");
const { normalizePhone } = require("./smsVerificaion");
const { createUserToken, AuthError } = require("./authUserTools");

/**
 * @param {object} user
 * @return {Promise<object>}
 */
const signUp = async (user) => {
  // const phone = normalizePhone(user.phone);

  const exists = await users.readOne({ email: user.email });
  console.log("🚀 ~ file: register.js ~ line 15 ~ signUp ~  exists", exists)
  if (exists) throw new AuthError("User already exist", 3);
  let newUser;
  if (user.password) {
    const hash = await bcrypt.hash(user.password, 10);
    newUser = await users.create({ ...user, password: hash, });
  } else if (user.phone) {
    newUser = await users.create({ ...user, phone: user.phone });

  }
  return createUserToken(newUser);
};

module.exports = { signUp };
