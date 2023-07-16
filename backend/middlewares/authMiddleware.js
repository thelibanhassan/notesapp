const jwt = require("jsonwebtoken")
const express = require("express")
const User = require("../model/userModel")


const protectedRoutes = async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            //get the token
            token = req.headers.authorization.split(" ")[1]

            //decode the token
            const decoded = jwt.verify(token, process.env.SECRET)

            //if failed to verify the token
            if (!decoded) {
                throw new Error
            }
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (err) {
            res.status(401).json({
                msg: "Not authorized"
            })
        }
    }
    if (!token) {
        res.status(401).json({
            msg: "Not authorized"
        })
    }
}


module.exports = { protectedRoutes }