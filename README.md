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
GET https://api.wardenger.me/admin/users?token=${token}
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



















