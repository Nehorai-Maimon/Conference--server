// @ts-check
require("dotenv").config();
const { getXML, xmlHeaders } = require("./xmlTools");
const users = require("../DL/controllers/userController");
const {
  createSMSCode,
  verifySMSCode,
  normalizePhone,
  SMSError,
} = require("./smsVerificaion");
const {
  createVerificationCode,
  createUserToken,
  api,
} = require("./authUserTools");

/**
 *
 * @param {string} userPhone
 * @returns
 */
const sendSmsWith091 = async (userPhone, register) => {
  const phone = normalizePhone(userPhone);
  console.log("DESPUES:", phone);
  const exist = await users.readOne({ phone: userPhone });
  console.log("🚀 ~ file: loginLogic.js ~ line 26 ~ sendSmsWith091 ~ exists", exist)
  if (register) {
    if (exist) {
      throw new SMSError("User already exist", 5);
    }
  } else if (!exist) {
    throw new SMSError("user phone not found", 5);
  }

  const code = createVerificationCode(6);
  const xml = getXML({
    sms: {
      user: {
        username: "חבלבנימין",
      },
      source: "0525666679",
      destinations: {
        phone,
      },
      tag: "#",
      message: `קוד האימות שלך הוא ${code}`,
    },
  });

  const authHeaders = {
    Authorization: `Bearer ${process.env.GENERAL_TOKEN}`,
  };

  /**
   * @typedef {{status: number; message: string; shipment_id: string}} SMSResponse
   */
  const res = await api.post("/", xml, {
    headers: { ...xmlHeaders, ...authHeaders },
  });

  /**
   * @type {SMSResponse}
   */
  const data = res.data;
  if (data.status === 0) {
    await createSMSCode(phone, code, data.shipment_id);
    console.log(data.shipment_id);
  }
  console.log("koko", data);
  return data;
};

/**
 * @param {string} shipment_id
 * @param {string} userPhone
 * @param {string} code
 */
const verifySmsCode = async (shipment_id, userPhone, code, register = false) => {
  const phone = await verifySMSCode(shipment_id, userPhone, code);
  const denormalizedPhone = phone.replace("972", "0")
  let user = await users.readOne({ phone: denormalizedPhone });
  if (register) {
    if (user) {
      throw new SMSError("User already exist", 5)
    }
    return true
  } else if (!user) { throw new SMSError("User not found", 5) };
  return createUserToken(user);
};

// sendSmsWith091("0585377756");
// const get = async () => {
//   const res = await users.read();
//   console.log(res);
// };
// get();

// users.readOne({ phone: "972585377756" }).then((user) => {
//   console.log(user);
// });

module.exports = { sendSmsWith091, verifySmsCode };
