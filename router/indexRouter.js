const express=require('express')
const router = express.Router()
// 主页渲染
router.get('/',(req,res)=>{
    res.render('index.ejs',{})
})
module.exports = router