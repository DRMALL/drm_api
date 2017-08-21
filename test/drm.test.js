'use strict'

const app = require('../server.js')
const chai = require('chai')
const supertest = require('supertest')
const expect = chai.expect
const adminToken = require('../config').adminToken
const appToken = require('../config').appToken

const request = supertest( app.listen() )


var admin_token, app_token;

describe('DRM without token test', () => {

  it ('首页正常返回', (done) => {
    request.get('/')
    .expect(200)
    .end((err, res) => { 
      expect(res.body).to.be.an('object')
      done()
    })
  })

  it('后台登录', (done) => {
    request.post('/admin/session')
    .send({
      admin: 'admin',
      password: 'admin'
    })
    .end((err, res) => {
      expect(res.body.code).to.equal(201)
      admin_token = res.body.data
      console.log(admin_token)
      done()
    })
  })

  it('APP 登录', (done) => {
    request.post('/app/session')
    .send({
      email: 'wardenger@gmail.com',
      password: '123456'
    })
    .end((err, res) => {
      expect(res.body.code).to.equal(201)
      done()
    })
  })

})

describe('drm admin user test', () => {

  it('新增用户', (done) => {
    request.post('/admin/users/new')
    .query({
      token: adminToken
    })
    .send({
      name: 'testUser',
      password: 'test',
      email: 'test@gmail.com',
      phone: '13545892345',
      company_name: 'test_company',
      address: 'test_address'
    })
    .end((err, res) => {
      expect(res.body.message).to.equal('ok')
      done()
    })
  })

  it('获取所有用户', (done) => {
    request.get('/admin/users')
    .query({
      token: adminToken
    })
    .end((err, res) => {
      expect(res.body.code).to.equal(200)
      done()
    })
  })
  
})


