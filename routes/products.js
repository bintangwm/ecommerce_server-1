const router = require('express').Router()
const authorization = require('../middlewares/authorization')
const ProductController = require('../controllers/productController')
const authentication = require('../middlewares/authentication')

router.get('/', ProductController.getAllProduct)

router.use(authentication)
router.post('/', authorization, ProductController.createProduct)
router.get('/:id', authorization, ProductController.getProductById)
router.put('/:id', authorization, ProductController.updateProduct)
router.delete('/:id', authorization, ProductController.deleteProduct)

module.exports = router