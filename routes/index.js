
import Router from 'koa-router'
import { Admin, App } from '../controllers'
import home from './home'
import verifyToken from '../utils/verifyToken'

const router = new Router()


router.get('/', home)
router.post('/admin/session', Admin.session)
router.post('/app/session', App.session)


router.use('*', verifyToken)


//users
router.get('/admin/users', Admin.getUsers)
router.post('/admin/users/new', Admin.newUser)
router.param('userId', function (id, ctx, next) {
  ctx.userId = id
  if (!ctx.userId) return ctx.status = 404;
  return next();
})
.get('/admin/users/:userId', Admin.getUserById)
.put('/admin/users/:userId', Admin.UpdateUser)
.delete('/admin/users/:userId', Admin.DeleteUser)


//news
router.post('/admin/news/uploadimg', Admin.uploadImgWithNews)
router.post('/admin/news/new', Admin.createNew)
router.get('/admin/news/all', Admin.getNews)
router.get('/admin/news/one', Admin.getNewsById)
router.post('/admin/news/delete', Admin.deleteNew)
router.post('/admin/news/update', Admin.updateNew)


//bugs-category
router.post('/admin/bugs/categorys/new', Admin.createBugCate)
router.get('/admin/bugs/categorys', Admin.getBugCates)
router.post('/admin/bugs/categorys/top', Admin.topBugCates)
router.param('categoryId', function(id, ctx, next) {
  ctx.categoryId = id;
  if(!ctx.categoryId) return ctx.status = 404;
  return next()
})
.delete('/admin/bugs/categorys/:categoryId', Admin.deleteBugCate)



//bugs
router.get('/admin/bugs', Admin.getBugs)
router.post('/admin/bugs', Admin.createBug)
router.param('bugId', function(id, ctx, next) {
  ctx.bugId = id
  if(!ctx.bugId) return ctx.status = 404;
  return next()
})
.get('/admin/bugs/:bugId', Admin.getBug)
.put('/admin/bugs/:bugId', Admin.updateBug)
.delete('/admin/bugs/:bugId', Admin.deleteBug)

//orders

router.get('/admin/orders', Admin.getOrders)
router.param('orderId', function(id, ctx, next) {
  ctx.orderId = id
  if(!ctx.orderId) return ctx.status = 404
  return next()
})
.get('/admin/orders/:orderId', Admin.getOrder)
.put('/admin/orders/:orderId', Admin.handleOrder)


//device
router.post('/admin/devices/uploadimg', Admin.uploadImgWithDevice)
router.post('/admin/devices/new', Admin.createDevice)







router.get('/app', App.Index)
router.get('/app/user', App.getUserInfo)
router.post('/app/user/update', App.UpdateUser)
router.post('/app/user/update/password', App.UpdateUserPassword)

//news
router.get('/app/news', App.getNews)
router.get('/app/news/one', App.getNewsById)


//bugs
router.get('/app/bugs', App.getBugs)
router.get('/app/bugs/one', App.getBug)
router.get('/app/bugs/hots', App.getHots)



//orders
router.post('/app/order/new', App.createOrder)
router.get('/app/order/all', App.getOrders)




module.exports = router





