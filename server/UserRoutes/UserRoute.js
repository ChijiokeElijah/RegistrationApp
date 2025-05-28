const express = require('express')
const register = require('../UserControllers/UserController')


const registerRouter = express.Router()

registerRouter.post("/register", register)

module.exports = registerRouter
