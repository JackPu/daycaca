# daycaca

[![CircleCI](https://circleci.com/gh/JackPu/daycaca/tree/dev.svg?style=svg)](https://circleci.com/gh/JackPu/daycaca/tree/dev)
[![npm](https://img.shields.io/npm/v/daycaca.svg?maxAge=2592000)]()


<img src="http://img1.vued.vanthink.cn/vuede494856de5f2390a5727a6d98d488305.png" width="400">


キャンバスを介して Canvas ソースを処理するための純粋な JavaScript ライブラリ。


[中文文档](./README.zh.md) | [English](./README.md) | [日本語](./README.jp.md)

[examples](http://events.jackpu.com/daycaca/)


## 使い方

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
<script src="./dist/daycaca.js"></script>

<script>
  // src specify an image src (url or base64)
  daycaca.rotate(src, degress, (data, w, h) => {
    // your code here
  });
</script>
```



## API

API `source` 々は以下の1つのタイプでなければなりません:

+ an image url  (Pay attention to [CORS](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image) settings)
+ an IMG elment
+ [a file object](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications) Which use `input[type="file"]` value as source

### base64(source, callback)

あなたのイメージを変換する `base64`.

``` js
const img = document.querySelector('img')
daycaca.base64(img, (data) => {
  //... handle base64
})
```

### compress(source, quailty, callback)

あなたのイメージを圧縮する.

+ PNG 表示可逆圧縮; `quality` うまくいかない。

+ JPG/JPEG/BMP 表示損失圧縮;

`quality` (1~100). 100 表示同じままにする


``` js
const img = document.querySelector('img')
daycaca.compress(img, 0.5,(data) => {
  //... handle base64
})
```

### crop(source, option, callback)

画像をトリミングする。

option {} :

+ x;
+ y;
+ w;
+ h;
+ ratio: スケール比;

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

あなたのイメージを回転させる。

``` js
const img = document.querySelector('img')
daycaca.rotate(img, 90,(data) => {
  //... handle base64
})
```

### reszie(source, ratio, callback)

画像を拡大縮小する;

+ ratio (0~1): 画像のスケール比; 1 表示同じままにする

``` js
const img = document.querySelector('img')
daycaca.reszie(img, 0.5,(data) => {
  //... handle base64
})
```

## 貢献

あなたの貢献と提案は大歓迎です 😄😄🌺🌺🎆🎆

## MIT License




