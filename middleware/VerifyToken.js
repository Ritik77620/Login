const jwt = require('jsonwebtoken')
const User = require('../models/User')

const verifyToken = async(req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1] || req.body.token || req.query.tokens
    try {
        if (!token) {
            return res.status(403).json({ message: "A token is required for authentication" })
        }
        const decoded = jwt.verify(token, process.env.TOKEN_KEY)
        const iuserExist = await User.findOne({email:decoded?.email})
        if (iuserExist) {
            req.user = decoded
           
            return next();
        }
        else {
            return res.status(401).json("Invalid Token")
        }
    } catch (error) {
        return res.status(401).send("Invalid Token");
    }


}

module.exports = { verifyToken }