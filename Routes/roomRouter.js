const express = require("express"),
  router = express.Router();
const roomLogic = require("../BL/room/roomLogic");
const auth = require("../Middleware/auth");

router.get("/", async (req, res) => {
  try {
    res.send(await roomLogic.allRooms());
  } catch (err) {
    res.send(err);
  }
});

router.post("/", async (req, res) => {
  try {
    res.send(await roomLogic.addNewRoom(req.body));
  } catch (err) {
    res.status(400).send({ errors: err.message.split(";") });
  }
});

router.put("/", async (req, res) => {
  try {
    res.send(await roomLogic.updateRoom(req.body));
  } catch (err) {
    res.status(err.status || 400).send({ errors: err.message.split(";") });
  }
});

router.get("/:name", async (req, res) => {
  try {
    res.send(await roomLogic.findUniqueRoom(req.params.name));
  } catch (err) {
    res.status(400).send({ errors: err.message.split(";") });
  }
});

router.delete("/:name", async (req, res) => {
  try {
    res.send(await roomLogic.deleteRoom(req.params.name));
  } catch (err) {
    res.status(400).send({ errors: err.message.split(";") });
  }
});

module.exports = router;
