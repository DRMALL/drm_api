'use strict'

const app = require('../server.js')
const chai = require('chai')
const supertest = require('supertest')
const expect = chai.expect

// const adminToken = require('../config').adminToken
// const appToken = require('../config').appToken
// var admin_token, app_token;

const request = supertest( app.listen() )

var admin_token, app_token, newsid, bugsid;

describe('DRM测试', () => {

  it('后台登录', async () => {
    const result = await request.post('/admin/session')
      .send({
        admin:'admin',
        password: 'admin'
      })      
    admin_token = result.body.data
    expect(result.body.message).to.equal('ok')
  })

  it('创建用户', async () => {
    const result = await request.post('/admin/users/new')
      .query({ token: admin_token })
      .send({
        name: 'test',
        password: 'test',
        email: 'test@test.com',
        phone: 13311001100,
        company_name: 'test',
        address: 'test',
      })
    expect(result.body.message).to.equal('ok')
  })

  it('获取用户', async () => {
    const result = await request.get('/admin/users')
      .query({ token: admin_token })
    expect(result.body.message).to.equal('ok')
  })

  it('APP登录', async () => {
    const result = await request.post('/app/session')
    .send({ email: 'test@test.com', password: 'test' })

    app_token = result.body.data
    expect(result.body.message).to.equal('ok')

  })


  it('获取用户名字', async () => {
    const result = await request.get('/admin/users')
      .query({ token: admin_token , type: 'name' })
    expect(result.body.message).to.equal('ok')
  })


  it('获取单个用户', async () => {
    const id = parse_id(app_token)
    const result = await request.get(`/admin/users/${id}`)
      .query({ token: admin_token })
    expect(result.body.message).to.equal('ok')
  })

  it('更新单个用户', async () => {
    const id = parse_id(app_token)
    const result = await request.put(`/admin/users/${id}`)
      .query({ token: admin_token })
      .send({
        name: 'test2',
        password: 'test',
        email: 'test@test.com',
        phone: 13311001100,
        company_name: 'test',
        address: 'test',
      })
    expect(result.body.message).to.equal('ok')
  })

  it('更改用户密码', async() => {
    const result = await request.post('/app/user/update/password')
      .query({ token: app_token })
      .send({
        password: 'test',
        newPass: 'test2',
        confirmPass: 'test2'
      })
    expect(result.body.message).to.equal('修改成功')
  })

  it('创建消息新闻', async () => {
    const result = await request.post('/admin/news/new')
      .query({ token: admin_token })
      .send({
        title: 'title',
        abstract: '摘要',
        content: '内容',
        images: [{
          url: 'http://aa.com'
        }, {
          url: 'http://aa.com'
        }],
      })
    newsid = result.body.data._id
    expect(result.body.message).to.equal('创建成功')    
  })

  it('获取消息新闻', async () => {
    const result = await request.get('/admin/news/all')
      .query({ token: admin_token })

    expect(result.body.message).to.equal('获取成功')
  })

  it('单个消息新闻', async () => {
    const result = await request.get('/admin/news/one')
      .query({ id: newsid, token : admin_token })

    expect(result.body.message).to.equal('获取成功')   
  })

  it('更新单个消息', async () => {
    const result = await request.post('/admin/news/update')
      .query({ id: newsid, token: admin_token })
    .send({
      title: 'title2'
    })

    expect(result.body.message).to.equal('更新成功')
  })

  it('获取发布消息', async () => {
    const result = await request.get('/app/news')
      .query({ token: app_token })
    expect(result.body.message).to.equal('ok')
  })

  it('删除单个消息', async () => {
    const result = await request.post('/admin/news/delete')
      .query({ id: newsid , token: admin_token})

    expect(result.body.message).to.equal('删除成功')
  })

  it('创建故障诊断', async() => {
    const result = await request.post('/admin/bugs')
      .query({ token: admin_token })
      .send({
        title: 'title',
        category: 'category',
        content: 'content'
      })
    bugsid = result.body.data._id
    expect(result.body.message).to.equal('ok')
  })

  it('获取故障诊断', async () => {
    const result = await request.get('/admin/bugs')
      .query({ token: admin_token })

    expect(result.body.message).to.equal('ok')
  })

  it('删除用户', async () => {
    const id = parse_id(app_token)
    const result = await request.delete(`/admin/users/${id}`)
      .query({ token: app_token })

    expect(result.body.message).to.equal('ok')
  })

})

function parse_id(token) {
  const jwt = require('jsonwebtoken')
  const { cert } = require('../config')
  return jwt.verify(token, cert).id
}

// describe('drm admin user test', () => {

//   it('新增用户', (done) => {
//     request.post('/admin/users/new')
//     .query({
//       token: adminToken
//     })
//     .send({
//       name: 'testUser',
//       password: 'test',
//       email: 'test@gmail.com',
//       phone: '13545892345',
//       company_name: 'test_company',
//       address: 'test_address'
//     })
//     .end((err, res) => {
//       expect(res.body.message).to.equal('ok')
//       done()
//     })
//   })

//   it('获取所有用户', (done) => {
//     request.get('/admin/users')
//     .query({
//       token: adminToken
//     })
//     .end((err, res) => {
//       expect(res.body.code).to.equal(200)
//       done()
//     })
//   })
  
// })


