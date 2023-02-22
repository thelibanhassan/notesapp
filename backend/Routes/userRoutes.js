const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/userContoller");
const { protectedRoutes } = require("../middlewares/authMiddleware")

router.post("/register", register);
router.post("/login", login);
router.get("/", protectedRoutes, (req, res) => {
    res.status(200).json({

        msg: "dashboard"
    })
});

module.exports = router;
