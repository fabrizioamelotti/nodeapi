const mongoose = require('mongoose')
const { Schema } = mongoose

const ArticleSchema = new Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: 'user' },
  title: { type: String, required: true, trim: true },
  text: { type: String, required: true, trim: true },
  tags: [{ type: String, default: [] }]
})

module.exports = mongoose.model('article', ArticleSchema)
