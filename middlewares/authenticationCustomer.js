const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

module.exports = async function (req,res, next) {
  const { access_token } = req.headers
  try {
    if (!access_token) {
      throw {msg: 'access_token not found!', status: 401}
    } else {
      const decoded = verifyToken(access_token)
      const user = await User.findOne({where: { email: decoded.email}})
      if (!user && user.role !== 'customer') {
        throw {msg: 'not authenticated!', status: 401}
      } else {
        req.userLoggedIn = {email: user.email, id: user.id}
        next()
      } 
    }
  } catch (err) {
    next(err)
  }
}