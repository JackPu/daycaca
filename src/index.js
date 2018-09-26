// a canvas lib to compress or crop images

const isNumber = num => (typeof num === 'number');
const imageReg = /[./](png|jpeg|jpg|gif|bmp)/;

const defaultConfig = {
  ratio: 1,
  compress: 80,
  enableWebWorker: false,
};


module.exports = {
  setConfig(config) {
    this._config = Object.assign(defaultConfig, config)
  },

  /**
  * init image for reset size and rotation
  */
  init(src, callback) {
    const scrTypes = src.split(';');
    let srcType = null;
    const image = this._createImage(src);
    if (scrTypes.length > 1) {
      srcType = scrTypes[0].replace('data:', '');
    }
    image.onload = () => {
      const cvs = this._getCanvas(image.naturalWidth, image.naturalHeight);
      const ctx = cvs.getContext('2d');
      ctx.drawImage(image, 0, 0);
      const newImageData = cvs.toDataURL(srcType);
      callback(newImageData);
    };
  },

  /**
   * encode image to base64
   * @param {Element|String} el
   * @param {Function} callback
   */
  base64(el, callback) {
    const { src, type } = this._getSrc(el);
    if (type === 'file') {
      return this._readFile(src, callback);
    } else if (type === 'video') {
      const video = el;
      const cvs = this._getCanvas(video.videoWidth, video.videoHeight);
      const ctx = cvs.getContext('2d');
      ctx.drawImage(video, 0, 0);
      const newImageData = cvs.toDataURL();
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
  compress(source, quality, callback) {
    const { src, type } = this._getSrc(source);
    if (type === 'file') {
      return this._readFile(src, (data) => {
        this._compress(data, source, quality, callback);
      });
    }
    this._compress(src, source, quality, callback);
  },

  _compress(src, source, quality, callback) {
    this._loadImage(src, (image) => {
      const mimeType = this._getImageType(source);
      const cvs = this._getCanvas(image.naturalWidth, image.naturalHeight);
      const ctx = cvs.getContext('2d');
      ctx.drawImage(image, 0, 0);
      const newImageData = cvs.toDataURL(mimeType, quality / 100);
      callback(newImageData);
    });
  },

  /**
  * crop image via canvas and generate data
  */
  crop(source, options, callback) {
    const { src, type } = this._getSrc(source);
    if (type === 'file') {
      return this._readFile(src, (data) => {
        this._crop(data, source, options, callback);
      })
    }
    this._crop(src, source, options, callback);
  },

  _crop(src, source, options, callback) {
    this._loadImage(src, (image) => {
      // check crop options
      if (isNumber(options.x) &&
        isNumber(options.y) &&
        options.w > 0 &&
        options.h > 0) {
        let { w, h } = options;
        if (options.maxWidth && options.maxWidth < w) {
          w = options.maxWidth;
          h = (options.h * w) / options.w;
        }
        if (options.maxHeight && options.maxHeight < h) {
          h = options.maxHeight;
        }
        if (options.fixedWidth && options.fixedHeight) {
          w = options.fixedWidth;
          h = options.fixedHeight;
        }
        const cvs = this._getCanvas(w, h);
        cvs.getContext('2d').drawImage(image, options.x, options.y, options.w, options.h, 0, 0, w, h);
        const mimeType = this._getImageType(source);
        const data = cvs.toDataURL(mimeType, options.compress / 100);
        callback(data);
      }
    });
  },

  resize(source, ratio, callback) {
    const { src, type } = this._getSrc(source);
    let options = {};
    if (typeof ratio === 'number' || typeof ratio === 'string') {
      options = {
        ratio,
        compress: defaultConfig.compress,
      };
    } else if (typeof ration === 'object') {
      options = ratio;
    }
    if (type === 'file') {
      return this._readFile(src, (data) => {
        this._resize(data, source, options, callback);
      });
    }
    this._resize(src, source, options, callback);
  },

  _resize(src, source, options, callback) {
    this._loadImage(src, (image) => {
      if (options.ratio > 0) {
        const w = Math.floor(image.naturalWidth * options.ratio);
        const h = Math.floor(image.naturalHeight * options.ratio);
        const cvs = this._getCanvas(w, h);
        cvs.getContext('2d').drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, 0, 0, w, h);
        const mimeType = this._getImageType(source);
        const data = cvs.toDataURL(mimeType, options.compress / 100);
        callback(data);
      }
    });
  },

  /**
   * rotate image
   */
  rotate(source, degree, callback) {
    const { src, type } = this._getSrc(source);
    if (type === 'file') {
      return this._readFile(src, () => {
        this._rotate(src, source, degree, callback);
      });
    }
    if (degree % 360 === 0) {
      return callback(src);
    }
    this._rotate(src, source, degree, callback);
  },
  _rotate(src, source, degree, callback) {
    this._loadImage(src, (image) => {
      let w = image.naturalWidth;
      let h = image.naturalHeight;
      degree %= 360;
      if (degree === 90 || degree === 270) {
        w = image.naturalHeight;
        h = image.naturalWidth;
      }
      let cvs = this._getCanvas(w, h);
      let ctx = cvs.getContext('2d');
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, w, h);
      ctx.translate(w / 2, h / 2);
      ctx.rotate((degree * Math.PI) / 180);
      ctx.drawImage(image, -image.naturalWidth / 2, -image.naturalHeight / 2);
      const mimeType = this._getImageType(source);
      const data = cvs.toDataURL(mimeType, 1);
      callback(data, w, h);
      cvs = null;
      ctx = null;
    });
  },

  _loadImage(src, callback) {
    const image = this._createImage(src);
    image.onload = () => {
      callback(image);
    };
  },

  _readFile(file, callback) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target.result;
      callback(data);
    };
    reader.readAsDataURL(file);
  },

  _getCanvas(width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
  },

  _createImage(src) {
    const image = new Image();
    image.src = src;
    return image;
  },

  _getSrc(source) {
    let src = source;
    let type = 'url';
    if (this._isImageElement(source)) {
      const imgSrc = source.src;
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
      src,
      type,
    };
  },

  _isFileObject(file) {
    return (typeof file === 'object' && file.type && file.size > 0);
  },

  _isImageElement(el) {
    return (typeof el === 'object' && el.tagName === 'IMG');
  },

  _isVideoElement(el) {
    return (typeof el === 'object' && el.tagName === 'VIDEO');
  },

  _getImageType(source) {
    const { src, type } = this._getSrc(source);
    let mimeType = 'image/jpeg';
    if (type === 'file') {
      const fileType = source.type;
      const outputType = fileType.match(/(image\/[\w]+)\.*/)[0];
      if (typeof outputType !== 'undefined') {
        mimeType = outputType;
      }
    } else {
      const arr = imageReg.exec(src);
      if (arr && arr[1]) {
        mimeType = `image/${arr[1]}`;
      }
    }
    return mimeType;
  },

};
