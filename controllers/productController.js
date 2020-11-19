const { Product, Category } = require('../models')

class ProductController {
  static async createProduct(req,res,next) {
    // console.log('masuk create'); /////////////////////////////////////////
    const payload = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: +req.body.price,
      stock: +req.body.stock,
      CategoryId: +req.body.CategoryId
    }
    try {
      const product = await Product.create(payload)
      res.status(201).json(product)
    } catch (err) {
      next(err)
    }
  }

  static async getAllProduct(req,res,next) {
    const CategoryId = req.query.CategoryId
    const id = req.query.id
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

  static async getProductById(req,res,next) {
    const productId = +req.params.id
    try {
      if (isNaN(productId)) {
        throw {msg: 'Product id is not valid!'}
      } else {
        const product = await Product.findByPk(productId)
        res.status(200).json(product)
      }
    } catch (err) {
      next(err)
    }
  }

  static async updateProduct(req,res,next) {
    const productId = +req.params.id
    const payload = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: +req.body.price,
      stock: +req.body.stock,
      CategoryId: +req.body.CategoryId
    }
    try {
      if (isNaN(productId)) {
        throw {msg: 'Product id is not valid!'}
      } else {
        const product = await Product.update(payload, {where: {id: productId}, returning: true})
        if (product[0] === 0) {
          throw {msg: 'Product not found!'}
        } else {
          res.status(200).json(product[1][0])
        }
      }
    } catch (err) {
      next(err)
    }
  }

  static async deleteProduct(req,res,next) {
    const productId = +req.params.id
    try {
      if (isNaN(productId)) {
        throw {msg: 'Product id is not valid!'}
      } else {
        const product = await Product.destroy({where: {id: productId}, returning: true})
        if (product === 0) {
          throw {msg: 'Product not found!'}
        } else {
          res.status(200).json({msg: 'Product deleted successfully!'})
        }
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ProductController