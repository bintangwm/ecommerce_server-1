const {Product} = require('../models')

class ProductController {
  static async createProduct(req,res,next) {
    // console.log('masuk create'); /////////////////////////////////////////
    const payload = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: +req.body.price,
      stock: +req.body.stock,
      category: req.body.category
    }
    try {
      const product = await Product.create(payload)
      res.status(201).json(product)
    } catch (err) {
      // console.log(err, '<<< create product');
      // return res.status(201).json(err)
      next(err)
    }
  }

  static async getAllProduct(req,res,next) {
    const category = req.query.category
    const id = req.query.id
    const options = {
      where: {
        ...category ? {category: category} : {},
        ...id ? {id: id} : {}
      },
      order: [
        ['id', 'ASC']
      ]
    }
    try {
      const products = await Product.findAll(options)
      res.status(200).json(products)
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
      category: req.body.category
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