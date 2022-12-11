const express = require("express");
const router = express.Router();
const bookingLogic = require("../BL/booking/bookingLogic");
const auth = require("../Middleware/auth");

router.get("/", async (req, res) => {
  try {
    res.send(await bookingLogic.getAllBookings());
  } catch (err) {
    res.send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    res.send(await bookingLogic.getAllBookingsByUser(req.params.id));
  } catch (err) {
    res.send(err);
  }
});
router.post("/newBooking", async (req, res) => {
  try {
    res.send(await bookingLogic.createBooking());
  } catch (err) {
    res.status(400).send({ errors: err.message.split(";") });
  }
});

router.post("/availableRoom", async (req, res) => {
  console.log(
    "🚀 ~ file: bookingRouter.js ~ line 15 ~ router.post ~ req",
    req.body
  );
  try {
    res.send(await bookingLogic.getAvailableRoom(req.body));
  } catch (err) {
    res.send(err);
  }
});

router.delete(`/:name`, async (req, res) => {
  try {
    console.log("del");
    res.send(await bookingLogic.deleteBooking(req.params.name));
  } catch (err) {
    res.status(400).send({ errors: err.message.split(";") });
  }
});

module.exports = router;
