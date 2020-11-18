const router = require('express').Router()
const CartController = require('../controllers/cartController')
const customerAuthorization = require('../middlewares/customerAuthorization')

router.get('/',  CartController.getAllCart)
router.get('/:id', customerAuthorization, CartController.getCartById)
router.post('/', customerAuthorization, CartController.createCart)
router.put('/:id', customerAuthorization, CartController.updateCart)
router.delete('/:id', customerAuthorization, CartController.deleteCart)

module.exports = router