const { User } = require('../models')

module.exports = async function (req, res, next) {
  const userId = +req.userLoggedIn.id
  try {
    const user = await User.findByPk(userId)
    if (user.role != 'customer') {
      throw {msg: 'not authorized!', status: 401}
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}