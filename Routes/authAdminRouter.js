const express = require("express");
const router = express.Router();

const { signUp } = require("../BL/signUpAdminLogic");
const { login } = require("../BL/loginAdminLogic");

const { AuthError } = require("../BL/authUserTools");

router.post("/admin/register", async (req, res) => {
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

router.post("/admin/login", async (req, res) => {
  try {
    console.log("login: request", req.body);
    const data = await login(req.body);
    res.send(data);
  } catch (err) {
    console.log(err);
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

module.exports = router;
