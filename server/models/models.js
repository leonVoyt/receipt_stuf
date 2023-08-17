const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const Product = sequelize.define('product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
})

const Reciept = sequelize.define('reciepts', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  number: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATEONLY, defaultValue: null },
  total: { type: DataTypes.INTEGER, allowNull: false },
})

const Product_in_reciept = sequelize.define('products_in_reciepts', {
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
})

Product.belongsToMany(Reciept, { through: Product_in_reciept })
Reciept.belongsToMany(Product, { through: Product_in_reciept })

module.exports = {
  Product,
  Reciept,
  Product_in_reciept,
}
