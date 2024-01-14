const express = require('express');
const dotenv = require('dotenv');
var app = express();
app.use(express.static("public"));
var bodyParser = require('body-parser');
var router = require('./routers/machines.js');
const configViewEngine = require('./config/viewEngine.js');
const connection = require('./config/database.js');

//.ENV
dotenv.config();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(router);

app.listen(process.env.PORT, () => {
    console.log('Sever conected on port: 8000')
});
configViewEngine(app);



//simple query
connection.query(
    'SELECT * FROM `table_user`',
    function (err, results, fields) {
        console.log(results);
        console.log(fields);
    }
)
