# daycaca

[![Build Status](https://travis-ci.org/JackPu/daycaca.svg?branch=master)](https://travis-ci.org/JackPu/daycaca)
[![npm](https://img.shields.io/npm/v/daycaca.svg?maxAge=2592000)]()


<img src="http://img1.vued.vanthink.cn/vuede494856de5f2390a5727a6d98d488305.png" width="400">

A pure JavaScript library to handle image via canvas.

[Chinese](./README.zh.md) | [English](./README.md) | [日本語](./README.jp.md)


## How to use

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

### CDN

``` js
<script src="./dist/index.js"></script>

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



### crop(source, option, callback)

裁剪图片，将图片裁剪至指定大小。

option {} 里面需要指定的参数

+ 



### reszie(source, ratio, callback)

图片缩放，将图片进行放大缩小

+ ratio 表示图片缩放的比例，其中 1 表示图片不进行缩放，最小值必须 **大于0**






