
# 数据库模型文档

该DRM项目主要分为以下几个数据模型

```
 - Auth(权限)
 - Bug(故障诊断)
 - Category(故障分类)
 - CCSort(设备排量分类)
 - Counter(计数器)
 - Device(设备)
 - DevMoniter(监控设备)
 - FuelSort(设备燃料分类)
 - Hot(热门搜索词)
 - News(消息)
 - Notice(通知)
 - Order(工单)
 - Part(配件)
 - PreSort(设备压力分类)
 - TimeLine(设备时间线分类)
 - User(用户)
```

## Auth

权限模型，用来记录用户和设备之间的权限关系，权限包括可查看(`canView`)和可监控(`canMonitor`)，`canView` 和 `canMonitor` 均为`Boolean`类型，`true`代表有权限，`false`代表无权限

```
{
  user: {  //用户模型
    type: Schema.Types.ObjectId,
    ref : 'User'
  },
  device: { //设备模型
    type: Schema.Types.ObjectId,
    ref : 'Device'
  },
  canView: { //查看权限
    type: Boolean,
    default: false
  },
  canMonitor: {  //监控权限
    type: Boolean,
    default: false
  },
}
```

## Bug

故障诊断模型，包括四个字段`title`(标题),`category`(分类),`content`(内容)，`isSolved（是否已解决）`。由于涉及到对 `故障诊断分类` 的增删改查，因此将其分类单独抽出为一个数据模型。

```
title: { 
  type: String,
  required: true
},
category: { 
  type: Schema.Types.ObjectId,
  ref: 'Category'
},
content: {
  type: String,
  required: true
}，
isSolved: {
  type: Boolean,
  default: true
}
```

## Category

分类，用于故障诊断的分类。`text`表示分类的内容，`sortIndex`表示其先后顺序。
```
{
  text: { type: String, required: true },
  sortIndex: { type:Number, default: 0 },
}
```

## CCSort

设备排量分类

```
{
  text: String,
}
```


## Counter

计数器，用于故障诊断分类的排序。
```
{
  _id: { type: 'String', required: true },
  seq: { type: Number,  default: 0 }
}
```


## Device

```
{
  name: String,  //名称
  number: String,  //编号
  images: [],  //图片
  cc: String,   //排量
  pressure: String,   //压力
  combustible: String,  //燃料
  description: String,  //简介
  online: Boolean,  //是否在线
  address: String,  //位置
  location: [{    //设备所在地，用于按设备所在地筛选
    time: { type: Date, default: Date.now },
    text: String
  }],
  timelines: [{        //时间线
    line_type: String, //类型，例如：
    line_des: String,  //描述
    line_time: Date    //时间
  }],
  incharges: [],       //负责人
  remark: String,      //备注
}
```

## DevMoniter

设备的监控信息，number代表 设备编号，data代表 监控的数据。

```
{
  number: String,
  data: []
}
```

## FuelSort

设备燃料分类

```
{
  text: String
}
```

## Hot

热门搜索词模型，

type 默认值为bug，代表故障诊断的热门搜索词，type还可以为：`part`,`device`，分别代表配件和设备的热门搜索词。
text 代表搜索词的内容，weights代表搜索词的权重。

```
{
  type: String,
  text: String,
  weights: { type: Number, default: 0 },
}
```

## News

消息模型

```
{
  title: {     //标题
    type: String,
    required: true
  },
  abstract: {  //摘要
    type: String,
    required: true,
    maxlength: 64
  },
  content: {   //内容
    type: String,
    required: true
  },
  images: [{  //图片
    url: String,
  }],
  author: String,  //作者
  publish_time: {  //发布时间
    type: Date, default: null
  },
  published: {     //是否已发布
    type: Boolean,
    default: false,
    required: true
  },
}
```

## Notice

消息通知，包括工单通知和设备检测通知，目前仅实现工单信息部分。

```
{
  types: String,      //工单信息或设备检测
  des: String,        //描述
  status: String,     //状态
  readed: Boolean,    //已读/未读
  user: {
    id: String,
    name: String,
    email: String,
  },
  order: {          //工单信息
    id: String,
    content: String,
    feedback: String,
    time: String,
  }
}
```

## Order

工单模型。由App端用户发起工单。
```
{
  title: { type: String },     //标题
  category: { type: String },  //分类
  content: { type: String },   //内容
  images: [],
  user: {  //工单发起人
    id: String,
    name: String,
    email: String,
  },
  advice: { type: String },  //处理意见
  isHanlded: { type: Boolean, default: false }, //已处理
  isDone: { type: Boolean, default: false }, //已解决
}
```

## Part

配件模型
```
{
  code: String,       //配件代号
  name: String,       //配件名称
  model: String,      //型号规格
  unit: String,       //单位
  images: [],
  reserve: String,    //库存
  types: String,      //类型
  deviceCode: String, //设备编号,使用设备
  deviceName: String,
  remark: String,     //备注
}
```

## PreSort

压力分类

```
{
  text: String
}
```

## TimeLine

设备时间线模型

```
{
  text: String,
}
```

## User

用户模型，已检测`phone`和`email`的格式有效性，且将`email`作为主键，即一个`email`只能对应一个用户。

用户密码已通过`hash`加密保存。

```
{
  name: { //用户名
    type: String,
    required: true
  },
  password: {  //密码
    type: String,
    required: true
  },
  email: {    //email
    type: String,
    required: true,
    unique: true,
  },
  phone: Number,         //手机号码
  company_name: String,  //公司名称
  address: String,       //地址
}
```




