const connection = require('../config/database')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { promisify } = require("util");
const bcryptHash = promisify(bcrypt.hash);
const bcryptCompare = promisify(bcrypt.compare);
const {getAllUser, getUserById,upDateUserById,deleteUserById} = require('../service/CRUD')
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
        let email = req.body.email;
        let name = req.body.name;
        let password = req.body.password;
    
        console.log('reqbody',  email, name, password);
    
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
        const hashedPassword = await bcryptHash(req.body.password, 10);

        let [results, fields] = await connection.query(
            `INSERT INTO 
            table_user ( email, name, password) VALUES( ? , ? , ?)`,[ email, name, hashedPassword]
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

const getUpdatePage = async(req, res) => {
    const userId = req.params.id;
    // console.log( 'req.params:', req.params,userId )
    let user = await getUserById(userId);
    res.render('edit.ejs', {userEdit : user})
}

const postUpdateuser = async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let password = req.body.password;
    let userId = req.body.userId;

    await upDateUserById(email, name, password, userId);

    res.redirect('/');
}

    const postDeleteuser = async(req, res) => {
        const userId = req.params.id;
    // console.log( 'req.params:', req.params,userId )
    let user = await getUserById(userId);
    res.render('deleteuser.ejs', {userEdit : user});
    //  res.send('deleteuser');
    }

    const postRemoveuser = async(req,res) => {
        const id = req.body.userId
        await deleteUserById(id)
        res.redirect('/')
    }

module.exports = {
    getHomepage,
    getAbc,
    postCreateuser,
    getCreatePage,
    getUpdatePage,
    postUpdateuser,
    postDeleteuser,
    postRemoveuser
}