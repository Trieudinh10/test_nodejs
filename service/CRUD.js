const connection = require("../config/database")
const getAllUser = async() => {
    let [results, fields] = await connection.query('SELECT * FROM table_user');
    return results;
}

module.exports = {
    getAllUser
}