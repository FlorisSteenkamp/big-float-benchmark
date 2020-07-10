
import { Big } from 'big.js';
import { width, height, reStart, imStart,maxIter, reWidth, imWidth } from './consts';


function testBigJs(image: number[][]): number[][] {
    for (let y=0; y<height; y++) {
        for (let x=0; x<width; x++) {
            // Convert pixel coordinate to complex number
            let x_ = new Big(x/width);
            x_ = x_.mul(reWidth);
            x_ = x_.plus(reStart);
            let y_ = new Big(y/height);
            y_ = y_.mul(imWidth);
            y_ = y_.plus(imStart);

            // Compute the number of iterations
            let zRe = new Big(0);
            let zIm = new Big(0);
            let n = 0;
            let looping = true;
            const dps = 28;
            while (looping) {
                let zRe_ = (zRe.mul(zRe).round(dps).minus(zIm.mul(zIm).round(dps)).round(dps)).round(dps).plus(x_).round(dps);
                zIm = zRe.mul(zIm).round(dps).mul(2).plus(y_).round(dps);
                zRe = zRe_;
                n++;

                looping = (zRe.mul(zRe).round(dps)).plus(zIm.mul(zIm).round(dps)).round(dps).cmp(4) < 0 && n < maxIter;
            }

            image[y][x] = n;
        }
    }

    return image;
}


export { testBigJs }
