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

module.exports = {
    getAllUser,
    getUserById
}