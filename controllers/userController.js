const { User } = require('../models')
const { signToken } = require('../helpers/jwt')
const { checkPassword } = require('../helpers/bcrypt')

class UserController {
  static async register(req, res, next) {
    const {email, password} = req.body
    const payload = {
      email,
      password,
      role: 'customer'
    }
    try {
      if (!email && !password) {
        throw {msg: 'Email and password cannot be empty!', status: 400}
      } else { 
        const user = await User.create(payload)
        const result = {
          id: user.id,
          email: user.email,
          role: user.role
        }      
        res.status(201).json(result)
      }
    } catch (err) {
      next(err)
    }
  }

  static async login(req, res, next) {
    const { password, email } = req.body
    console.log(req.body);
    try {
      if (!password && !email) {
        throw { msg: 'Email and password required!', status: 400}
      }
      const user = await User.findOne({where: { email: email}})
      if (!user) {
        throw { msg: 'Wrong email/password!', status: 404}
      } else {
        if (!checkPassword(password, user.password)) {
          throw { msg: 'Wrong email/password!', status: 400}
        } else {
          const payload = { id: user.id, email: user.email }
          const access_token = signToken(payload)
          const data = {
            access_token,
            email: user.email
          }
          res.status(200).json(data)
        }
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserController
