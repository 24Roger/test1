// importing module
const User = require("../models/User");
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

// using User in database
const schemaLogin = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
});

router.post("/login", async (req, res) => {
    // validations
    const { error } = schemaLogin.validate(req.body);
    if (error) {
        return res.status(400).json({
            error: error.details[0].message,
        });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(400).json({
            error: true,
            message: "Email not found",
        });
    }

    const comparePassword = await bcrypt.compare(
        req.body.password,
        user.password
    );

    if (!comparePassword) {
        return res.status(400).json({
            error: true,
            message: "Incorrect password",
        });
    }

    // create token
    const token = jwt.sign(
        {
            name: user.name,
            id: user._id,
        },
        process.env.TOKEN_SECRET
    );

    res.header("token", token).json({
        error: null,
        data: "Welcome",
        token: token
    });
});

module.exports = router;