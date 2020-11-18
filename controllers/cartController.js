const { Cart, Product, User } = require('../models')

class CartController {
  static async getAllCart (req, res, next) {
    const UserId = +req.userLoggedIn.id
    const options = {
      where: { 
        UserId,
        status: 1
      },
      include: ['Product']
    }
    try {
      const carts = await Cart.findAll (options)
      res.status(200).json(carts)
    } catch (err) {
      next(err)
    }
  }

  static async getCartById (req, res, next) {
    const UserId = +req.userLoggedIn.id
    const id = +req.params.id
    const options = {
      where: { 
        id,
        UserId,
        status: 1
      },
      include: ['Product']
    }
    try {
      const cart = await Cart.findOne (options)
      res.status(200).json(cart)
    } catch (err) {
      console.log(err);
      next(err)
    }
  }

  static async createCart (req, res, next) {
    const UserId = +req.userLoggedIn.id
    const ProductId = +req.body.ProductId
    const payload = {
      UserId,
      ProductId,
      quantity: 1,
      status: 1
    }
    try {
      if (!ProductId) { // mencegah input ProductId == kosong atau NaN
        throw { msg: 'ProductId is invalid!'}
      } else {
        const options ={
          where: {
            UserId,
            ProductId,
            status: 1
          }
        }
        const product = await Product.findByPk(ProductId)
        if (!product) {
          throw { msg: 'product not found!', status: 404 }
        } else {
          let cart = await Cart.findOne(options)
          if (!cart) {
            cart = await Cart.create (payload)
          } else {
            if (cart.quantity >= product.stock) {
              throw { msg: "can't add quantity more than stock !", status: 404 }
            } else {
              cart = await Cart.increment('quantity', options)
              cart = cart[0][0][0]
            }
          }
          res.status(200).json(cart)
        }
      }
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async updateCart (req, res, next) {
    const UserId = +req.userLoggedIn.id
    const CartId = +req.params.id
    const order = +req.body.order
    // perintah berupa integer:
    // 1 = increment
    // 2 = decrement
    // bila quantity <= 0 || (quantity == 1 && order == 2) maka destroy
    // bila quantity >= stock maka tidak boleh tambah lagi
    console.log({
      CartId,
      UserId,
      order
    })
    try {
      let result = {}
      let cart = await Cart.findByPk(CartId, { include: ['Product'] })
      const options ={
        where: {
          id: CartId,
          UserId,
          status: 1
        }
      }
      if (cart.quantity >= cart.Product.stock && order == 1) {
        throw { msg: "can't add quantity more than stock !", status: 404 }
      } else if (cart.quantity <= 0 || (cart.quantity == 1 && order == 2)) {
        // kalo quantitynya <= 0 langsung dihapus
        const destroy = await Cart.destroy(options)
        result = 'Cart deleted succesfully'
      } else if (order == 1) {
        cart = await Cart.increment('quantity', options)
        result = cart[0][0][0]
      } else if (order == 2) {
        cart = await Cart.decrement('quantity', options)
        result = cart[0][0][0]
      } else if (order != 1 || order != 2) {
        throw { msg: "wrong order!", status: 400 }
      }
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  static async deleteCart (req, res, next) {
    const UserId = +req.userLoggedIn.id
    const CartId = +req.params.id
    try {
      const options ={
        where: {
          id: CartId,
          UserId
        }
      }
      const destroy = await Cart.destroy(options)
      res.status(200).json({ msg: 'delete succeed' })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = CartController