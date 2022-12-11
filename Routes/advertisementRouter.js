const express = require("express");
const router = express.Router();
const advertisementLogic = require("../BL/advertisement/advertisementLogic");

router.get("/", async (req, res) => {
  try {
    console.log("advertisement router");
    res.send(await advertisementLogic.getAllAdvertisements());
  } catch (err) {
    res.status(400).send({ errors: err.message.split(";") });
  }
});

router.get("/:name", async (req, res) => {
  try {
    console.log("oneAdvertisement");
    const advRes = await advertisementLogic.findUniqueAdvertisement(
      req.params.name
    );
    if (advRes) {
      res.send(advRes);
    } else {
      res.status(404).send({ errors: ["Advertisement not found!"] });
    }
  } catch (err) {
    res.status(500).send({ errors: err.message.split(";") });
  }
});

router.post("/", async (req, res) => {
  const token = req.headers.authorization;

  try {
    res.send(await advertisementLogic.createAdvertisement(req.body, token));
  } catch (err) {
    res.status(500).send({ errors: err.message.split(";") });
  }
});

module.exports = router;
