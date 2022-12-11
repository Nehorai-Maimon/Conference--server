// @ts-check
require("dotenv").config();
const users = require("../DL/controllers/userController");
const bcrypt = require("bcrypt");
const { normalizePhone } = require("./smsVerificaion");
const { createUserToken, AuthError } = require("./authUserTools");
// require("../DL/db").connect();

/**
 * @param {object} user
 * @return {Promise<object>}
 */ 4;

const signUp = async (user) => {
  const phone = normalizePhone(user.phone);
  const exists = await users.readOne({ phone: phone });
  if (exists) throw new AuthError("User already exist", 3);
  const hash = await bcrypt.hash(user.password, 10);
  const newUser = await users.create({ ...user, password: hash, phone: phone });
  return createUserToken(newUser);
};

const user = {
  firstName: "laura",
  lastName: "laura",
  email: "laura@gmail.com",
  phone: "0546722900",
  password: "0987",
};

// signUp(user);

module.exports = { signUp };
