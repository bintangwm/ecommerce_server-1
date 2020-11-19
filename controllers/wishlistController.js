const { Wishlist, Product } = require('../models')

class WishlistController {
  static async getAllWishlist (req, res, next) {
    const UserId = +req.userLoggedIn.id
    console.log(UserId);
    const options = {
      where: { 
        UserId
      },
      order: [
        ['id', 'ASC']
      ],
      include: ['Product']
    }
    try {
      const wishlists = await Wishlist.findAll (options)
      res.status(200).json(wishlists)
    } catch (err) {
      next(err)
    }
  }

  static async getWishlistById (req, res, next) {
    const UserId = +req.userLoggedIn.id
    const id = +req.params.id
    const options = {
      where: { 
        id,
        UserId
      },
      include: ['Product']
    }
    try {
      const wishlist = await Wishlist.findOne (options)
      res.status(200).json(wishlist)
    } catch (err) {
      console.log(err);
      next(err)
    }
  }

  static async createWishlist (req, res, next) {
    const UserId = +req.userLoggedIn.id
    const ProductId = +req.body.ProductId
    const payload = {
      UserId,
      ProductId
    }
    try {
      if (!ProductId) { // mencegah input ProductId == kosong atau NaN
        throw { msg: 'ProductId is invalid!'}
      } else {
        const options = {
          where: {
            UserId,
            ProductId
          }
        }
        const product = await Product.findByPk(ProductId)
        if (!product) {
          throw { msg: 'product not found!', status: 404 }
        } else {
          let wishlist = await Wishlist.findOne(options)
          if (!wishlist) {
            wishlist = await Wishlist.create (payload)
            res.status(201).json(wishlist)
          } else {
            throw { msg: 'This product has already in your wishlist!', status: 400}
          }
        }
      }
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async deleteWishlist (req, res, next) {
    const UserId = +req.userLoggedIn.id
    const WishlistId = +req.params.id
    try {
      const options ={
        where: {
          id: WishlistId,
          UserId
        }
      }
      const destroy = await Wishlist.destroy(options)
      res.status(200).json({ msg: 'delete wishlist succeed' })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = WishlistController