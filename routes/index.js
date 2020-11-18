const router = require('express').Router()
const productRouter = require('./products')
const categoryRouter = require('./categories')
const bannerRouter = require('./banners')
const cartRouter = require('./carts')
const UserController = require('../controllers/userController')
const authentication = require('../middlewares/authentication')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)
router.use('/products', productRouter)
router.use('/categories', categoryRouter)
router.use('/banners', bannerRouter)
router.use('/carts', cartRouter)

module.exports = router