const connection = require('../config/database')

const getHomepage = (req, res) => {
    //simple query
//     let user = []
// connection.query(
//     'SELECT * FROM `table_user`',
//     function (err, results, fields) {
//         user = results
//         console.log(results);
//         console.log(fields);
//         console.log('user', user)

//         res.send(JSON.stringify(user))
//     }
// );  

  return res.render('user');
}

const getAbc = (req, res) => {
    res.send('getAbc thanh cong')
    }

module.exports = {
    getHomepage,
    getAbc
}