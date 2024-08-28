const express = require('express');

let router = express.Router();

let initWebRouters = (app) => {
router.get('/web', (req, res) => {
    return res.send('hello');
});
 return app.use("/", router);
}

module.exports = initWebRouters;