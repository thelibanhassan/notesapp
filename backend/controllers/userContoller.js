const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const User = require("../model/userModel");
const { json } = require("express");


// Register new user
const register = async (req, res) => {
  const { name, email, password, password2 } = req.body;
  //check if fields is empty
  if (!name || !email || !password) {
    return res.status(404).json({ msg: "please fill the fileds" });
  }

  // if (password !== password2) return res.status(405).json({ msg: "Passwords didn't match" });

  try {

    //check if email exists
    if (await User.findOne({ email })) {
      return res.status(400).json({ msg: "email already exists" });

    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    const user = User.create({
      name,
      email,
      password: hashedpassword,
    });

    if (user) {
      res.status(201).json({

        name,
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

// Login user 

const login = async (req, res) => {
  const { email, password } = req.body

  try {

    //checks if the email exists
    const user = await User.findOne({ email })

    if (user) {
      const userPass = user.password

      //compare passwords
      const checkPassword = await bcrypt.compare(password, userPass)
      if (checkPassword) {

        //create jwt token
        const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "30d" })
        return res.status(200).json({
          msg: "user logged in",
          id: user._id,
          token
        })
      }
      else {
        res.status(400).json({
          msg: "incorrect credentials"
        })
      }
    }
    else {
      res.status(400).json({
        msg: "incorrect credentials"
      })
    }
  } catch (err) {
    console.log(err)
    res.status(404).json({
      msg: "there is error logging in"
    })
  }



}




module.exports = { register, login, };
