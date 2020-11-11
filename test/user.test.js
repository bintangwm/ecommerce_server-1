const request = require('supertest'); 
const app = require('../app');
const {sequelize} = require('../models');
const {queryInterface} = sequelize

afterAll((done) => {
  queryInterface.bulkDelete('Users')
  .then(() => {
    console.log('===========test login finished===========');
    done()
  })
  .catch(err => {
    done(err)
  })
});
 
describe('Test endpoint POST /register', () => {
  test('testing register berhasil', (done) => {
    request(app)
      .post('/register')
      .send({email: 'a@gmail.com', password: 'asdasd'})
      .then(response => {
        let { body, status } = response
        expect(status).toBe(201)
        expect(body).toHaveProperty('id', expect.any(Number))
        expect(body).toHaveProperty('email', 'a@gmail.com')
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  
  it('testing duplicate email', done => {
    request(app)
    .post('/register')
    .send({email: 'a@gmail.com', password: 'asdasd'})
    .then(response => {
      let { body, status } = response
      expect(status).toBe(400)
      expect(body).toHaveProperty('msg', 'Email already exist!')
      done()
    })
    .catch(err => {
      done(err)
    })
  })

  it('testing password kosong', done => {
    request(app)
    .post('/register')
    .send({email: 'q@gmail.com', password: ''})
    .then(response => {
      let { body, status } = response
      expect(status).toBe(400)
      expect(body).toHaveProperty('msg', 'Password cannot be empty!')
      done()
    })
    .catch(err => {
      done(err)
    })
  })

  it('testing email kosong', done => {
    request(app)
    .post('/register')
    .send({email: '', password: 'qweqwe'})
    .then(response => {
      let { body, status } = response
      expect(status).toBe(400)
      expect(body).toHaveProperty('msg', 'Email cannot be empty!')
      done()
    })
    .catch(err => {
      done(err)
    })
  })
});

describe('testing di POST /login', function() {
  it('login berhasil', function(done) {
    request(app)
      .post('/login')
      .send({email: 'a@gmail.com', password: 'asdasd'})
      .then(response => {
        let { body, status} = response
        expect(status).toBe(200)
        expect(body).toHaveProperty('access_token')
        expect(body).toHaveProperty('email', 'a@gmail.com')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('email ada, password salah', function(done) {
    request(app)
      .post('/login')
      .send({email: 'a@gmail.com', password: 'asd'})
      .then(response => {
        let { body, status} = response
        expect(body).toHaveProperty('msg', 'Wrong email/password!')
        expect(status).toBe(400)
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('email tidak ada di db', function(done) {
    request(app)
      .post('/login')
      .send({email: 'andreaPirlo@gmail.com', password: 'qwe'})
      .then(response => {
        let { body, status} = response
        expect(body).toHaveProperty('msg', 'Wrong email/password!')
        expect(status).toBe(404)
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('tidak memasukkan email dan password', function(done) {
    request(app)
      .post('/login')
      .send({email: '', password: ''})
      .then(response => {
        let { body, status} = response
        expect(body).toHaveProperty('msg', 'Email and password required!')
        expect(status).toBe(400)
        done()
      })
      .catch(err => {
        done(err)
      })
  })
});