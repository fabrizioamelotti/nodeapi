// ENV File
require('dotenv').config()

const createError = require('http-errors')
const express = require('express')
const bearerToken = require('express-bearer-token')
const path = require('path')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

const indexRouter = require('./routes/indexRoute')
const usersRouter = require('./routes/userRoute')
const articlesRouter = require('./routes/articleRoute')

// DataBase
const databaseService = require('./services/databaseService')
databaseService.connect()

// Init Data - Just used to create some random data from json files
// const initDataService = require('./services/initDataService')
// initDataService.initData()

const app = express()

// Set up dependencies
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(bearerToken())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser()) // Read Cookies

// Set up Routes
app.use('/', indexRouter)
app.use('/user', usersRouter)
app.use('/article', articlesRouter)

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// Error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
