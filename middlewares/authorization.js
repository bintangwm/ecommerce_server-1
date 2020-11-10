const { User } = require('../models')

module.exports = async function (req, res, next) {
  const userId = +req.userLoggedIn.id
  try {
    const user = await User.findByPk(userId)
    // console.log(user.role, '<<<<<<<<<<<<<<<<< role');
    if (user.role != 'admin') {
      throw {msg: 'not authorized!', status: 401}
    } else {
      next()
    }
  } catch (err) {
    // console.log(err);
    next(err)
  }
}