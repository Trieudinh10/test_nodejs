const connection = require("../config/database")
const db = require('../models/index')
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);



// const getAllUser = async () => {
//     let [results, fields] = await connection.query('SELECT * FROM users');
//     console.log('req.params:', results)
//     return results;
// }
const getUserById = async (userId) => {
    let [results, fields] = await connection.query('SELECT * FROM users where id = ?', [userId]);
    console.log('req.params:', results)
    let user = results && results.length > 0 ? results[0] : {};
    return user;
}

const upDateUserById = async (email, name, password, userId) => {
    let [results, fields] = await connection.query(
        `UPDATE users 
        SET email = ?, name = ?, password = ?
        WHERE id = ?
        `, [email, name, password, userId]
    );
}

const deleteUserById = async (id) => {

    let [results, fields] = await connection.query(
        `DELETE FROM users WHERE  id = ?`, [id]
    );

}

/////////////////////////////////////////


//Khi hàm createNewUser được gọi thì thực hiện
// Sử dụng hàm db.User.create() để tạo một bản ghi người dùng mới trong cơ sở dữ liệu. 
// Đây là một phương thức thường có trong ORM (Object-Relational Mapping) như Sequelize, 
// kết nối với cơ sở dữ liệu để thực hiện việc thêm dữ liệu vào bảng User
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password)
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
                phonenumber: data.phonenumber,
            })
            resolve('create new user success!')
        } catch (e) {
            reject(e)
        }
    })
    // console.log('data from service');
    // console.log(data);
    // console.log(hashPasswordFromBcrypt);
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPasword = await bcrypt.hashSync(password, salt);
            resolve(hashPasword)
        } catch (e) {
            reject(e)
        }
    })
}


// Khi getAllUser được gọi thì thực hiện lấy tất cả dữ liệu trong db.User và đưa vào biến users
let getAllUser = () => {
    // Ý nghĩa là có 1 promise ở đây, chờ đến khi promise chạy xong thì chạy tiếp 
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            // console.log('dữ liệu trong biến users', users)
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = db.User.findOne({
                where: { id: userId },
                raw: true,
            })
            if(user){
                resolve(user)
            }else{
                resolve([])
            }
        } catch (e) {
            reject(e)
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where: { id: data.id}
            })
            if(user){
                user.email = data.email;
                user.password = data.password;
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phonenumber = data.phonenumber;
                await user.save();
                resolve();
            }else{
                resolve();
            }
        }catch(e){
            console.log(e)
        }
    })
}


module.exports = {
    getAllUser,
    getUserById,
    upDateUserById,
    deleteUserById,
    createNewUser,
    hashUserPassword,
    getUserInfoById,
    updateUserData
}