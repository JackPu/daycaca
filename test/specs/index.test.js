/*eslint-disable*/
import { expect } from 'chai';
import daycaca from '../../src/index';

describe('daycaca tests', () => {

    it('#_getCanvas()', () => {
        const canvas = daycaca._getCanvas(100, 100);
        expect(canvas.tagName).to.equal('CANVAS');
        expect(canvas.width).to.equal(100);
    });

    it('#_createImage()', () => {
        const i = daycaca._createImage('http://img1.vued.vanthink.cn/vuede7738ce4bcff0e00874b3566ef518783.png');
        expect(i.tagName).to.equal('IMG');
    });

    it('#base64()', (done) => {
        const src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFElEQVQYV2P8+bbpPwMDAwMjjAEAS2AG0Z9vsksAAAAASUVORK5CYII=';
        daycaca.base64(src, (data) => {
            expect(/data:image\/png;base64/.test(data)).to.equal(true)
            done();
        });
    });

    it('#resize()', () => {
        const src = 'http://img1.vued.vanthink.cn/vuede7738ce4bcff0e00874b3566ef518783.png';
        daycaca.base64(src, 2, (data) => {
            expect(/data:image\/png;base64/.test(data)).to.equal(true)
            done();
        });
    });

});

