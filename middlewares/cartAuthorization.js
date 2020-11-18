const { User, Cart } = require('../models')

module.exports = async function (req, res, next) {
  const userId = +req.userLoggedIn.id
  const id = +req.params.id
  // membandingkan userId di cart dengan user yang sedang login 
  try {
    if (!userId || !id) {
      throw { msg: 'UserId/CartId is invalid!'}  // mencegah input ProductId == kosong atau NaN
    } else {
      const cart = await Cart.findByPk(id)
      if (!cart) {
        throw {msg: 'cart not found!', status: 401}
      } else if (cart.UserId != userId) {
        throw {msg: 'not authorized!', status: 401}
      } else {
        next()
      }
    }
  } catch (err) {
    next(err)
  }
}