const jwt = require("jsonwebtoken");
const config = require("config")


const middlewares = {
    verifyToken : (req, res, next) => {
    // check token here
    const token = req.header("authorization");
        if (token){
            const verified = jwt.verify(t5oken, config.get("secretKey"));
            req.user = verified.id;
            next();
        } else {
            return res.status(401).json({success: false, messaage: "Not Authorized !"})
        }
    }
}

module.exports = middlewares;