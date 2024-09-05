const connection = require("../config/database");
const util = require("node:util");
const query = util.promisify(connection.query).bind(connection);
const execute = util.promisify(connection.execute).bind(connection);

function User() {}

User.findByEmail = async function (email) {
    try {
      const result = await query('SELECT * FROM table_user WHERE email = ?', [email]);
      return result;
    } catch (error) {
      console.error("Error in findByEmail:", error);
      throw error; // Re-throw the error to be handled by the caller
    }
  };
  
  

User.insert = async function (email, name, password) {
  return execute(`INSERT INTO table_user (email, name, password) VALUES ('${email}', '${name}', '${password}');
  `);
};

module.exports = User;