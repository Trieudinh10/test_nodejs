const express = require('express');
var router = express.Router();

const {getHomepage, getAbc, postCreateuser, getCreatePage, getUpdatePage, postUpdateuser} = require('../controllers/homeController');

router.get('/', getHomepage);

router.get('/abc', getAbc);

router.get('/create', getCreatePage);

router.get('/update/:id', getUpdatePage);

router.post('/newuser', postCreateuser);

router.post('/update-user', postUpdateuser);

module.exports = router