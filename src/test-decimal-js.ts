
import { Decimal } from 'decimal.js';
import { width, height, reStart, imStart,maxIter, reWidth, imWidth } from './consts';


function testDecimalJs(image: number[][]): number[][] {
    for (let y=0; y<height; y++) {
        for (let x=0; x<width; x++) {
            // Convert pixel coordinate to complex number
            let x_ = new Decimal(x/width);
            x_ = x_.mul(reWidth);
            x_ = x_.plus(reStart);
            let y_ = new Decimal(y/height);
            y_ = y_.mul(imWidth);
            y_ = y_.plus(imStart);

            // Compute the number of iterations
            let zRe = new Decimal(0);
            let zIm = new Decimal(0);
            let n = 0;
            let looping = true;
            const dps = 28;
            while (looping) {
                let zRe_ = (zRe.mul(zRe).toDP(dps).minus(zIm.mul(zIm).toDP(dps)).toDP(dps)).plus(x_).toDP(dps);
                zIm = zRe.mul(zIm).toDP(dps).mul(2).plus(y_).toDP(dps);
                zRe = zRe_;
                n++;

                looping = (zRe.mul(zRe).toDP(dps)).plus(zIm.mul(zIm).toDP(dps)).toDP(dps).cmp(4) < 0 && n < maxIter;
            }

            image[y][x] = n;
        }
    }

    return image;
}


export { testDecimalJs }
