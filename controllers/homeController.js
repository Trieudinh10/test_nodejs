const connection = require('../config/database')
const {getAllUser} = require('../service/CRUD')
const getHomepage = async(req, res) => {
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
let results = await getAllUser();
  return res.render('user', {listUser: results});
}

const getAbc = (req, res) => {
    res.send('getAbc thanh cong')
    }

    const postCreateuser = async (req, res) => {

        // let id = req.body.id;
        let mail = req.body.email;
        let name = req.body.name;
        let password = req.body.password;
    
        console.log('reqbody',  mail, name, password);
    
        // connection.query(
        //     `INSERT INTO 
        //     table_user ( mail, name, password) 
        //     VALUES( ? , ? , ?)`,
        //     [ mail, name, password],
        //     function (err, result) {
        //         if (err) {
        //             console.error(err);
        //             res.status(500).send('Internal Server Error');
        //         } else {
        //             console.log(result);
        //             res.send('create user success');
        //         }
        //     }
        // );

        let [results, fields] = await connection.query(
            `INSERT INTO 
            table_user ( mail, name, password) VALUES( ? , ? , ?)`,[ mail, name, password]
        );
            console.log('ket qua', results)
            res.send('create success!')
    
        // INSERT INTO table_user VALUES(id,email, name, password);
        // res.send('create user'); // This line is not necessary here

        // const [results, fields] = await connection.query('SELECT * FROM table_user')
        // console.log('result', results);
    }
    

const getCreatePage = (req, res) => {
    res.render('create.ejs')
}

module.exports = {
    getHomepage,
    getAbc,
    postCreateuser,
    getCreatePage
}