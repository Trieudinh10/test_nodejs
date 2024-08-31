const connection = require("../config/database")
const getAllUser = async() => {
    let [results, fields] = await connection.query('SELECT * FROM users');
    console.log( 'req.params:', results )
    return results;
}
const getUserById = async(userId) => {
    let [results, fields] = await connection.query('SELECT * FROM users where id = ?', [userId]);
        console.log( 'req.params:', results )
    let user = results && results.length > 0 ? results[0] : {};
    return user;
}

const  upDateUserById = async(email, name, password, userId) => {
    let [results, fields] = await connection.query(
        `UPDATE users 
        SET email = ?, name = ?, password = ?
        WHERE id = ?
        `,[email, name, password, userId] 
    );
}

const deleteUserById = async(id) => {

    let [results, fields] = await connection.query(
        `DELETE FROM users WHERE  id = ?`,[ id]
    );

}
module.exports = {
    getAllUser,
    getUserById,
    upDateUserById,
    deleteUserById
}