const router = require('express').Router()
const CartController = require('../controllers/cartController')
const cartAuthorization = require('../middlewares/cartAuthorization')
const authenticationCustomer = require('../middlewares/authenticationCustomer')

router.use(authenticationCustomer)
router.get('/',  CartController.getAllCart)
router.get('/:id', cartAuthorization, CartController.getCartById)
router.post('/', CartController.createCart)
router.put('/:id', cartAuthorization, CartController.updateCart)
router.delete('/:id', cartAuthorization, CartController.deleteCart)

module.exports = router