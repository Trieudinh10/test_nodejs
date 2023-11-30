const express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.json('router')
})
router.get('/may1', (req, res) => {
    res.json('router may 1')
})
router.get('/may2', (req, res) => {
    res.json('router may 2')
})
router.get('/may3/may4', (req, res) => {
    res.json('router may x')
})
router.get('/:id', (req, res) => {
    res.json(req.params.id)
})

module.exports = router