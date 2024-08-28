const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
var app = express();
app.use(express.static("public"));
var bodyParser = require('body-parser');
var router = require('../src/Routers/machines');
var initWebRouters = require('../src/Routers/web');
// const configViewEngine = require('./config/viewEngine.js');

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//.ENV
dotenv.config();

app.set('view engine', 'ejs');
app.set("views", "./views");
app.set('views', path.resolve(__dirname, 'views'))

//config req.body
app.use(express.json()); //phản hồi ở dạng json
app.use(express.urlencoded({ extended: true}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(router);

app.listen(8000, () => {
    console.log('Sever conected on port: 8000')
});
// configViewEngine(app);
app.use(router);
app.use(initWebRouters);