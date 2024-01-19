const express = require('express');
var router = express.Router();

const {getHomepage, getAbc, postCreateuser, getCreatePage, getUpdatePage} = require('../controllers/homeController');

router.get('/', getHomepage);

router.get('/abc', getAbc);

router.get('/create', getCreatePage);

router.get('/update/:id', getUpdatePage);

router.post('/newuser', postCreateuser);

module.exports = router