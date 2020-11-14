const router = require('express').Router()
const authorization = require('../middlewares/authorization')
const BannerController = require('../controllers/bannerController')

router.get('/', authorization, BannerController.getAllBanner)
router.post('/', authorization, BannerController.createBanner)
router.get('/:id', authorization, BannerController.getBannerById)
router.put('/:id', authorization, BannerController.updateBanner)
router.delete('/:id', authorization, BannerController.deleteBanner)

module.exports = router