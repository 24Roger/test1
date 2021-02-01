// importing module
const jwt = require("jsonwebtoken");

// middleware to validate token (protected routes)
const verifyToken = (req, res, next) => {
    const token = req.header("token");

    if (!token) {
        return res.status(401).json({
            error: "access denied",
        });
    }

    try {
        const verify = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verify;
        next();
    } catch (error) {
        res.status(400).json({
            error: "token is not valid",
        });
    }
};

module.exports = verifyToken;
