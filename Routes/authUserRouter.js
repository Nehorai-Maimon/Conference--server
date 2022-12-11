const express = require("express");
router = express.Router();

const { SMSError, normalizePhone } = require("../BL/smsVerificaion");

const { sendSmsWith091, verifySmsCode } = require("../BL/loginLogic");
const { signUp } = require("../BL/register");
const { AuthError } = require("../BL/authUserTools");

router.post("/register", async (req, res) => {
  try {
    console.log("register: request", req.body);
    const data = await signUp(req.body);
    res.send(data);
  } catch (err) {
    if (err instanceof AuthError) {
      res.status(401).send({
        error: err.message,
        code: err.code,
      });
    } else {
      res.status(500).send({
        error: err.message,
        code: err.code,
      });
    }
  }
});

router.post("/sendsms/:register", async (req, res) => {
  try {
    console.log("sendsms: request", req.params);
    const data = await sendSmsWith091(req.body.phone, req.params.register === "true");
    console.log("🚀 ~ file: authUserRouter.js ~ line 34 ~ router.post ~ data", data)
    res.send(data);
  } catch (err) {
    if (err instanceof SMSError) {
      res.status(401).send({
        error: err.message,
        code: err.code,
      });
    } else {
      res.status(500).send({
        error: err.message,
      });
    }
  }
});

router.post("/verify-sms-register", async (req, res) => {
  try {
    const phone = normalizePhone(req.body.phone);
    console.log("verify: request", req.body);
    if (!req.body.shipment_id || !req.body.code || !req.body.phone) {
      console.log("hkhjvj");

      throw new SMSError("Missing fields", 6);
    }
    const data = await verifySmsCode(
      req.body.shipment_id,
      phone,
      req.body.code,
      true
    );
    console.log("🚀 ~ file: authUserRouter.js ~ line 96 ~ router.post ~ data", data)
    res.send(data);
  } catch (err) {
    if (err instanceof SMSError) {
      console.log("🚀 ~ file: authUserRouter.js ~ line 101 ~ router.post ~ err", err)
      res.status(401).send({
        error: err.message,
        code: err.code,
      });
    } else {
      console.log("aquiiii");
      res.status(500).send({
        error: err.message,
      });
    }
  }
});

router.post("/verify", async (req, res) => {
  try {
    const phone = normalizePhone(req.body.phone);
    console.log("verify: request", req.body);
    if (!req.body.shipment_id || !req.body.code || !req.body.phone) {
      console.log("hkhjvj");

      throw new SMSError("Missing fields", 6);
    }
    const data = await verifySmsCode(
      req.body.shipment_id,
      phone,
      req.body.code
    );
    console.log(data);
    res.send(data);
  } catch (err) {
    console.log("🚀 ~ file: authUserRouter.js ~ line 65 ~ router.post ~ err", err)
    if (err instanceof SMSError) {
      res.status(401).send({
        error: err.message,
        code: err.code,
      });
    } else {
      console.log("aquiiii");
      res.status(500).send({
        error: err.message,
      });
    }
  }
});



module.exports = router;
