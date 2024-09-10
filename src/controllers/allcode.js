'use strict';

const { Sequelize } = require("sequelize");
const {Model} = require(Sequelize);
module.exports = (Sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            //Define association here
        }
    };
    User.init({
        id: DataTypes.INTEGER,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        address: DataTypes.STRING,
        gender: DataTypes.BOOLEAN,
        roleid: DataTypes.STRING
    }, {
        Sequelize,
        modelName: 'allcode',
    });
    return User;
};