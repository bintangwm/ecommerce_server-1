const router = require('express').Router()
const productRouter = require('./products')
const categoryRouter = require('./categories')
const bannerRouter = require('./banners')
const UserController = require('../controllers/userController')
const authentication = require('../middlewares/authentication')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)
router.use('/products', productRouter)
router.use('/categories', categoryRouter)
router.use('/banners', bannerRouter)

module.exports = router