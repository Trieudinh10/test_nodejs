const express = require('express');
var app = express();
var router = require('./Routers/machines.js')

var check = (req, res, next) => {
    if(dangnhap){
        next();
    }else{
        console.log('Ban chua dang nhap')
    }
}

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


app.use('/line1',check, router);
//localhost:8000/line1/

app.listen(8000, () => {
    console.log('Sever conected on port: 8000')
})