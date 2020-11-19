'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Cart)
      User.hasMany(models.Wishlist)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty:{
          args: true,
          msg: "Email cannot be empty!"
        },
        isEmail: {
          args: true,
          msg: "Insert a valid email!"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          args:true,
          msg: "Password cannot be empty!"
        },
        len: {
          args: [6],
          msg: "Password must be longer than 6 character!"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          args: true,
          msg: "Role cannot be empty!"
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(user, options) {
        user.password = hashPassword(user.password)
      },
      beforeValidate (user, options) {
        user.role = 'customer'
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};