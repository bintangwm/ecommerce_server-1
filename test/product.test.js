const request = require('supertest')
const app = require('../app')
const {sequelize} = require('../models')
const { queryInterface } = sequelize
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(+process.env.SALT)

beforeAll(done => {
  console.log('===========test product begun===========');
  
  queryInterface.bulkDelete('Products')
  .then(() => {
    return (queryInterface.bulkDelete('Users'))
  })
  .then(() => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'admin@mail.com',
          password: bcrypt.hashSync('1234', salt),
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'a@mail.com',
          password: bcrypt.hashSync('asdasd', salt),
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ]
    )
  })
  .then(data => {
    done()
  })
  .catch(err => {
    done(err)
  })
})

// afterAll((done) => {
// });

describe('Create product, POST /products', function() {
  it('tidak menyertakan access_token', function(done) {
    request(app)
      .post('/products')
      .send({
        name: 'PS-5',
        image_url: 'https://cdn.mos.cms.futurecdn.net/yUnL8v4TynaEDbtjsUwDhg-768-80.jpg',
        price: 12000000,
        stock: 10,
        category: 'Elektronik'
      })
      // .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNDkzNjgzMX0.rZxW70ZR9OSVht-SETIk1_L30_ycSbaoJxOfHd9XJVA')
      .then(response => {
        let {body, status} = response
        expect(status).toBe(401)
        expect(body).toHaveProperty('msg', 'access_token not found!')
        done()
      })
      .catch(err => {
        done(err)
      })
  });

  it('menyertakan access_token tapi bukan admin', function(done) {
    request(app)
      .post('/products')
      .send({
        name: 'PS-5',
        image_url: 'https://cdn.mos.cms.futurecdn.net/yUnL8v4TynaEDbtjsUwDhg-768-80.jpg',
        price: 12000000,
        stock: 10,
        category: 'Elektronik'
      })
      .set({access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJhQG1haWwuY29tIiwiaWF0IjoxNjA0OTg2MjM3fQ.eP5Cq5HgGKYwon3RVRGGIexERe7ihRlFtICi8qzKMGI'})
      .then(response => {
        let {body, status} = response
        expect(status).toBe(401)
        expect(body).toHaveProperty('msg', 'not authorized!')
        done()
      })
      .catch(err => {
        done(err)
      })
  });

  it('create product', function(done) {
    request(app)
      .post('/products')
      .send({
        name: 'PS-5',
        image_url: 'https://cdn.mos.cms.futurecdn.net/yUnL8v4TynaEDbtjsUwDhg-768-80.jpg',
        price: 12000000,
        stock: 10,
        category: 'Elektronik'
      })
      .set({access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNDkzNjgzMX0.rZxW70ZR9OSVht-SETIk1_L30_ycSbaoJxOfHd9XJVA'})
      .then(response => {
        let {body, status} = response
        expect(status).toBe(201)
        expect(body).toHaveProperty('name', 'PS-5')
        expect(body).toHaveProperty('image_url', 'https://cdn.mos.cms.futurecdn.net/yUnL8v4TynaEDbtjsUwDhg-768-80.jpg')
        expect(body).toHaveProperty('price', 12000000)
        expect(body).toHaveProperty('stock', 10)
        expect(body).toHaveProperty('category', 'Elektronik')
        done()
      })
      .catch(err => {
        done(err)
      })
  });

  // it('field yang required tidak diisi', function(done) {
  //   request(app)
  //     .post('/products')
  //     .send({
  //       name: 'PS-5',
  //       image_url: 'https://cdn.mos.cms.futurecdn.net/yUnL8v4TynaEDbtjsUwDhg-768-80.jpg',
  //       price: 12000000,
  //       stock: 10,
  //       category: 'Elektronik'
  //     })
  //     .set({access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNDkzNjgzMX0.rZxW70ZR9OSVht-SETIk1_L30_ycSbaoJxOfHd9XJVA'})
  //     .then(response => {
  //       let {body, status} = response
  //       console.log(body);
  //       expect(status).not.toBe(400)
  //       expect(body).not.toHaveProperty('msg', 'Name cannot be empty!')
  //       expect(body).not.toHaveProperty('msg', 'Insert a valid image URL!')
  //       expect(body).not.toHaveProperty('msg', 'Insert a valid number for price!')
  //       expect(body).not.toHaveProperty('msg', 'Insert a valid number for stock!')
  //       expect(body).not.toHaveProperty('msg', 'Category cannot be empty!')
  //       done()
  //     })
  //     .catch(err => {
  //       console.log(err, '<<<<<<<< errors');
  //       done(err)
  //     })
  // });

  it('stock diisi angka minus', function(done) {
    request(app)
      .post('/products')
      .send({
        name: 'PS-5',
        image_url: 'https://cdn.mos.cms.futurecdn.net/yUnL8v4TynaEDbtjsUwDhg-768-80.jpg',
        price: 12000000,
        stock: -10,
        category: 'Elektronik'
      })
      .set({access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNDkzNjgzMX0.rZxW70ZR9OSVht-SETIk1_L30_ycSbaoJxOfHd9XJVA'})
      .then(response => {
        let {body, status} = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg', 'Cannot insert minus stock!')
        done()
      })
      .catch(err => {
        done(err)
      })
  });

  it('price diisi angka minus', function(done) {
    request(app)
      .post('/products')
      .send({
        name: 'PS-5',
        image_url: 'https://cdn.mos.cms.futurecdn.net/yUnL8v4TynaEDbtjsUwDhg-768-80.jpg',
        price: -2,
        stock: 10,
        category: 'Elektronik'
      })
      .set({access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNDkzNjgzMX0.rZxW70ZR9OSVht-SETIk1_L30_ycSbaoJxOfHd9XJVA'})
      .then(response => {
        let {body, status} = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg', 'Cannot insert minus price!')
        done()
      })
      .catch(err => {
        done(err)
      })
  });

  it('price diisi tipe data yang tidak sesuai', function(done) {
    request(app)
      .post('/products')
      .send({
        name: 'PS-5',
        image_url: 'https://cdn.mos.cms.futurecdn.net/yUnL8v4TynaEDbtjsUwDhg-768-80.jpg',
        price: '2s',
        stock: 10,
        category: 'Elektronik'
      })
      .set({access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNDkzNjgzMX0.rZxW70ZR9OSVht-SETIk1_L30_ycSbaoJxOfHd9XJVA'})
      .then(response => {
        let {body, status} = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg', 'Insert a valid number for price!')
        done()
      })
      .catch(err => {
        done(err)
      })
  });

  it('stock diisi tipe data yang tidak sesuai', function(done) {
    request(app)
      .post('/products')
      .send({
        name: 'PS-5',
        image_url: 'https://cdn.mos.cms.futurecdn.net/yUnL8v4TynaEDbtjsUwDhg-768-80.jpg',
        price: 12000000,
        stock: '10ah',
        category: 'Elektronik'
      })
      .set({access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNDkzNjgzMX0.rZxW70ZR9OSVht-SETIk1_L30_ycSbaoJxOfHd9XJVA'})
      .then(response => {
        let {body, status} = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg', 'Insert a valid number for stock!')
        done()
      })
      .catch(err => {
        done(err)
      })
  });
});

describe('Update product, PUT /products', function() {
  it('tidak menyertakan access_token', function(done) {
    request(app)
      .put('/products/1')
      // .set({access_token: ''})
      .send({
        name: 'Gundam',
        image_url: 'https://cf.shopee.co.id/file/e1f03405f9dfcc81f068ccbef2f8851e',
        price: 3500000,
        stock: 12,
        category: 'Elektronik'
      })
      .then(response => {
        let { body, status } = response
        expect(body).toEqual({msg: 'access_token not found!'})
        expect(status).toBe(401)
        done()
      })
      .catch(err => {
        done(err)
      })
  });

  it('menyertakan access_token tapi bukan admin', function(done) {
    request(app)
      .put('/products/1')
      .set({access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJhQG1haWwuY29tIiwiaWF0IjoxNjA0OTg2MjM3fQ.eP5Cq5HgGKYwon3RVRGGIexERe7ihRlFtICi8qzKMGI'})
      .send({
        name: 'Gundam',
        image_url: 'https://cf.shopee.co.id/file/e1f03405f9dfcc81f068ccbef2f8851e',
        price: 3500000,
        stock: 12,
        category: 'Elektronik'
      })
      .then(response => {
        let { body, status } = response
        console.log(body, '<<<<<<<<<<<<<<< ini update product');
        expect(body).toEqual({msg: 'not authorized!'})
        expect(status).toBe(401)
        done()
      })
      .catch(err => {
        console.log(err, '<<<<<< error');
        done(err)
      })
  });

  // it('stock diisi angka minus', function(done) {
  //   request(app)
  //     .put('/products/1')
  //     .send({
  //       name: 'PS-5',
  //       image_url: 'https://cdn.mos.cms.futurecdn.net/yUnL8v4TynaEDbtjsUwDhg-768-80.jpg',
  //       price: 12000000,
  //       stock: -10,
  //       category: 'Elektronik'
  //     })
  //     .set({access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNDkzNjgzMX0.rZxW70ZR9OSVht-SETIk1_L30_ycSbaoJxOfHd9XJVA'})
  //     .then(response => {
  //       let {body, status} = response
  //       // console.log(body);
  //       expect(status).toBe(400)
  //       expect(body).toHaveProperty('msg', 'Cannot insert minus stock!')
  //       done()
  //     })
  //     .catch(err => {
  //       // console.log(err, '<<<<<<<< errors');
  //       done(err)
  //     })
  // });

  // it('price diisi angka minus', function(done) {
  //   request(app)
  //     .put('/products/1')
  //     .send({
  //       name: 'PS-5',
  //       image_url: 'https://cdn.mos.cms.futurecdn.net/yUnL8v4TynaEDbtjsUwDhg-768-80.jpg',
  //       price: -2,
  //       stock: 10,
  //       category: 'Elektronik'
  //     })
  //     .set({access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNDkzNjgzMX0.rZxW70ZR9OSVht-SETIk1_L30_ycSbaoJxOfHd9XJVA'})
  //     .then(response => {
  //       let {body, status} = response
  //       // console.log(body);
  //       expect(status).toBe(400)
  //       expect(body).toHaveProperty('msg', 'Cannot insert minus price!')
  //       done()
  //     })
  //     .catch(err => {
  //       // console.log(err, '<<<<<<<< errors');
  //       done(err)
  //     })
  // });
});

describe('Delete product, DELETE /products', function() {
  it('tidak menyertakan access_token', function(done) {
    request(app)
      .delete('/products/4')
      // .set({access_token: ''})
      .then(response => {
        let { body, status } = response
        expect(body).toEqual({msg: 'access_token not found!'})
        expect(status).toBe(401)
        done()
      })
      .catch(err => {
        done(err)
      })
  });

  it('menyertakan access_token tapi bukan admin', function(done) {
    request(app)
      .delete('/products/6')
      .set({access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJhQG1haWwuY29tIiwiaWF0IjoxNjA0OTg2MjM3fQ.eP5Cq5HgGKYwon3RVRGGIexERe7ihRlFtICi8qzKMGI'})
      .then(response => {
        let { body, status } = response
        expect(body).toEqual({msg: 'not authorized!'})
        expect(status).toBe(401)
        done()
      })
      .catch(err => {
        done(err)
      })
  });

  it('delete berhasil', function(done) {
    request(app)
      .delete('/products/7')
      .set({access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNDkzNjgzMX0.rZxW70ZR9OSVht-SETIk1_L30_ycSbaoJxOfHd9XJVA'})
      .then(response => {
        let { body, status } = response
        expect(body).toEqual({msg: 'Product deleted successfully!'})
        expect(status).toBe(200)
        done()
      })
      .catch(err => {
        done(err)
      })
  });
});
