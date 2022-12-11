const isEmailValid = require("../../Utils/isEmailValid");
const isPhoneValid = require("../../Utils/isPhoneValid");

function validateCreateUserBody(data) {
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

  const errors = [];

  if (!firstName) {
    errors.push("firstName must not be empty");
  }
  if (password && (password.length < 4 || password.length > 12)) {
    errors.push("password is not valid");
  }
  if (!lastName) {
    errors.push("lastName must not be empty");
  }
  if (!isEmailValid(email)) {
    errors.push("email must be valid");
  }
  if (!isPhoneValid(phone)) {
    errors.push("phone must be valid");
  }
  if (!["member", "admin", "user"].includes(userType)) {
    errors.push("userType must be one of ['member', 'admin', 'user']");
  }
  if (
    !discountPercent ||
    isNaN(discountPercent) ||
    parseInt(discountPercent) < 0 ||
    parseInt(discountPercent) > 100
  ) {
    errors.push("discountPercent must be a percentage");
  }
  if (
    !creditMonth ||
    isNaN(creditMonth) ||
    parseInt(creditMonth) < 0 ||
    parseInt(creditMonth) > 400
  ) {
    errors.push("creditMonth is not valid");
  }
  if (
    !creditBalance ||
    isNaN(creditBalance) ||
    parseInt(creditBalance) < 0 ||
    parseInt(creditBalance) > 400
  ) {
    errors.push("creditBalance is not valid");
  }
  return errors;
}

module.exports = { validateCreateUserBody };
