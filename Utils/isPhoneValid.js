/**
 * This only check if the phone is a valid israeli cellphone number
 */
function isPhoneValid(phone) {
  return /05[\d]{8}/.test(phone);
}

module.exports = isPhoneValid;
