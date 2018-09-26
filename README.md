# daycaca

[![CircleCI](https://circleci.com/gh/JackPu/daycaca.svg?style=shield)](https://circleci.com/gh/JackPu/daycaca)
[![npm](https://img.shields.io/npm/v/daycaca.svg?maxAge=2592000)]()


<img src="http://img1.vued.vanthink.cn/vuede494856de5f2390a5727a6d98d488305.png" width="400">

A pure JavaScript library to handle image source via canvas.

[中文文档](./README.zh.md) | [English](./README.md) | [日本語](./README.jp.md)

[examples](http://events.jackpu.com/daycaca/)


## How to use

### Npm

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
<script src="./dist/daycaca.min.js"></script>

<script>
  // src specify an image src (url or base64)
  daycaca.rotate(src, degress, (data, w, h) => {
    // your code here
  });
</script>
```



## API

All API methods's argument `source` should be one type below:

+ an image url  (Pay attention to [CORS](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image) settings)
+ an IMG element
+ [a file object](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications) Which use `input[type="file"]` value as source

### base64(source, callback)

Convert your image to base64.

``` js
const img = document.querySelector('img')
daycaca.base64(img, (data) => {
  //... handle base64
})
```

### compress(source, quailty, callback)

Compress your image and minify the size of your image.

+ PNG need lossless compression; So the param `quality` may not work.

+ JPG/JPEG/BMP need lossy compression;

`quality` (1~100). 100 means that the image keeps the same quality.


``` js
const img = document.querySelector('img')
daycaca.compress(img, 0.5,(data) => {
  //... handle base64
})
```

### crop(source, option, callback)

Crop your image to the size which you specify.

option {} :

+ x: The x-axis distance between the crop area and the image;
+ y: The y-axis distance between the crop area and the image;
+ w: The width of crop area;
+ h: The height of crop area
+ ratio: the scale ration of the image
+ fixedWidth: get the image with fixed width
+ fixedHieght: get the image with fixed height

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

Rotate your image to any degree.

``` js
const img = document.querySelector('img')
daycaca.rotate(img, 90,(data) => {
  //... handle base64
})
```


### reszie(source, ratio, callback)

Scale the image;
+ ratio (0~1): the scale ratio of the image. 1 means the image keep the same size;

``` js
const img = document.querySelector('img')
daycaca.reszie(img, 0.5,(data) => {
  //... handle base64
})
```

## Contributions

Your contributions and suggestions are welcome 😄😄🌺🌺🎆🎆

## Contributors

+ @Annie Tanslations of Japanese documents;

## MIT License




