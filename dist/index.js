(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["daycaca"] = factory();
	else
		root["daycaca"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// a canvas lib to compress or crop images

var isNumber = function isNumber(num) {
  return typeof num === 'number';
};

module.exports = {

  /**
  * init image for reset size and rotation
  */
  init: function init(src, callback) {
    var _this = this;

    var image = this._createImage(src);
    image.onload = function () {
      var cvs = _this._getCanvas(image.naturalWidth, image.naturalHeight);
      var ctx = cvs.getContext('2d');
      ctx.drawImage(image, 0, 0);
      var newImageData = cvs.toDataURL();
      callback(newImageData);
    };
  },


  /**
   * 将图片转换成 base64 数据
   * @param {Element|String} el
   * @param {Function} callback
   */
  base64: function base64(el, callback) {
    var src = this._getElSrc(el);
    return this.init(src, callback);
  },
  _getImageType: function _getImageType(str) {
    var mimeType = 'image/jpeg';
    var outputType = str.match(/(image\/[\w]+)\.*/)[0];
    if (typeof outputType !== 'undefined') {
      mimeType = outputType;
    }
    return mimeType;
  },
  compress: function compress(src, quality, callback) {
    var reader = new FileReader();
    var self = this;
    reader.onload = function (event) {
      var image = new Image();
      image.src = event.target.result;
      image.onload = function () {
        var mimeType = self._getImageType(src.type);
        var cvs = self._getCanvas(image.naturalWidth, image.naturalHeight);
        var newImageData = cvs.toDataURL(mimeType, quality / 100);
        callback(newImageData);
      };
    };
    reader.readAsDataURL(src);
  },


  /**
  * crop image via canvas and generate data
  */
  crop: function crop(image, options, callback) {
    // check crop options
    if (isNumber(options.toCropImgX) && isNumber(options.toCropImgY) && options.toCropImgW > 0 && options.toCropImgH > 0) {
      var w = options.toCropImgW;
      var h = options.toCropImgH;
      if (options.maxWidth && options.maxWidth < w) {
        w = options.maxWidth;
        h = options.toCropImgH * w / options.toCropImgW;
      }
      if (options.maxHeight && options.maxHeight < h) {
        h = options.maxHeight;
      }
      var cvs = this._getCanvas(w, h);
      var mimeType = this._getImageType(image.src);
      var data = cvs.toDataURL(mimeType, options.compress / 100);
      callback(data);
    }
  },
  resize: function resize(image, options, callback) {
    if (isNumber(options.toCropImgX) && isNumber(options.toCropImgY) && options.toCropImgW > 0 && options.toCropImgH > 0) {
      var w = options.toCropImgW * options.imgChangeRatio;
      var h = options.toCropImgH * options.imgChangeRatio;
      var cvs = this._getCanvas(w, h);
      var mimeType = this._getImageType(image.src);
      var data = cvs.toDataURL(mimeType, options.compress / 100);
      callback(data);
    }
  },
  rotate: function rotate(src, degrees, callback) {
    var _this2 = this;

    this._loadImage(src, function (image) {
      var w = image.naturalWidth;
      var h = image.naturalHeight;
      var canvasWidth = Math.max(w, h);
      var cvs = _this2._getCanvas(canvasWidth, canvasWidth);
      var ctx = cvs.getContext('2d');
      ctx.save();
      ctx.translate(canvasWidth / 2, canvasWidth / 2);
      ctx.rotate(degrees * (Math.PI / 180));
      var x = 0;
      var y = 0;
      degrees %= 360;
      if (degrees === 0) {
        return callback(src, w, h);
      }
      if (degrees % 180 !== 0) {
        if (degrees === -90 || degrees === 270) {
          x = canvasWidth / 2 - w;
        } else {
          y = canvasWidth / 2 - h;
        }
        var c = w;
        w = h;
        h = c;
      } else {
        x = canvasWidth / 2 - w;
        y = canvasWidth / 2 - h;
      }
      ctx.drawImage(image, x, y);
      var cvs2 = _this2._getCanvas(w, h);
      var ctx2 = cvs2.getContext('2d');
      ctx2.drawImage(cvs, 0, 0, w, h, 0, 0, w, h);
      var mimeType = _this2._getImageType(image.src);
      var data = cvs.toDataURL(mimeType, 1);
      callback(data, w, h);
      cvs = null;
      ctx = null;
    });
  },
  _loadImage: function _loadImage(data, callback) {
    var image = this._createImage(data);
    image.onload = function () {
      callback(image);
    };
  },
  _getCanvas: function _getCanvas(width, height) {
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
  },
  _createImage: function _createImage(src) {
    var image = new Image();
    image.src = src;
    return image;
  },
  _getElSrc: function _getElSrc(el) {
    var src = el;
    if ((typeof el === 'undefined' ? 'undefined' : _typeof(el)) === 'object' && el.tagName === 'IMG') {
      var imgSrc = el.src;
      if (!imgSrc) {
        return console.error('Element must hava src');
      }
      src = imgSrc;
    }
    return src;
  }
};

/***/ })
/******/ ]);
});