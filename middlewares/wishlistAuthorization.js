const { User, Wishlist } = require('../models')

module.exports = async function (req, res, next) {
  const userId = +req.userLoggedIn.id
  const id = +req.params.id
  // membandingkan userId di wishlist dengan user yang sedang login 
  try {
    if (!userId || !id) {
      throw { msg: 'UserId/WishlistId is invalid!'}  // mencegah input ProductId == kosong atau NaN
    } else {
      const wishlist = await Wishlist.findByPk(id)
      // console.log(cart.UserId, userId)
      if (!wishlist) {
        throw {msg: 'wishlist not found!', status: 404}
      } else if (wishlist.UserId != userId) {
        throw {msg: 'not authorized!', status: 401}
      } else {
        next()
      }
    }
  } catch (err) {
    next(err)
  }
}