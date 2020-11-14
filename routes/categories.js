const router = require('express').Router()
const authorization = require('../middlewares/authorization')
const CategoryController = require('../controllers/categoryController')

router.get('/', authorization, CategoryController.getAllCategory)
router.post('/', authorization, CategoryController.createCategory)
router.get('/:id', authorization, CategoryController.getCategoryById)
router.put('/:id', authorization, CategoryController.updateCategory)
router.delete('/:id', authorization, CategoryController.deleteCategory)

module.exports = router