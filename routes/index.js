const router = require('express').Router()
const productRouter = require('./products')
const categoryRouter = require('./categories')
const bannerRouter = require('./banners')
const cartRouter = require('./carts')
const wishlistRouter = require('./wishlists')
const UserController = require('../controllers/userController')
const CustomerController = require('../controllers/customerController')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use('/products', productRouter)
router.use('/categories', categoryRouter)
router.use('/banners', bannerRouter)
router.use('/carts', cartRouter)
router.use('/wishlists', wishlistRouter)

router.get('/customer-products', CustomerController.getAllProduct)
router.get('/customer-banners', CustomerController.getAllBanner)
router.get('/customer-categories', CustomerController.getAllCategory)

module.exports = router