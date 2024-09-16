const connection = require('../config/database')
const db = require('../models/index')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { promisify } = require("util");
const bcryptHash = promisify(bcrypt.hash);
const bcryptCompare = promisify(bcrypt.compare);
const {getAllUser, getUserById,upDateUserById,deleteUserById, createNewUser, getUserInfoById, updateUserData, getDeleteById, getputDeleteData} = require('../service/CRUD')
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

// let results = await getAllUser();
//   return res.render('user', {listUser: results});
//   return res.send("hello");s
try {
    let data =  await db.User.findAll();
    console.log(data)
    return res.render('homepage.ejs', {data: JSON.stringify(data)})
}catch(e) {
    console.log(e)
}
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


////////////////////////////////////////////////////////////////

// Khi getCRUD được gọi thì thực hiện render ra crud.ejs
let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

// Khi postCRUD được gọi thì thực hiện thì hàm createNewUser được thực thi với tham số là req.body
// req.body chứa dữ liệu từ client gửi lên thông qua phương thức POST (dữ liệu này có thể là thông tin người dùng từ một form)
let postCRUD = async (req, res) => {
    let mesage = await createNewUser(req.body);
    console.log(mesage);
    return res.send('Tạo tài khoản thành công');
}


//Khi displayGetCRUD được gọi thì thưc hiện gọi hàm getAllUser thực thi và lấy dữ liệu điền vào biến data
//, sau đó đưa dữ liệu trong biến data  ra ejs bằng %
let displayGetCRUD = async (req, res) => {
    let data = await getAllUser();
    // console.log(data)
    return res.render('display_crud.ejs',{datatable: data}) // truyền dữ liệu trong biến data ra ngoài tệp ejs
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;  //biến id được query từ ejs, phía ejs phải lấy dược giá trị id
    // console.log('id cho nhiệm vụ sửa', userId)
    if(userId){
        let userData = await getUserInfoById(userId)
        // console.log(userData)
        return res.render('edit_crud.ejs', {datauser: userData})
    }else{
        return res.send('hello not found')
    }
}


// Bên ejs ta đặt name là gì thì chỉ cần req.body.name là ra được 
let getUpdateCRUD = async  (req, res) => {
    let data = req.body;
    let allUsers = await updateUserData(data)
    return res.render('display_crud.ejs', {datatable: allUsers});
}

//TÌM ĐỐI TƯỢN VÀ HIỂN THỊ LÊN 
let getDeleteCRUD = async (req,res) => {
    let userId = req.query.id;
    if(userId){
        let userData = await getDeleteById(userId);
        console.log('đối tượng được chọn để delete', userData)
        return res.render('delete_crud.ejs', {datauser: userData})
    }
}

//Gọi đối tượng và thực hiện hàm bên dưới 
let getputDeleteCRUD = async (req,res) => {
    let data = req.body;
    let allUsers = await getputDeleteData(data)
    return res.render('display_crud.ejs', {datatable: allUsers});
}



module.exports = {
    getHomepage,
    getAbc,
    postCreateuser,
    getCreatePage,
    getUpdatePage,
    postUpdateuser,
    postDeleteuser,
    postRemoveuser,

    getCRUD,
    postCRUD,
    displayGetCRUD,
    getEditCRUD,
    getUpdateCRUD,
    getDeleteCRUD,
    getputDeleteCRUD
}