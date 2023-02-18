const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/userContoller");

router.post("/register", register);
router.get("/", (req, res) => res.status(200).json({ msg: "dashboard" }));
router.post("/login", login);

module.exports = router;
