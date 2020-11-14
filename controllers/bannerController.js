const {Banner} = require('../models')

class BannerController {
  static async createBanner(req,res,next) {
    const payload = {
      title: req.body.title,
      status: req.body.status,
      image_url: req.body.image_url
    }
    try {
      const banner = await Banner.create(payload)
      res.status(201).json(banner)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async getAllBanner(req,res,next) {
    // const id = req.query.id
    const options = {
      // where: {
      //   ...id ? {id: id} : {}
      // },
      order: [
        ['id', 'ASC']
      ]
    }
    try {
      const banner = await Banner.findAll(options)
      res.status(200).json(banner)
    } catch (err) {
      next(err)
    }
  }

  static async getBannerById(req,res,next) {
    const id = +req.params.id
    try {
      if (isNaN(id)) {
        throw {msg: 'Banner id is not valid!'}
      } else {
        const banner = await Banner.findByPk(id)
        res.status(200).json(banner)
      }
    } catch (err) {
      next(err)
    }
  }

  static async updateBanner(req,res,next) {
    const id = +req.params.id
    const payload = {
      title: req.body.title,
      status: req.body.status,
      image_url: req.body.image_url
    }
    try {
      if (isNaN(id)) {
        throw {msg: 'Banner id is not valid!'}
      } else {
        const banner = await Banner.update(payload, {where: {id: id}, returning: true})
        if (banner[0] === 0) {
          throw {msg: 'Banner not found!'}
        } else {
          res.status(200).json(banner[1][0])
        }
      }
    } catch (err) {
      next(err)
    }
  }

  static async deleteBanner(req,res,next) {
    const id = +req.params.id
    try {
      if (isNaN(id)) {
        throw {msg: 'Banner id is not valid!'}
      } else {
        const banner = await Banner.destroy({where: {id: id}, returning: true})
        if (banner === 0) {
          throw {msg: 'Banner not found!'}
        } else {
          res.status(200).json({msg: 'Banner deleted successfully!'})
        }
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = BannerController