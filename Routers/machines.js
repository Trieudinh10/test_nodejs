const express = require('express');
var router = express.Router();

const {getHomepage, getAbc, postCreateuser} = require('../controllers/homeController');

router.get('/', getHomepage);

router.get('/abc', getAbc);

router.post('/newuser', postCreateuser);

module.exports = router