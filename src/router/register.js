// importing module
const router = require("express").Router();
const User = require("../models/User")
const joi = require("@hapi/joi");
//const bcrypt = require("bcrypt");

const schemaRegister = joi.object({
    name: joi.string().min(6).max(255).required(),
    email: joi.string().min(6).max(255).required().email(),
    password: joi.string().min(6).max(1024).required(),
});

router.post("/register", async (req, res) => {

    const { error } = schemaRegister.validate(req.body);

    const emailExists = await User.findOne({
        email: req.body.email,
    });

    if (emailExists) {
        return res.status(400).json({
            error: true,
            message: "email already exists",
        });
    }

    // hash password
    const jumps = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, jumps);

    if (error) {
        return res.status(400).json({
            Error: error.details[0].message,
        });
    }

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
    });

    try {
        const saveUser = await user.save();
        res.json({
            error: null,
            data: saveUser,
        });
    } catch (error) {
        res.status(400).json({ error });
    }
});

module.exports = router;