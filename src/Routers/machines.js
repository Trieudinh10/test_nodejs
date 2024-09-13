const express = require('express');
var router = express.Router();

const {getHomepage, getAbc, postCreateuser, getCreatePage, getUpdatePage, postUpdateuser,postDeleteuser,postRemoveuser, getCRUD, postCRUD, displayGetCRUD} = require('../controllers/homeController');

router.get('/', getHomepage);

router.get('/abc', getAbc);

router.get('/create', getCreatePage);

router.get('/update/:id', getUpdatePage);

router.get('/login', (req,res) => {
res.render("login")
});

router.post('/newuser', postCreateuser);

router.post('/update-user', postUpdateuser);

router.post('/delete_user/:id', postDeleteuser);

router.post('/delete_user/', postRemoveuser);


//////////////////////////////////////////
// Tạo đường dẫn đến form /crud
// và trong form /crud sẽ cho tạo đường dẫn đến /post-crud
router.get('/crud', getCRUD);
router.post('/post-crud', postCRUD);

//Khi /get-crud được gọi thì displayGetCRUD sẽ được thực thi
router.get('/get-crud', displayGetCRUD);


module.exports = router