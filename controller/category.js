const {Router} = require('express');

const router = Router();
const categories = require('../model/category');

router.get('/category', (req,res)=>{
    categories.find().then(data=>{
        res.json({
            code:200,
            msg:'获取分类成功',
            data,
        })
    })
})

router.get('/category/:id',(req,res)=>{
    let {id} = req.params
    categories.findById(id).then(data=>{
        res.json({
            code:200,
            msg:'获取分类成功',
            data,
        })
    })
})

router.post('/category',async (req,res,next)=>{
    try {
        const {name} = req.body
        const data = await categories.create({name})

         res.json({
             code:200,
             msg:'创建分类成功',
             data,
         })
    }catch (err) {
        next(err)
    }
})


module.exports = router;
