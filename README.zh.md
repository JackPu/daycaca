# daycaca

[![CircleCI](https://circleci.com/gh/JackPu/daycaca.svg?style=shield)](https://circleci.com/gh/JackPu/daycaca)
[![npm](https://img.shields.io/npm/v/daycaca.svg?maxAge=2592000)](https://www.npmjs.com/package/daycaca)


<img src="http://img1.vued.vanthink.cn/vuede494856de5f2390a5727a6d98d488305.png" width="400">

一款基于 canvas 图片处理类库，它可以帮助你处理图片的压缩，裁剪等；

[中文文档](./README.zh.md) | [English](./README.md) | [日本語](./README.jp.md)

[examples](http://events.jackpu.com/daycaca/)


##  快速开始

### npm

``` bash
$  npm install daycaca -save
```


``` es6
// es6
import daycaca from 'daycaca';
// src specify an image src (url or base64)
daycaca.rotate(src, degress, (data, w, h) => {
  // your code here
});

```

### 直接在浏览器使用

``` js
<script src="./dist/daycaca.min.js"></script>

<script>
  // src specify an image src (url or base64)
  daycaca.rotate(src, degress, (data, w, h) => {
    // your code here
  });
</script>
```



## API

所有 api 中的 `source` 它可以是;

+ 图片 url 地址 (如果使用 url 注意对于 [跨域](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image) 的设置)
+ 图片的 DOM 节点 
+ 一个图片的 [文件对象](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications) 使用 `input[type="file"]` 读取的对象值

### base64(source, callback)

将图片转换成 base64 code 值；参数 `el` 可以为一个图片的 Dom 节点也可以是一个图片地址；

``` js
const img = document.querySelector('img')
daycaca.base64(img, (data) => {
  //... handle base64
})
```

### compress(source, quailty, callback)

压缩图片，会将图片进行质量上的压缩, 从而降低图片的大小。

+ PNG 走的无损压缩，类库参考 .因此 `quailty` 无效

+ JPG/JPEG/BMP 等位图走的有损压缩

`quality` 表示图片压缩的质量，值越大，图片会清晰


``` js
const img = document.querySelector('img')
daycaca.compress(img, 0.5,(data) => {
  //... handle base64
})
```

### crop(source, option, callback)

裁剪图片，将图片裁剪至指定大小。

option {} 里面需要指定的参数:

+ x: 裁剪的区域距离图片的左边缘的距离
+ y: 裁剪的区域距离图片的上边缘的距离
+ w: 裁剪的区域的宽度
+ h: 裁剪的区域的高度
+ ratio 缩放比例

<img width="480" src="http://img1.vued.vanthink.cn/vued233e94bd60775c0999df05d17b4642a8.png" />


``` js
const img = document.querySelector('img')
daycaca.reszie(img, {
  x: 10,
  y: 20,
  w: 100,
  h: 70
},(data) => {
  //... handle base64
})
```


### rotate(source, degree, callback)

旋转图片至某个角度。

``` js
const img = document.querySelector('img')
daycaca.rotate(img, 90,(data) => {
  //... handle base64
})
```


### reszie(source, ratio, callback)

图片缩放，将图片进行放大缩小

+ ratio 表示图片缩放的比例，其中 1 表示图片不进行缩放，最小值必须 **大于0**

``` js
const img = document.querySelector('img')
daycaca.reszie(img, 0.5,(data) => {
  //... handle base64
})
```

## 贡献

欢迎您提出自己的代码 PR 以及任何建议 😄😄🌺🌺🎆🎆


## MIT License



