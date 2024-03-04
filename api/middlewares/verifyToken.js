const jwt = require("jsonwebtoken");

// verifyToken
const verifyToken = (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).json({ message: "Not authorized" });
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        jwt.verify(token, "njkhtuihtuhwt34853", (err, data) => {
            if (err) return res.status(403).json({ message: "Wrong or expired token" })
            else {
                req.user = data;
                next();
            }
        })
    }
}


// verifyTokenAdmin
const verifyTokenAdmin = (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).json({ message: "Not authorized" });
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        jwt.verify(token, "njkhtuihtuhwt34853", (err, data) => {
            if (err) return res.status(403).json({ message: "Wrong or expired token" })
            else {
                // data = ({id:user._id, isAdmin:user.isAdmin})
                if (!data.isAdmin) return res.status(403).json({ message: "You are not Admin" })
                req.user = data;
                next();
            }
        })
    }
}

module.exports = { verifyToken, verifyTokenAdmin }