/*eslint-disable*/
import { expect } from 'chai';
import daycaca from '../../src/index';

describe('daycaca tests', () => {

    it('#_getCanvas()', () => {
        const canvas = daycaca._getCanvas(100, 100);
        expect(canvas.tagName).to.equal('CANVAS');
        expect(canvas.width).to.equal(100);
    });

});

