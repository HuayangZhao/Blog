const express=require('express')
const router = express.Router()
const ctrl = require('../controller/addArticle.js')
// 请求添加文章页面
router.get('/article/add',ctrl.addArticleGet)
// 添加文章
router.post('/article/add',ctrl.addArticlePost)
// 请求文章详情
router.get('/article/info/:id',ctrl.articleInfoGet)
// 请求编辑文章页
router.get('/article/edit/:id',ctrl.editArticleGet)
// 提交编辑文章
router.post('/article/edit',ctrl.editArticlePost)

module.exports = router