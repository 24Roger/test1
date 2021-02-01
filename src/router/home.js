// importing module
const router = require("express").Router();

// route middlewares
router.get("/", (req, res) => {
    res.json({
        error: null,
        data: {
            title: "mi ruta protegida",
            user: req.user,
        },
    });
});

module.exports = router;
