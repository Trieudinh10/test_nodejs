const connection = require("../config/database")
const getAllUser = async() => {
    let [results, fields] = await connection.query('SELECT * FROM table_user');
    console.log( 'req.params:', results )
    return results;
}
const getUserById = async(userId) => {
    let [results, fields] = await connection.query('SELECT * FROM table_user where id = ?', [userId]);
        console.log( 'req.params:', results )
    let user = results && results.length > 0 ? results[0] : {};
    return user;
}

const  upDateUserById = async(email, name, password, userId) => {
    let [results, fields] = await connection.query(
        `UPDATE table_user 
        SET email = ?, name = ?, password = ?
        WHERE id = ?
        `,[email, name, password, userId] 
    );
}

const deleteUserById = async(id) => {

    let [results, fields] = await connection.query(
        `DELETE FROM table_user WHERE  id = ?`,[ id]
    );

}
module.exports = {
    getAllUser,
    getUserById,
    upDateUserById,
    deleteUserById
}