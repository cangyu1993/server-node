var express = require('express');
var router = express.Router();

const user = require('../controller/user')
const article = require('../controller/article')
const category = require('../controller/category')
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.use(user,article,category)


module.exports = router;
