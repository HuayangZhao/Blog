const express=require('express')
const router = express.Router()
const ctrl = require('../controller/addArticle.js')
router.get('/article/add',ctrl.addArticle)
module.exports = router