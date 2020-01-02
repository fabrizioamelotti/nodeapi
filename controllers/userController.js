const HttpStatus = require('http-status-codes')
const User = require('../models/user')

async function create (res, userData) {
  try {
    const user = await User.create(userData)

    res.status(HttpStatus.OK).json({
      user
    })
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      err
    })
  }
}

module.exports = {
  create
}
