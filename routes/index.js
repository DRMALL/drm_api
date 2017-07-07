
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




router.get('/app', App.Index)
router.get('/app/user', App.getUserInfo)
router.post('/app/user/update', App.UpdateUser)


module.exports = router





