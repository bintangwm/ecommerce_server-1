const router = require('express').Router()
const WishlistController = require('../controllers/wishlistController')
const wishlistAuthorization = require('../middlewares//wishlistAuthorization')
const authenticationCustomer = require('../middlewares/authenticationCustomer')

router.use(authenticationCustomer)
router.get('/',  WishlistController.getAllWishlist)
router.get('/:id', wishlistAuthorization, WishlistController.getWishlistById)
router.post('/', WishlistController.createWishlist)
router.delete('/:id', wishlistAuthorization, WishlistController.deleteWishlist)

module.exports = router