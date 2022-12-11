const express = require("express"),
    router = express.Router();
const generalLogic = require("../BL/generalLogic");

router.post("/login", async (req, res) => {
    try {
        const accessToken = await generalLogic.login(req);
        res.send(accessToken);
        // res.cookie('access_token', JSON.stringify(accessToken.auth_token), { SameSite: false }).send(accessToken);

    } catch (err) {
        console.log("🚀 ~ file: generalRouter.js ~ line 11 ~ router.post ~ err", err)

        res.status(err.code).send(err.message);
        return
    }
});

module.exports = router;
