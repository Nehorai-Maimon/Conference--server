require("dotenv").config();
const cookieParser = require("cookie-parser")
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();


// app.use(cors({ cradentials: true, allowedHeaders: ["X-Requested-With"] }));
app.use(cors())
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(express.json());
require("./DL/db").connect();

app.get('/setcookie', (req, res) => {
  res.cookie(`Cookie token name`, `encrypted cookie string Value`);
  res.send('Cookie have been saved successfully');
});
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});
app.use("/api/user", require("./Routes/userRouter"));
app.use("/api/general", require("./Routes/generalRouter"));
app.use("/api/booking", require("./Routes/bookingRouter"));
app.use("/api/room", require("./Routes/roomRouter"));
app.use("/api/advertisement", require("./Routes/advertisementRouter"));

app.use("/api/authuser", require("./Routes/authUserRouter"));
app.use("/api/authuser", require("./Routes/authAdminRouter"));

(swaggerUi = require("swagger-ui-express")),
    (swaggerFile = require("./swagger_output.json"));
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
// set port, listen for requests

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
