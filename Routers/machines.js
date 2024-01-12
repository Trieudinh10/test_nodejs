const express = require('express');
var router = express.Router();

const {getHomepage, getAbc} = require('../controllers/homeController');

router.get('/', getHomepage);

router.get('/abc', getAbc);

module.exports = router