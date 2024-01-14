const express = require('express');
var router = express.Router();

const {getHomepage, getAbc, postCreateuser, getCreatePage} = require('../controllers/homeController');

router.get('/', getHomepage);

router.get('/abc', getAbc);

router.get('/create', getCreatePage);

router.post('/newuser', postCreateuser);

module.exports = router