'use strict'

const app = require('../server.js')
const chai = require('chai')
const supertest = require('supertest')
const expect = chai.expect

// const adminToken = require('../config').adminToken
// const appToken = require('../config').appToken
// var admin_token, app_token;

const request = supertest( app.listen() )

var admin_token, app_token, newsid, cateid, bugsid, ccid, deviceid, authid, fuelid, orderid;

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

  it('创建故障分类', async() => {
    const result = await request.post('/admin/bugs/categorys/new')
      .query({ token: admin_token })
      .send({
        text: 'shit'
      })

    cateid = result.body.data._id
    expect(result.body.message).to.equal('创建成功')
  })

  it('置顶故障分类', async() => {
    const result = await request.post('/admin/bugs/categorys/top')
      .query({ token: admin_token })
      .send({
        categoryId: cateid
      })
    expect(result.body.message).to.equal('ok')
  })

  it('获取故障分类', async() => {
    const result = await request.get('/admin/bugs/categorys')
      .query({ token: admin_token })

    expect(result.body.message).to.equal('获取成功')    
  })

  it('创建故障诊断', async () => {
    const result = await request.post('/admin/bugs')
      .query({ token: admin_token })
      .send({
        title: 'title',
        category: cateid,
        content: 'content'
      })
    bugsid = result.body.data._id
    expect(result.body.message).to.equal('ok')
  })

  it('删除故障分类', async() => {
    const id = cateid
    const result = await request.delete(`/admin/bugs/categorys/${id}`)
      .query({ token: admin_token })
    expect(result.body.message).to.equal('删除成功')
  })

  it('获取故障诊断', async () => {
    const result = await request.get('/admin/bugs')
      .query({ token: admin_token })

    expect(result.body.message).to.equal('获取成功')
  })

  it('单个故障诊断', async() => {
    const id = bugsid
    const result = await request.get(`/admin/bugs/${id}`)
      .query({ token: admin_token })

    expect(result.body.message).to.equal('获取成功')
  })

  it('更新单个故障诊断', async () => {
    const id = bugsid
    const result = await request.put(`/admin/bugs/${id}`)
      .query({ token: admin_token })
      .send({
        title: 'title2',
        content: 'content2'       
      })

    expect(result.body.message).to.equal('更新成功')
  })

  it('删除故障诊断', async () => {
    const id = bugsid
    const result = await request.delete(`/admin/bugs/${id}`)
      .query({ token: admin_token })

    expect(result.body.message).to.equal('删除成功')    
  })

  it('创建排量分类', async () => {
    const result = await request.post('/admin/ccsorts')
      .query({ token: admin_token })
      .send({
        text: 'hello'
      })

    ccid = result.body.data._id

    expect(result.body.message).to.equal('ok')
  })

  it('获取排量分类', async () => {
    const result = await request.get('/admin/ccsorts')
      .query({ token: admin_token })

    expect(result.body.message).to.equal('ok')
  })

  it('单个排量分类', async () => {
    const result = await request.get(`/admin/ccsorts/${ccid}`)
          .query({ token: admin_token })

    expect(result.body.message).to.equal('ok')
  })

  it('更新排量分类', async () => {
    const result = await request.put(`/admin/ccsorts/${ccid}`)
        .query({ token: admin_token })

    expect(result.body.message).to.equal('ok')    
  })

  it('删除排量分类', async () => {
    const result = await request.delete(`/admin/ccsorts/${ccid}`)
        .query({ token: admin_token })

    expect(result.body.message).to.equal('ok')          
  })

  it('创建设备', async () => {
    const result = await request.post(`/admin/devices/new`)
        .query({ token: admin_token })
        .send({
          name: 'device101010',
          number: 'SN9393',
          images: [],
          cc: '单发生器',
          pressure: '25Mpa',
          combustible: '柴油',
          description: '简介信息在这里',
          address: 'hello',
          classify: 'ddd'
        })
    deviceid = result.body.data._id
    expect(result.body.message).to.equal('ok')
  })

  it('获取设备', async () => {
    const result = await request.get(`/admin/devices`)
      .query({ token: admin_token })

    expect(result.body.message).to.equal('ok')    
  })

  it('获取设备名称', async () => {
    const result = await request.get(`/admin/devices`)
      .query({ type: 'name', token: admin_token })

    expect(result.body.message).to.equal('ok')        
  })

  it('单个设备', async () => {
    const result = await request.get(`/admin/devices/${deviceid}`)
      .query({ token: admin_token })

    expect(result.body.message).to.equal('ok')    
  })

  it('更新设备', async () => {
    const result = await request.put(`/admin/devices/${deviceid}`)
      .query({ token: admin_token })
      .send({
        name: 'fixedname'
      })
    expect(result.body.message).to.equal('ok')
  })

  it('更新设备所在地', async () => {
    const result = await request.put(`/admin/devices/${deviceid}/location`)
      .query({ token: admin_token })
      .send({
        text: '河南'
      })
    expect(result.body.message).to.equal('ok')   
  })

  it('创建权限', async () => {
    const userid = parse_id(app_token)
    const result = await request.post('/admin/auths/new')
      .query({ token: admin_token })
      .send({
        userId: userid,
        deviceId: deviceid,
        canView: true,
        canMonitor: true,
      })
    authid = result.body.data._id
    expect(result.body.message).to.equal('ok')
  })

  it('获取权限', async () => {
    const result = await request.get('/admin/auths')
      .query({ token: admin_token })

    expect(result.body.message).to.equal('ok')
  })

  it('单个权限', async () => {
    const result = await request.get('/admin/auths')
      .query({ authId: authid, token: admin_token })

    expect(result.body.message).to.equal('ok')    
  })

  it('更新权限', async () => {
    const result = await request.post('/admin/auth/change')
      .query({ authId: authid, token: admin_token })
      .send({
        canMoniter: false,        
      })

    expect(result.body.message).to.equal('ok')    
  })

  it('删除权限', async () => {
    const result = await request.post('/admin/auth/del')
      .query({ authId:  authid, token: admin_token })

   expect(result.body.message).to.equal('ok')   
  })

  it('删除设备', async () => {
    const result = await request.delete(`/admin/devices/${deviceid}`)
      .query({ token: admin_token })

    expect(result.body.message).to.equal('ok')             
  })

  it('创建燃料分类', async () => {
    const result = await request.post(`/admin/fuelsorts`)
      .query({ token: admin_token })
      .send({
        text: 'dddd'
      })
    fuelid = result.body.data._id

    expect(result.body.message).to.equal('ok')
  })

  it('获取燃料分类', async () => {
    const result = await request.get('/admin/fuelsorts')
      .query({ token: admin_token })

    expect(result.body.message).to.equal('ok')    
  })

  it('单个燃料分类', async () => {
    const result = await request.get(`/admin/fuelsorts/${fuelid}`)
      .query({ token: admin_token })

    expect(result.body.message).to.equal('ok')      
  })

  it('更新燃料分类', async () => {
    const result = await request.put(`/admin/fuelsorts/${fuelid}`)
      .query({ token: admin_token })
      .send({
        text: 'dddd'
      })

    expect(result.body.message).to.equal('ok')          
  })

  it('删除燃料分类', async () => {
    const result = await request.delete(`/admin/fuelsorts/${fuelid}`)
      .query({ token: admin_token })

    expect(result.body.message).to.equal('ok')    
  })

  it('设备热门搜索词', async () => {
    const result = await request.get('/app/devices/hots')
      .query({ token: app_token })

    expect(result.body.message).to.equal('ok')  
  })

  it('配件热门搜索词', async () => {
    const result = await request.get('/app/parts/hots')
      .query({ token: app_token })

    expect(result.body.message).to.equal('ok')      
  })

  it('故障热门搜索词', async () => {
    const result = await request.get('/app/bugs/hots')
      .query({ token: app_token })

    expect(result.body.message).to.equal('ok')      
  })

  it('获取通知', async () => {
    const result = await request.get('/app/notices')
      .query({ token: app_token })

    expect(result.body.message).to.equal('ok')    
  })

  it('设置所有通知已读', async () => {
    const result = await request.post('/app/notices/all/read')
      .query({ token: app_token })

    expect(result.body.message).to.equal('ok')        
  })

  it('创建工单', async () => {
    const result = await request.post('/app/order/new')
      .query({ token: app_token })
      .send({
        title: 'aaaaaa',
        category: 'ssssss',
        content: 'cdddd',
        images: [{
          url: 'a',
          url: 'b'
        }]
      })
    const orderid = result.body.data._id
    expect(result.body.message).to.equal('ok')    
  })

  it('获取工单', async() => {
    const result = await request.get('/admin/orders')
      .query({ token: admin_token })

    expect(result.body.message).to.equal('ok')       
  })

  it('单个工单', async() => {
    const result = await request.get(`/admin/orders/${orderid}`)
      .query({ token: admin_token })

    expect(result.body.message).to.equal('ok')      
  })

  it('处理工单', async () => {
    const result = await request.post(`/admin/orders/${orderid}`)
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

//console.log
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


