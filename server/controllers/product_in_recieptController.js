const { Product_in_reciept } = require('../models/models')
const ApiError = require('../error/ApiError')

class Product_in_recieptController {
  async create(req, res, next) {
    try {
      const { quantity, price, productId, recieptId } = req.body
      const product_reciept = await Product_in_reciept.create({
        quantity,
        price,
        productId,
        recieptId,
      })
      return res.json(product_reciept)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
  async getAll(req, res, next) {
    try {
      const product_reciepts = await Product_in_reciept.findAll()
      return res.json(product_reciepts)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async delete(req, res, next) {
    try {
      const { productId } = req.params
      const user = await Product_in_reciept.destroy({ where: { productId } })
      res.json(user)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
  async deleteAll(req, res, next) {
    try {
      const { recieptId } = req.params
      const user = await Product_in_reciept.destroy({ where: { recieptId } })
      res.json(user)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async updateOne(req, res, next) {
    try {
      const { productId, quantity } = req.body

      const product_reciept = await Product_in_reciept.update(
        {
          quantity: quantity,
        },
        {
          where: {
            productId: productId,
          },
        }
      )
      return res.json(product_reciept)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
}

module.exports = new Product_in_recieptController()
