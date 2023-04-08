const express = require("express");
const router = express.Router();
const { register, login, } = require("../controllers/userContoller");
const { createNote, getNotes, getNote, updateNote, deleteNote } = require("../controllers/noteController")
const { protectedRoutes } = require("../middlewares/authMiddleware")

//registration notes
router.post("/register", register);
router.post("/login", login);



//Note routes
router.get("/", protectedRoutes, getNotes)
router.post("/", protectedRoutes, createNote)
router.get("/:id", protectedRoutes, getNote)
router.patch("/:id", protectedRoutes, updateNote)
router.delete("/:id", protectedRoutes, deleteNote)

module.exports = router;
