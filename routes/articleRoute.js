const express = require('express')
const router = express.Router()
const { checkToken } = require('../services/authService')
const articleController = require('../controllers/articleController')

router.put('/create', checkToken, (req, res, next) => {
  articleController.create(res, req.body)
})
router.post('/edit', checkToken, (req, res, next) => {
  articleController.edit(res, req.body)
})

router.delete('/:_id', checkToken, (req, res, next) => {
  articleController.remove(res, req.params._id)
})

router.post('/findByTags', checkToken, (req, res, next) => {
  articleController.findAllByTags(res, req.body.tags)
})

module.exports = router
