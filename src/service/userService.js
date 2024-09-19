const db = require('../models/index');
const bcrypt = require("bcrypt");
// const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
    return new Promise(async(resolve, reject) => {
        try{
            let userData = {};
            let isExist = await checkUserEmail(email);
            if(isExist){
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where : {email: email},
                    raw: true
                });
                if(user){
                   let check = await bcrypt.compareSync(password, user.password); // false
                   if(check){
                    userData.errCode = 0;
                    userData.errMessage = 'OK';
                    console.log(user)
                    delete user.password;
                    userData.user = user;
                   }else{
                    userData.errCode = 3;
                    userData.errMessage = 'sai mat khau'
                   }
                }else{
                    userData.errCode = 2;
                    userData.errMessage = 'khong tim thay user'
                }
            }else{
                userData.errCode = 1;
                userData.errMessage = 'your email isnt exist'

            }
            resolve(userData)
        }catch(e){
            reject(e)
        }
    })
}

// let compareUserPassword = () => {
//     return new Promise(async(resolve,reject) => {
//         try{

//         }catch(e){
//             reject(e);
//         }
//     })
// }

let checkUserEmail = (userEmail) => {
    return new Promise(async(resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where: {email: userEmail}
            })
            if(user) {
                resolve(true)
            }else{
                resolve(false)
            }
        }catch(e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin,
    checkUserEmail
}