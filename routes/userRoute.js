const express = require('express')
const router = express.Router()
const { checkToken } = require('../services/authService')
const userController = require('../controllers/userController')

router.put('/create', checkToken, (req, res, next) => {
  userController.create(res, req.body)
})

module.exports = router
