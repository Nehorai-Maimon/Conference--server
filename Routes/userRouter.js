const express = require("express");
const router = express.Router();
const userLogic = require("../BL/user/userLogic");
const auth = require("../Middleware/auth");

// router.use(auth);

router.get("/", async (req, res) => {
  try {
    res.send(await userLogic.getAllUsers());
  } catch (err) {
    res.status(400).send({ errors: err.message?.split(";") });
  }
});

router.get("/oneUser", auth, async (req, res) => {
  try {
    const email = req.body.email;
    const user = await userLogic.getOneUser(email);
    res.send(user);
  } catch (err) {
    res.status(400).send({ errors: err.message?.split(";") });
  }
});

router.post("/", async (req, res) => {
  const token = req.headers.authorization;

  try {
    res.send(await userLogic.createUser(req.body, token));
  } catch (err) {
    res.status(400).send({ errors: err.message?.split(";") });
  }
});

router.delete("/:id", async (req, res) => {
  const token = req.headers.authorization;

  try {
    res.send(await userLogic.deleteUser(req.params.id, token));
  } catch (err) {
    res.status(400).send({ errors: err.message?.split(";") });
  }
});

module.exports = router;
