const HttpStatus = require('http-status-codes')

function checkToken (req, res, next) {
  if (req.token === process.env.TOKEN) {
    next()
  } else {
    res.status(HttpStatus.FORBIDDEN).json({
      message: 'You are not authorized'
    })
  }
}

module.exports = {
  checkToken
}
