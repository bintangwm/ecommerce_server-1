const { Product, Category, Banner } = require('../models')

class CustomerController {
  static async getAllProduct(req,res,next) {
    const options = {
      order: [
        ['id', 'ASC']
      ],
      include: ['Category']
    }
    try {
      const products = await Product.findAll(options)
      res.status(200).json(products)
    } catch (err) {
      next(err)
    }
  }

  static async getAllBanner(req,res,next) {
    const options = {
      order: [
        ['id', 'ASC']
      ]
    }
    try {
      const banner = await Banner.findAll(options)
      res.status(200).json(banner)
    } catch (err) {
      next(err)
    }
  }

  static async getAllCategory(req,res,next) {
    const options = {
      order: [
        ['id', 'ASC']
      ]
    }
    try {
      const category = await Category.findAll(options)
      res.status(200).json(category)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = CustomerController
