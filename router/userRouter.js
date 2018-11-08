const express=require('express')
const router = express.Router()
const ctrl = require('../controller/user.js')
// 请求登陆页面
router.get('/login',ctrl.getLogin)
// 请求注册页面
router.get('/register',ctrl.getRegister)
// 提交注册信息
router.post('/register',ctrl.postRegister)
// 提交登陆信息
router.post('/login',ctrl.postLogin)
// 退出登陆
router.get('/logout',ctrl.getLogout)
module.exports = router