const router = require('express').Router()
const authorization = require('../middlewares/authorization')
const BannerController = require('../controllers/bannerController')
const authentication = require('../middlewares/authentication')

router.get('/', BannerController.getAllBanner)
router.use(authentication)
router.post('/', authorization, BannerController.createBanner)
router.get('/:id', authorization, BannerController.getBannerById)
router.put('/:id', authorization, BannerController.updateBanner)
router.delete('/:id', authorization, BannerController.deleteBanner)

module.exports = router