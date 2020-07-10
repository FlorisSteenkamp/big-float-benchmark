
import { BigNumber } from 'bignumber.js';
import { width, height, reStart, imStart,maxIter, reWidth, imWidth } from './consts';


function testBignumberJs(image: number[][]): number[][] {
    for (let y=0; y<height; y++) {
        for (let x=0; x<width; x++) {
            // Convert pixel coordinate to complex number
            let x_ = new BigNumber(x/width);
            x_ = x_.multipliedBy(reWidth);
            x_ = x_.plus(reStart);
            let y_ = new BigNumber(y/height);
            y_ = y_.multipliedBy(imWidth);
            y_ = y_.plus(imStart);

            // Compute the number of iterations
            let zRe = new BigNumber(0);
            let zIm = new BigNumber(0);
            let n = 0;
            let looping = true;
            const dps = 28;
            while (looping) {
                let zRe_ = (zRe.multipliedBy(zRe).dp(dps).minus(zIm.multipliedBy(zIm).dp(dps)).dp(dps)).plus(x_).dp(dps);
                zIm = zRe.multipliedBy(zIm).dp(dps).multipliedBy(2).plus(y_).dp(dps);
                zRe = zRe_;
                n++;

                looping = (zRe.multipliedBy(zRe).dp(dps)).plus(zIm.multipliedBy(zIm).dp(dps)).dp(dps).comparedTo(4) < 0 && n < maxIter;
            }

            image[y][x] = n;
        }
    }

    return image;
}


export { testBignumberJs }
