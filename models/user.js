const mongoose = require('mongoose')
const validator = require('validator')
const { Schema } = mongoose

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  avatar: { type: String, required: true, trim: true, validate: value => validator.isURL(value) }
})

module.exports = mongoose.model('user', UserSchema)
