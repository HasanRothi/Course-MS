const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    try {
        // console.log("Here")
        const authHeader = req.headers.authorization;
        // console.log(req.headers.authorization)
        const token = authHeader && authHeader.split(" ")[1];
        if (token == null) return res.json({ message: "provide Null token" });
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = decoded;
        next();
    } catch (err) {
        return res.json({ message: "Auth Failed " });
    }
};