const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../model/userModel");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  // if (!name || !email || !password) {
  //   res.status(404).json({ msg: "please fill the fileds" });
  // }

  // if (User.findOne(email)) {
  //   res.status(404).json({ msg: "email already exists" });
  // }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    const user = User.create({
      name,
      email,
      password: hashedpassword,
    });

    if (user) {
      res.status(201).json({
        id: user._id,
        name: user.name,
        message: "You created new account",
      });
    } else {
      res.status(404).json({ message: "invalid data" });
    }
  } catch (err) {
    res.json({ message: err });
    res.send({ err: "there is error" });
    console.log(err);
  }
};
const login = (req, res) => {
  console.log("user login");
  res.send("user logged in");
};

module.exports = { register, login };
