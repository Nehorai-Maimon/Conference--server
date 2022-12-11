const { parsePhoneNumber } = require("libphonenumber-js");
const sms = require("../DL/models/sms");
const CODE_EXPIRATION_TIME = 5 * 60 * 1000;

class SMSError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

/**
 * @param {string} phone
 * @param {string} code
 * @param {string} shipment_id
 */
async function createSMSCode(phone, code, shipment_id) {
  await sms.create({
    shipment_id,
    code,
    phone,
  });
}

/**
 *
 * @param {string} shipment_id
 * @param {string} phone
 * @param {string} code
 * @returns {Promise<string>}
 */
async function verifySMSCode(shipment_id, phone, code) {
  console.log("🚀 ~ file: smsVerificaion.js ~ line 33 ~ verifySMSCode ~ phone", phone)
  const item = await sms.findOneAndUpdate(
    { shipment_id, phone },
    { $inc: { trials: 1 } }
  );

  if (!item) {
    throw new SMSError("Wrong shipment_id", 1);
  }

  if (item.trials > 3) {
    throw new SMSError("Too many trials", 2);
  }

  if (item.code !== code) {
    throw new SMSError("Wrong code", 3);
  }

  if (item.created_at + CODE_EXPIRATION_TIME < Date.now()) {
    throw new SMSError("Code expired", 4);
  }

  return item.phone;
}
/**
 *
 * @param {string} phone
 */
function normalizePhone(phone) {
  return parsePhoneNumber(phone, "IL")
    .format("E.164")
    .replace("+", "")
    .replace(/\s/g, "");
}

module.exports = {
  SMSError,
  normalizePhone,
  createSMSCode,
  verifySMSCode,
};
