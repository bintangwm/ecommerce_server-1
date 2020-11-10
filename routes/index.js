const router = require('express').Router()
const productRouter = require('./products')
const UserController = require('../controllers/userController')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

// router.use(authentication)
router.use('/products', productRouter)

module.exports = router