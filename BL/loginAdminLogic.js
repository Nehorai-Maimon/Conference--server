const users = require("../DL/controllers/userController");
const { normalizePhone } = require("./smsVerificaion");
const bcrypt = require("bcrypt");
// require("../DL/db").connect();

const { AuthError, createUserToken } = require("../BL/authUserTools");

/**
 * @param {object} input
 * @return {Promise<object>}
 */

const login = async (input) => {
  const phone = normalizePhone(input.phone);
  let user = await users.readOne({ phone }, { password: 1 });
  if (!user) throw new AuthError("User not found", 1);
  const match = await bcrypt.compare(input.password, user.password);
  if (!match) throw new AuthError("Wrong password", 2);
  user = await users.readOne({ phone });
  return createUserToken(user);
};

// login({ phone: "0546722900", password: "0987" });

module.exports = { login };
