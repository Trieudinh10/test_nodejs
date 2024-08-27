const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
var app = express();
app.use(express.static("public"));
var bodyParser = require('body-parser');
var router = require('../src/Routers/machines');
// const configViewEngine = require('./config/viewEngine.js');

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
