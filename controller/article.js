const {Router} = require('express');

const router = Router();
const articleModel = require('../model/article');

router.post('/article', async (req, res, next) => {
    try {
        if (req.session.user) {
            const {content,title,contentText,category} = req.body
            if (title) {
                const data = await articleModel.create(
                    {
                        content,
                        title,
                        contentText,
                        category,
                        author: req.session.user._id
                    })
                res.json({
                    code: 200,
                    msg: '笔记发布成功',
                    data,
                })
            } else {
                res.json({
                    code: 401,
                    msg: '缺少标题！'
                })
            }
        } else {
            res.json({
                code: 403,
                msg: '请登录再发表文章！'
            })
        }
    } catch (err) {
        next(err)
    }
})

router.get('/article', (req, res) => {
    let {pn = 1, size = 10} = req.query
    pn = parseInt(pn)
    size = parseInt(size)

    articleModel.find()
        .skip((pn - 1) * size)
        .limit(size)
        .populate({
            path: 'author',
            select: '-password -email'
        })
        .populate({
            path: 'categories'
        })
        .then(data => {
            res.json({
                code: 200,
                data,
            })
        })
})

router.get('/article/:id',(req,res)=>{
    let {id} = req.params
    articleModel.findById(id)
        .populate({
            path: 'author',
            select: '-password -email'
        })
        .populate({
            path: 'categories'
        })
        .then(data=>{
        res.json({
            code:200,
            data,
        })
    })
})


















module.exports = router;