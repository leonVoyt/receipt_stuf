const { Product } = require('../models/models')
const ApiError = require('../error/ApiError')
const { where } = require('sequelize')

class ProductController {
  async create(req, res, next) {
    try {
      const { name, price } = req.body
      const product = await Product.create({ name, price })
      return res.json(product)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
  async getAll(req, res, next) {
    try {
      const product = await Product.findAll()
      return res.json(product)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
  async getOne(req, res, next) {
    const { id } = req.params
    try {
      const product = await Product.findOne({ where: { id } })
      return res.json(product)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
  async delete(req, res, next) {
    try {
      const { id } = req.params
      const product = await Product.destroy({ where: { id } })
      res.json(product)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
}

module.exports = new ProductController()
