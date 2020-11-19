'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User)
      Cart.belongsTo(models.Product)
      // Cart.belongsToMany(models.Category, { through: models.Product })
    }
  };
  Cart.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          args: true,
          msg: 'Quantity must be a number!'
        },
        min: {
          args: [1],
          msg: 'Quantity must be greater than 0!'
        }
      }
    },
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};