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

* [admin](#admin)
  * [登录](#登录)
  * [新增用户](#新增用户)
  * [获取所有用户](#获取所有用户)
  * [获取单个用户](#获取单个用户)
  * [更新单个用户](#更新单个用户)
  * [删除单个用户](#删除单个用户)



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
  password: '',
  email: '',
  phone: '',
  company_name: '',
  address: ''
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




















