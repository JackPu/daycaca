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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// a canvas lib to compress or crop images

var isNumber = function isNumber(num) {
  return typeof num === 'number';
};
var imageReg = /[./](png|jpeg|jpg|gif|bmp)/;

var defaultConfig = {
  ratio: 1,
  compress: 80,
  enableWebWorker: false
};

module.exports = {
  setConfig: function setConfig(config) {
    this._config = _extends(defaultConfig, config);
  },


  /**
  * init image for reset size and rotation
  */
  init: function init(src, callback) {
    var _this = this;

    var scrTypes = src.split(';');
    var srcType = null;
    var image = this._createImage(src);
    if (scrTypes.length > 1) {
      srcType = scrTypes[0].replace('data:', '');
    }
    image.onload = function () {
      var cvs = _this._getCanvas(image.naturalWidth, image.naturalHeight);
      var ctx = cvs.getContext('2d');
      ctx.drawImage(image, 0, 0);
      var newImageData = cvs.toDataURL(srcType);
      callback(newImageData);
    };
  },


  /**
   * encode image to base64
   * @param {Element|String} el
   * @param {Function} callback
   */
  base64: function base64(el, callback) {
    var _getSrc = this._getSrc(el),
        src = _getSrc.src,
        type = _getSrc.type;

    if (type === 'file') {
      return this._readFile(src, callback);
    } else if (type === 'video') {
      var video = el;
      var cvs = this._getCanvas(video.videoWidth, video.videoHeight);
      var ctx = cvs.getContext('2d');
      ctx.drawImage(video, 0, 0);
      var newImageData = cvs.toDataURL();
      callback(newImageData, cvs);
    }
    return this.init(src, callback);
  },


  /**
   * compress image
   * @param {el|String} src the source of image
   * @param {Number} the quality of image ( 100 = the highest quality)
   * @param {Function} callback
   */
  compress: function compress(source, quality, callback) {
    var _this2 = this;

    var _getSrc2 = this._getSrc(source),
        src = _getSrc2.src,
        type = _getSrc2.type;

    if (type === 'file') {
      return this._readFile(src, function (data) {
        _this2._compress(data, source, quality, callback);
      });
    }
    this._compress(src, source, quality, callback);
  },
  _compress: function _compress(src, source, quality, callback) {
    var _this3 = this;

    this._loadImage(src, function (image) {
      var mimeType = _this3._getImageType(source);
      var cvs = _this3._getCanvas(image.naturalWidth, image.naturalHeight);
      var ctx = cvs.getContext('2d');
      ctx.drawImage(image, 0, 0);
      var newImageData = cvs.toDataURL(mimeType, quality / 100);
      callback(newImageData);
    });
  },


  /**
  * crop image via canvas and generate data
  */
  crop: function crop(source, options, callback) {
    var _this4 = this;

    var _getSrc3 = this._getSrc(source),
        src = _getSrc3.src,
        type = _getSrc3.type;

    if (type === 'file') {
      return this._readFile(src, function (data) {
        _this4._crop(data, source, options, callback);
      });
    }
    this._crop(src, source, options, callback);
  },
  _crop: function _crop(src, source, options, callback) {
    var _this5 = this;

    this._loadImage(src, function (image) {
      // check crop options
      if (isNumber(options.x) && isNumber(options.y) && options.w > 0 && options.h > 0) {
        var w = options.w,
            h = options.h;

        if (options.maxWidth && options.maxWidth < w) {
          w = options.maxWidth;
          h = options.h * w / options.w;
        }
        if (options.maxHeight && options.maxHeight < h) {
          h = options.maxHeight;
        }
        if (options.fixedWidth && options.fixedHeight) {
          w = options.fixedWidth;
          h = options.fixedHeight;
        }
        var cvs = _this5._getCanvas(w, h);
        cvs.getContext('2d').drawImage(image, options.x, options.y, options.w, options.h, 0, 0, w, h);
        var mimeType = _this5._getImageType(source);
        var data = cvs.toDataURL(mimeType, options.compress / 100);
        callback(data);
      }
    });
  },
  resize: function resize(source, ratio, callback) {
    var _this6 = this;

    var _getSrc4 = this._getSrc(source),
        src = _getSrc4.src,
        type = _getSrc4.type;

    var options = {};
    if (typeof ratio === 'number' || typeof ratio === 'string') {
      options = {
        ratio: ratio,
        compress: defaultConfig.compress
      };
    }
    if ((typeof ratio === 'undefined' ? 'undefined' : _typeof(ratio)) === 'object') {
      options = ratio;
    }
    if (type === 'file') {
      return this._readFile(src, function (data) {
        _this6._resize(data, source, options, callback);
      });
    }
    this._resize(src, source, options, callback);
  },
  _resize: function _resize(src, source, options, callback) {
    var _this7 = this;

    this._loadImage(src, function (image) {
      var w = image.naturalWidth;
      var h = image.naturalHeight;
      if (options.ratio > 0) {
        w = Math.floor(image.naturalWidth * options.ratio);
        h = Math.floor(image.naturalHeight * options.ratio);
      } else if (typeof options.width === 'number' && typeof options.height === 'number') {
        w = Math.floor(options.width);
        h = Math.floor(options.height);
      }
      var cvs = _this7._getCanvas(w, h);
      cvs.getContext('2d').drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, 0, 0, w, h);
      var mimeType = _this7._getImageType(source);
      var data = cvs.toDataURL(mimeType, options.compress / 100);
      callback(data);
    });
  },


  /**
   * rotate image
   */
  rotate: function rotate(source, degree, callback) {
    var _this8 = this;

    var _getSrc5 = this._getSrc(source),
        src = _getSrc5.src,
        type = _getSrc5.type;

    if (type === 'file') {
      return this._readFile(src, function () {
        _this8._rotate(src, source, degree, callback);
      });
    }
    if (degree % 360 === 0) {
      return callback(src);
    }
    this._rotate(src, source, degree, callback);
  },
  _rotate: function _rotate(src, source, degree, callback) {
    var _this9 = this;

    this._loadImage(src, function (image) {
      var w = image.naturalWidth;
      var h = image.naturalHeight;
      degree %= 360;
      if (degree === 90 || degree === 270) {
        w = image.naturalHeight;
        h = image.naturalWidth;
      }
      var cvs = _this9._getCanvas(w, h);
      var ctx = cvs.getContext('2d');
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, w, h);
      ctx.translate(w / 2, h / 2);
      ctx.rotate(degree * Math.PI / 180);
      ctx.drawImage(image, -image.naturalWidth / 2, -image.naturalHeight / 2);
      var mimeType = _this9._getImageType(source);
      var data = cvs.toDataURL(mimeType, 1);
      callback(data, w, h);
      cvs = null;
      ctx = null;
    });
  },
  _loadImage: function _loadImage(src, callback) {
    var image = this._createImage(src);
    image.onload = function () {
      callback(image);
    };
  },
  _readFile: function _readFile(file, callback) {
    var reader = new FileReader();
    reader.onload = function (event) {
      var data = event.target.result;
      callback(data);
    };
    reader.readAsDataURL(file);
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
  _getSrc: function _getSrc(source) {
    var src = source;
    var type = 'url';
    if (this._isImageElement(source)) {
      var imgSrc = source.src;
      if (!imgSrc) {
        throw new Error('Element must hava src');
      }
      src = imgSrc;
      type = 'element';
    } else if (this._isVideoElement(source)) {
      src = source;
      type = 'video';
    } else if (this._isFileObject(source)) {
      src = source;
      type = 'file';
    }
    return {
      src: src,
      type: type
    };
  },
  _isFileObject: function _isFileObject(file) {
    return (typeof file === 'undefined' ? 'undefined' : _typeof(file)) === 'object' && file.type && file.size > 0;
  },
  _isImageElement: function _isImageElement(el) {
    return (typeof el === 'undefined' ? 'undefined' : _typeof(el)) === 'object' && el.tagName === 'IMG';
  },
  _isVideoElement: function _isVideoElement(el) {
    return (typeof el === 'undefined' ? 'undefined' : _typeof(el)) === 'object' && el.tagName === 'VIDEO';
  },
  _getImageType: function _getImageType(source) {
    var _getSrc6 = this._getSrc(source),
        src = _getSrc6.src,
        type = _getSrc6.type;

    var mimeType = 'image/jpeg';
    if (type === 'file') {
      var fileType = source.type;
      var outputType = fileType.match(/(image\/[\w]+)\.*/)[0];
      if (typeof outputType !== 'undefined') {
        mimeType = outputType;
      }
    } else {
      var arr = imageReg.exec(src);
      if (arr && arr[1]) {
        mimeType = 'image/' + arr[1];
      }
    }
    return mimeType;
  }
};

/***/ })
/******/ ]);
});