# drm_api
DRM'S API


## host

```
admin = https://api.wardenger.me/admin
```

```
app = https://api.wardenger.me/app
```

## 目录

* [App](#App)
  * [登录](#登录)
  * [获取用户信息](#获取用户信息)
  * [更新用户信息](#更新用户信息)
  * [修改用户密码](#修改用户密码)
  * [获取消息列表](#获取所有消息)
  * [GET单个消息](#GET单个消息)
  * [获取bugs](#获取bugs)
  * [获取bug](#获取bug)
  * [获取热门搜索词](#获取热门搜索词)
  * [创建工单](#创建工单)
  * [获取devices](#获取devices)
  * [获取device](#获取device)
  * [更新备注](#更新备注)
  * [增加时间线](#增加时间线)
  * [增加设备图片](#增加设备图片)



* [admin](#admin)
  * [登录](#登录)
  * [新增用户](#新增用户)
  * [获取所有用户](#获取所有用户)
  * [获取单个用户](#获取单个用户)
  * [更新单个用户](#更新单个用户)
  * [删除单个用户](#删除单个用户)
  * [上传消息推送图片](#上传消息推送图片)
  * [创建消息](#创建消息)
  * [获取所有消息](#获取所有消息)
  * [获取单个信息](#获取单个信息)
  * [删除单个消息](#删除单个消息)
  * [更新单个消息](#更新单个消息)
  * [创建故障诊断](#创建故障诊断)
  * [修改故障诊断](#修改故障诊断)
  * [获取所有故障诊断](#获取所有故障诊断)
  * [获取单个故障诊断](#获取单个故障诊断)
  * [删除故障诊断](#删除故障诊断)
    * [故障分类-新增](#故障分类-新增)
    * [故障分类-删除](#故障分类-删除)
    * [故障分类-置顶](#故障分类-置顶)
    * [故障分类-获取所有](#故障分类-获取所有)

  * [获取所有工单](#获取所有工单)
  * [获取单个工单](#获取单个工单)
  * [处理工单](#处理工单)
  * [创建设备](#创建设备)
  * [获取设备](#获取设备)
  * [获取单个设备](#获取单个设备)
  * [更新单个设备](#更新单个设备)
  * [新增权限](#新增权限)
  * [获取权限](#获取权限)
  * [更新权限](#更新权限)



# App

### 登录

```
POST https://api.wardenger.me/app/session
```
```
{
  email: '',
  password: ''
}
```

### 获取用户信息
```
GET https://api.wardenger.me/app/user?token=${token}
```

### 更新用户信息
```
POST https://api.wardenger.me/app/user/update?token=${token}
```

```
{
  name: '',
  email: '',
  phone: '',
  company_name: '',
  address: ''
}
```

### 修改用户密码
```
POST https://api.wardenger.me/app/user/update/password?token=${token}
```
```
{
  password: '',
  newPass: '',
  confirmPass: ''
}
```

### 获取消息列表
```
GET https://api.wardenger.me/app/news?token=${token} 
```

### GET单个消息
```
GET https://api.wardenger.me/app/news/one?id=${id}&token=${token} 
```

### 获取bugs
```
GET https://api.wardenger.me/app/bugs?token=${token}  
```
```
{
  type: '',   // onchange, submit, null, null 代表返回全部
  search: '' //search 为搜索内容
}
```

### 获取bug
```
GET https://api.wardenger.me/app/bugs/one?id=${id}&token=${token}  
```

### 获取热门搜索词
```
GET https://api.wardenger.me/app/bugs/hots?token=${token}  
```

### 创建工单
```
POST https://api.wardenger.me/app/order/new?token=${token}
```

```
{
  title: '',
  category: '',
  content: ''
}
```

### 获取devices

```
GET https://api.wardenger.me/app/devices?token=${token}  
```
```
0. 分类:
  type: enum: ['cc', 'pressure', 'combustible']
  value: ''
  示例: type=pressure&value=25Mpa
1. 排序:
  createTime: ['asc', 'desc'] //升序，降序
2. 筛选:
  cc=''&pressure=''&combustible=''
```

### 获取device
```
GET https://api.wardenger.me/app/devices/one?deviceId=${deviceId}&start=${start}&end=${end}&token=${token}  
```

### 更新备注
```
POST https://api.wardenger.me/app/devices/one/remark?token=${token} 
```
```
{
  deviceId: '',
  remark: ''
}
```

### 增加时间线
```
POST https://api.wardenger.me/app/devices/one/timelines?token=${token} 
```
```
{
  deviceId: '',
  type: '',
  time: '',
  description: ''
}
```

### 增加设备图片
```
POST https://api.wardenger.me/app/devices/one/images?deviceId=${deviceId}&token=${token} 
```
```
{
  key: devices
}
```



# admin

### 登录

```json
POST https://api.wardenger.me/admin/session
```

```js
{
  admin: '',
  password: ''
}
```

### 新增用户

```
POST https://api.wardenger.me/admin/users/new?token=${token}
```

```
{
  name: '',
  password: '',
  email: '',
  phone: '',
  company_name: '',
  address: ''
}
```

### 获取所有用户
```
GET https://api.wardenger.me/admin/users?type=name&token=${token}
```

### 获取单个用户
```
GET https://api.wardenger.me/admin/users/:id?token=${token}
```

### 更新单个用户
```
PUT https://api.wardenger.me/admin/users/:id?token=${token}
```

### 删除单个用户
```
DELETE https://api.wardenger.me/admin/users/:id?token=${token}
```

### 上传消息推送图片

```
POST https://api.wardenger.me/admin/news/uploadimg?token=${token} 
```

```
{
  key: 'news'
}
```

### 创建消息

```
POST https://api.wardenger.me/admin/news/new?token=${token}
```

```
{
  title: '',
  abstract: '',
  content: '',
  published: Boolean, //代表已发送还是未发送
  images: [] //通过上一条API得到
}
```

### 获取所有消息

```
GET https://api.wardenger.me/admin/news/all?token=${token} 
```

### 删除单个消息

```
POST https://api.wardenger.me/admin/news/delete?id=${id}&token=${token} 
```

### 更新单个消息

```
POST https://api.wardenger.me/admin/news/update?id=${id}&token=${token}  
```

```
{
  title: '',
  abstract: '',
  content: '',
  published: Boolean,
  images: [] 
}
```

### 获取单个信息

```
GET https://api.wardenger.me/admin/news/one?id=${id}&token=${token}
```

### 创建故障诊断

```
POST https://api.wardenger.me/admin/bugs?token=${token}
```
```
{
  title: '',
  category: 'categoryId',
  content: ''
}
```

### 修改故障诊断

```
PUT https://api.wardenger.me/admin/bugs/:bugId?token=${token}
```
### 获取所有故障诊断

```
GET https://api.wardenger.me/admin/bugs?token=${token}
```

### 获取单个故障诊断
```
GET https://api.wardenger.me/admin/bugs/:bugId?token=${token}
```

### 删除故障诊断
```
DELETE https://api.wardenger.me/admin/bugs/:bugId?token=${token}
```

### 故障分类-新增
```
POST https://api.wardenger.me/admin/bugs/categorys/new?token=${token}
```
```
{
  text: ''
}
```

### 故障分类-删除
```
DELETE https://api.wardenger.me/admin/bugs/categorys/:categoryId?token=${token}
```

### 故障分类-置顶
```
POST https://api.wardenger.me/admin/bugs/categorys/top?token=${token}
```
```
{
  categoryId: ''
}
```

### 故障分类-获取所有
```
GET https://api.wardenger.me/admin/bugs/categorys?token=${token}
```





### 获取所有工单
```
GET https://api.wardenger.me/admin/orders?token=${token}
```

### 获取单个工单
```
GET https://api.wardenger.me/admin/orders/:orderId?token=${token}
```
### 处理工单
```
PUT https://api.wardenger.me/admin/orders/:orderId?token=${token} 
```

```
{
  advice: '' //处理意见
}
```

### 创建设备
```
POST https://api.wardenger.me/admin/devices/new?token=${token}
```
```
  name: ''   // 设备名称
  number: '' // 设备编号
  images: [] // 设备图片
  cc: [单发生器，双发生器，三发生器，四发生器] //排量
  pressure: [25Mpa, 30Mpa, 35Mpa, 50Mpa] //压力
  combustible: [柴油，天然气，原油型]   //燃料
  description: '' //描述
  address：'' //所在地
  timelines: [{
    time: '',
    type: '',
    description: ''
  }]
```


### 上传设备图片

```
POST https://api.wardenger.me/admin/devices/uploadimg?token=${token}
```

```
{
  key: device
}
```

### 获取设备
```
GET https://api.wardenger.me/admin/devices?type=name&token=${token}
```

### 获取单个设备
```
GET https://api.wardenger.me/admin/devices/deviceId?token=${token}
```

### 更新单个设备
```
PUT https://api.wardenger.me/admin/devices/deviceId?token=${token}
```

### 更改设备时间
```
PUT https://api.wardenger.me/admin/devices/deviceId/location?token=${token}
```
```
{
  address:
}
```

### 新增权限

```
POST https://api.wardenger.me/admin/auths/new?token=${token}
```
```
{
  userId: '',
  deviceId: '',
  canView: Boolean,
  canMonitor: Boolean
}
```

### 获取权限
```
GET https://api.wardenger.me/admin/auths?token=${token}
```

### 获取单个权限
```
GET https://api.wardenger.me/admin/auths/one?authId=${authId}token=${token}
```

### 更新权限
```
POST https://api.wardenger.me/admin/auth/change?authId=${authId}&token=${token}
```

```
{
  user: '',
  device: '',
  canView: Boolean,
  canMonitor: Boolean 
}
```
















