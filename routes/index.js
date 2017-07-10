
import Router from 'koa-router'
import { Admin, App } from '../controllers'
import home from './home'
import verifyToken from '../utils/verifyToken'

const router = new Router()


router.get('/', home)
router.post('/admin/session', Admin.session)
router.post('/app/session', App.session)
router.post('/app/upload', App.Upload)


router.use('*', verifyToken)


//users
router.get('/admin/users', Admin.getUsers)
router.param('userId', function (id, ctx, next) {
  ctx.userId = id
  if (!ctx.userId) return ctx.status = 404;
  return next();
})
.get('/admin/users/:userId', Admin.getUserById)
.put('/admin/users/:userId', Admin.UpdateUser)
.delete('/admin/users/:userId', Admin.DeleteUser)
router.post('/admin/users/new', Admin.newUser)


//news
router.post('/admin/news/uploadimg', Admin.uploadImg)
router.post('/admin/news/new', Admin.createNew)
router.get('/admin/news/all', Admin.getNews)
router.get('/admin/news/one', Admin.getNewsById)
router.post('/admin/news/delete', Admin.deleteNew)
router.post('/admin/news/update', Admin.updateNew)





router.get('/app', App.Index)
router.get('/app/user', App.getUserInfo)
router.post('/app/user/update', App.UpdateUser)
router.get('/app/news', App.getNews)
router.get('/app/news/one', App.getNewsById)




module.exports = router





