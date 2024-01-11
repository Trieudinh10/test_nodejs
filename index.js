const express = require('express');
var app = express();
app.use(express.static("public"));
var bodyParser = require('body-parser')
var router = require('./routers/machines.js')
const configViewEngine = require('./config/viewEngine.js')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/login', (req, res, next) => {

})

app.get('/', (req, res, next) => {
    console.log('door');
    next(); // Điều này bị thiếu trong mã gốc của bạn
}, (req, res, next) => {
    console.log('door1');
    next();
}, (req, res, next) => {
    console.log('door2');
    next();
}, (req, res, next) => {
    console.log('door3');
    res.json('abc')
})



app.listen(8000, () => {
    console.log('Sever conected on port: 8000')
})
configViewEngine(app)