const path = require('path')
const configViewEngine = (app) => {
    app.set('view engine', 'ejs');
    app.set("views", "./views");
    app.set('views', path.resolve(__dirname, 'views'))
}

module.exports = configViewEngine;