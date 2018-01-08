# daycaca

[![Build Status](https://travis-ci.org/JackPu/core-canvas-image-helper.svg?branch=master)](https://travis-ci.org/JackPu/core-canvas-image-helper)

[![npm](https://img.shields.io/npm/v/core-canvas-image-helper.svg?maxAge=2592000)]()

A pure JavaScript library to handle image via canvas.


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
<script src=./dist/index.js"></sciprt>

<script>
  // src specify an image src (url or base64)
  daycaca.rotate(src, degress, (data, w, h) => {
    // your code here
  });
</script>
```



## API

+ compress

+ crop

+ rotate

+ reszie
