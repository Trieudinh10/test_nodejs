const express = require('express');
var router = express.Router();

const {getHomepage, getAbc, postCreateuser, getCreatePage, getUpdatePage, postUpdateuser,postDeleteuser,postRemoveuser} = require('../controllers/homeController');

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

<<<<<<< HEAD:Routers/machines.js
=======
router.get('/abcd', (req, res) => {
    return res.send('xin chao')
})
>>>>>>> d776adac7edf8d77482ce06dde9b203c0b19e15e:src/Routers/machines.js

module.exports = router