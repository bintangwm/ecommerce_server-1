const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

module.exports = async function (req,res, next) {
  const { access_token } = req.headers
  // console.log(access_token, '<<<<<<<<<<<<<<<<< access_token nihh');
  try {
    if (!access_token) {
      throw {msg: 'access_token not found!', status: 401}
    } else {
      const decoded = verifyToken(access_token)
      // console.log(decoded);
      const user = await User.findOne({where: { email: decoded.email}})
      if (!user) {
        throw {msg: 'not authenticated!', status: 401}
      } else {
        req.userLoggedIn = {email: user.email, id: user.id}
        // console.log(req.userLoggedIn, '<<<<<<<<<<<<<<< user yang login');
        next()
      } 
    }
  } catch (err) {
    // console.log(err, '<<< err di authentication');
    // return res.json(err)
    next(err)
  }
}