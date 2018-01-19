// a canvas lib to compress or crop images

const isNumber = num => (typeof num === 'number');

export default {

  /**
  * init image for reset size and rotation
  */
  init(src, callback) {
    const image = this._createImage(src);
    image.onload = () => {
      const mimeType = this._getImageType(image.src);
      const cvs = this._getCanvas(image.naturalWidth, image.naturalHeight);
      const ctx = cvs.getContext('2d');
      ctx.drawImage(image, 0, 0);
      const newImageData = cvs.toDataURL(mimeType, 100);
      callback(newImageData);
    };
  },

  _getImageType(str) {
    let mimeType = 'image/jpeg';
    const outputType = str.match(/(image\/[\w]+)\.*/)[0];
    if (typeof outputType !== 'undefined') {
      mimeType = outputType;
    }
    return mimeType;
  },

  compress(src, quality, callback) {
    const reader = new FileReader();
    const self = this;
    reader.onload = (event) => {
      const image = new Image();
      image.src = event.target.result;
      image.onload = () => {
        const mimeType = self._getImageType(src.type);
        const cvs = self._getCanvas(image.naturalWidth, image.naturalHeight);
        const newImageData = cvs.toDataURL(mimeType, quality / 100);
        callback(newImageData);
      };
    };
    reader.readAsDataURL(src);
  },

  /**
  * crop image via canvas and generate data
  */
  crop(image, options, callback) {
    // check crop options
    if (isNumber(options.toCropImgX) &&
        isNumber(options.toCropImgY) &&
        options.toCropImgW > 0 &&
        options.toCropImgH > 0) {
      let w = options.toCropImgW;
      let h = options.toCropImgH;
      if (options.maxWidth && options.maxWidth < w) {
        w = options.maxWidth;
        h = (options.toCropImgH * w) / options.toCropImgW;
      }
      if (options.maxHeight && options.maxHeight < h) {
        h = options.maxHeight;
      }
      const cvs = this._getCanvas(w, h);
      const mimeType = this._getImageType(image.src);
      const data = cvs.toDataURL(mimeType, options.compress / 100);
      callback(data);
    }
  },

  resize(image, options, callback) {
    if (isNumber(options.toCropImgX) &&
        isNumber(options.toCropImgY) &&
        options.toCropImgW > 0 &&
        options.toCropImgH > 0) {
      const w = options.toCropImgW * options.imgChangeRatio;
      const h = options.toCropImgH * options.imgChangeRatio;
      const cvs = this._getCanvas(w, h);
      const mimeType = this._getImageType(image.src);
      const data = cvs.toDataURL(mimeType, options.compress / 100);
      callback(data);
    }
  },

  rotate(src, degrees, callback) {
    this._loadImage(src, (image) => {
      let w = image.naturalWidth;
      let h = image.naturalHeight;
      const canvasWidth = Math.max(w, h);
      let cvs = this._getCanvas(canvasWidth, canvasWidth);
      let ctx = cvs.getContext('2d');
      ctx.save();
      ctx.translate(canvasWidth / 2, canvasWidth / 2);
      ctx.rotate(degrees * (Math.PI / 180));
      let x = 0;
      let y = 0;
      degrees %= 360;
      if (degrees === 0) {
        return callback(src, w, h);
      }
      if ((degrees % 180) !== 0) {
        if (degrees === -90 || degrees === 270) {
          x = (canvasWidth / 2) - w;
        } else {
          y = (canvasWidth / 2) - h;
        }
        const c = w;
        w = h;
        h = c;
      } else {
        x = (canvasWidth / 2) - w;
        y = (canvasWidth / 2) - h;
      }
      ctx.drawImage(image, x, y);
      const cvs2 = this._getCanvas(w, h);
      const ctx2 = cvs2.getContext('2d');
      ctx2.drawImage(cvs, 0, 0, w, h, 0, 0, w, h);
      const mimeType = this._getImageType(image.src);
      const data = cvs.toDataURL(mimeType, 1);
      callback(data, w, h);
      cvs = null;
      ctx = null;
    });
  },

  _loadImage(data, callback) {
    const image = this._createImage(data);
    image.onload = () => {
      callback(image);
    };
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

};
