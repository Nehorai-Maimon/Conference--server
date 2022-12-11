
const users = require('../DL/controllers/userController'),
        booking = require('../DL/controllers/bookingController'),
        rooms = require('../DL/controllers/roomController'),
        jwt = require("jsonwebtoken"),
        bcrypt = require("bcrypt");
const { createUserToken } = require('./authUserTools');


const generateAccessToken = (mail) => { //לשאול את תמר האם זה המקום או במקום אחר
        const accessToken = jwt.sign(
                JSON.stringify(mail),
                process.env.RANDOM_TOKEN_SECRET
        );
        return accessToken;
}

const login = async (req) => {



        const email = req.body.mail;
        const password = req.body.password;
        const user = await users.readOne({ email: email }, "+password");
        if (!user) { throw ({ code: 401, message: "Invalid cradentials" }) };
        // const match = password == user.password //להחליף עם השורה הבאה לאחר שראוט רגיסטר יהיה מסודר עם הצפנת הסיסמה
        const match = await bcrypt.compare(password, user.password);
        user.password = undefined;
        if (match) {
                return createUserToken(user)

        } else {
                throw ({ code: 401, message: "Invalid cradentials" });
        }


}






module.exports = { login }; 

// THE OLDER VERSION: want to see if we need it

// const users = require("../DL/controllers/userController"),
//   booking = require("../DL/controllers/bookingController"),
//   rooms = require("../DL/controllers/roomController"),
//   jwt = require("jsonwebtoken"),
//   bcrypt = require("bcrypt");

// const generateAccessToken = (mail) => {
//   //לשאול את תמר האם זה המקום או במקום אחר
//   console.log(
//     "🚀 ~ file: generalLogic.js ~ line 12 ~ generateAccessToken ~  process.env.RANDOM_TOKEN_SECRET",
//     process.env.RANDOM_TOKEN_SECRET
//   );
//   const accessToken = jwt.sign(
//     JSON.stringify(mail),
//     process.env.RANDOM_TOKEN_SECRET
//   );
//   console.log(
//     "🚀 ~ file: generalLogic.js ~ line 14 ~ generateAccessToken ~ accessToken",
//     accessToken
//   );
//   return accessToken;
// };

// const login = async (req) => {
//   try {
//     console.log(req.body);
//     const email = req.body.mail;
//     console.log("🚀 ~ file: generalLogic.js ~ line 20 ~ login ~ email", email);
//     const password = req.body.password;
//     const user = await users.readOne({ email: email });
//     console.log("🚀 ~ file: generalLogic.js ~ line 27 ~ login ~ user", user);

//     if (!user) {
//       throw "Invalid username";
//     }
//     const match = password == user.password; //להחליף עם השורה הבאה לאחר שראוט רגיסטר יהיה מסודר עם הצפנת הסיסמה
//     console.log("🚀 ~ file: generalLogic.js ~ line 33 ~ login ~ match", match);
//     // const match = await bcrypt.compare(password, user.password);
//     if (match) {
//       return generateAccessToken(user.email);
//     } else {
//       throw "Invalid password";
//     }
//   } catch (error) {
//     throw error;
//   }
// };

// module.exports = { login };