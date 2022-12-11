const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.RANDOM_TOKEN_SECRET, (err, decode) => {
            if (err) {
                throw ("invalid");
            }
            req.body.email = decode.email
            next();
        });

    } catch (err) {
        console.log("🚀 ~ file: auth.js ~ line 16 ~ auth ~ err", err)
        res.status(401).json({
            error: 'Invalid request!'
        });
    }

    // } catch {
    //     res.status(401).json({
    //         error: 'Invalid request!'
    //     });
    // }
}

module.exports = auth;
