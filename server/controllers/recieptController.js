const { Reciept } = require('../models/models')
const ApiError = require('../error/ApiError')

class RecieptController {
  async create(req, res, next) {
    try {
      const { number, total } = req.body
      const brand = await Reciept.create({ number, total })
      return res.json(brand)
    } catch (error) {
      return next(ApiError.badRequest(error.message))
    }
  }
  async getAll(req, res, next) {
    try {
      const brands = await Reciept.findAll()
      return res.json(brands)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async delete(req, res) {
    try {
      const { number } = req.params
      const user = await Reciept.destroy({ where: { number } })
      res.json(user)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
  async deleteUnPayed(req, res, next) {
    try {
      const user = await Reciept.destroy({ where: { date: null } })
      res.json(user)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }

  async updateOne(req, res, next) {
    try {
      const { number, date, total } = req.body

      const reciept = await Reciept.update(
        {
          date: date,
          total: total,
        },
        {
          where: {
            number: number,
          },
        }
      )
      return res.json(reciept)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
}

module.exports = new RecieptController()
