const express = require('express')

const api = express.Router()
const userController = require('../controllers/user')
api.post('/Register',userController.register)
api.post('/Login',userController.login)

module.exports = api