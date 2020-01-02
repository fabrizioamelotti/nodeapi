const mongoose = require('mongoose')
const HttpStatus = require('http-status-codes')
const Article = require('../models/article')

async function create (res, articleData) {
  try {
    const article = await Article.create(articleData)

    res.status(HttpStatus.OK).json({
      article
    })
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      err
    })
  }
}
async function edit (res, articleData) {
  if (!mongoose.Types.ObjectId.isValid(articleData._id)) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'The attribute: _id is not an ObjectId'
    })
  }

  try {
    const _id = articleData._id
    delete articleData._id
    await Article.updateOne({ _id: _id }, { $set: articleData })

    res.status(HttpStatus.OK).json({
      _id
    })
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      err
    })
  }
}

async function remove (res, _id) {
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'The attribute: _id is not an ObjectId'
    })
  }

  try {
    await Article.deleteOne({ _id })
    res.status(HttpStatus.OK).json({
      _id
    })
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      err
    })
  }
}

async function findAllByTags (res, tags) {
  let articles = []
  if (tags != null) {
    try {
      tags = JSON.parse(tags)
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error trying to parse tags'
      })
    }

    if (Array.isArray(tags) && tags.length > 0) {
      try {
        articles = await Article.where('tags').in(tags).exec()
      } catch (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          err
        })
      }
    }
  }

  res.status(HttpStatus.OK).json({
    articles
  })
}

module.exports = {
  create,
  edit,
  remove,
  findAllByTags
}
