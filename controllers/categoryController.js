const {Category} = require('../models')

class CategoryController {
  static async createCategory(req,res,next) {
    const payload = {
      name: req.body.name
    }
    try {
      const category = await Category.create(payload)
      res.status(201).json(category)
    } catch (err) {
      next(err)
    }
  }

  static async getAllCategory(req,res,next) {
    const id = req.query.id
    const options = {
      // where: {
      //   ...id ? {id: id} : {}
      // },
      order: [
        ['id', 'ASC']
      ]
    }
    try {
      const category = await Category.findAll(options)
      res.status(200).json(category)
    } catch (err) {
      next(err)
    }
  }

  static async getCategoryById(req,res,next) {
    const id = +req.params.id
    try {
      if (isNaN(id)) {
        throw {msg: 'Category id is not valid!'}
      } else {
        const category = await Category.findByPk(id)
        res.status(200).json(category)
      }
    } catch (err) {
      next(err)
    }
  }

  static async updateCategory(req,res,next) {
    const id = +req.params.id
    const payload = {
      name: req.body.name
    }
    try {
      if (isNaN(id)) {
        throw {msg: 'Category id is not valid!'}
      } else {
        const category = await Category.update(payload, {where: {id: id}, returning: true})
        if (category[0] === 0) {
          throw {msg: 'Category not found!'}
        } else {
          res.status(200).json(category[1][0])
        }
      }
    } catch (err) {
      next(err)
    }
  }

  static async deleteCategory(req,res,next) {
    const id = +req.params.id
    try {
      if (isNaN(id)) {
        throw {msg: 'Category id is not valid!'}
      } else {
        const category = await Category.destroy({where: {id: id}, returning: true})
        if (category === 0) {
          throw {msg: 'Category not found!'}
        } else {
          res.status(200).json({msg: 'Category deleted successfully!'})
        }
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = CategoryController