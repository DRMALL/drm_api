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

* [admin](#admin)
  * [登录](#登录)
  * [新增用户](#新增用户)
  * [获取所有用户](#获取所有用户)
  * [获取单个用户](#获取单个用户)
  * [更新单个用户](#更新单个用户)
  * [删除单个用户](#删除单个用户)



* [app](#app)


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




















