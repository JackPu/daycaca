# daycaca

[![CircleCI](https://circleci.com/gh/JackPu/daycaca.svg?style=shield)](https://circleci.com/gh/JackPu/daycaca)
[![npm](https://img.shields.io/npm/v/daycaca.svg?maxAge=2592000)]()


<img src="http://img1.vued.vanthink.cn/vuede494856de5f2390a5727a6d98d488305.png" width="400">


キャンバスを介して Canvas ソースを処理するための純粋な JavaScript ライブラリ。


[中文文档](./README.zh.md) | [English](./README.md) | [日本語](./README.jp.md)

[examples](http://events.jackpu.com/daycaca/)


## 使い方

### Npm

``` bash
$  npm install daycaca --save
```

``` js
// es6import daycaca from 'daycaca';// src specify an image src (url or base64)
daycaca.rotate(src, degress, (data, w, h) => {
  // your code here
});
```

### CDN （ブラウザーで直接使う）

``` html
<script src="./dist/daycaca.js"></script>
<script>
  // src specify an image src (url or base64)
  daycaca.rotate(src, degress, (data, w, h) => {
    // your code here
  });</script>
```

## API

すべてのAPI source は以下の1つのタイプでなければなりません:
+ 画像url (URLを使う場合、クロスドメインの設置にお気を付けください。)
+ 画像のDOM節点
+ [type="file"]を使用する画像ファイルの対象值

### base64(source, callback)

画像をbase64 code値に転換する。参考数elは画像のDOM節点やDOMのURLである。

``` js
const img = document.querySelector('img')
daycaca.base64(img, (data) => {
  //... handle base64
})
```

### compress(source, quailty, callback)

画像を圧縮する場合、画質を圧縮し、画像のサイズを小さくする。

+ PNGは無損失圧縮されるので、quality無効。
+ JPG/JPEG/BMP は損失圧縮される。

`quality` は圧縮後の画質を表す。Qualityの数値が大きいほど、画質が高いのである。

``` js
const img = document.querySelector('img')daycaca.compress(img, 0.5,(data) => {
  //... handle base64
})
```

### crop(source, option, callback)

画像をカットする。

`option` {} では、指定する必要がある参考数値である:

+ `x`;はカットされたエリアが画像の左までの距離
+ `y`;はカットされたエリアが画像の上までの距離
+ `w`;はカットされたエリアの横幅
+ `h`;はカットされたエリアの高度
+ `ratio`: スケール比率;

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

画像を回転させる。

``` js
const img = document.querySelector('img')
daycaca.rotate(img, 90,(data) => {
  //... handle base64
})
```

### reszie(source, ratio, callback)

画像を拡大、縮小させる;

+ `ratio` (0~1)は画像のスケール比率である。1と設定する場合は、画像の大きさが変わらない。０以下の数値は設定できない。

``` js
const img = document.querySelector('img')
daycaca.reszie(img, 0.5,(data) => {
  //... handle base64
})
```

### コメント

ご意見やご質問大歓迎です！





