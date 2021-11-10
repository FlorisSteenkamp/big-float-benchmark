
import { BigFloat53 } from 'bigfloat';
import { width, height, reStart, imStart,maxIter, reWidth, imWidth } from './consts.js';


function testBigfloat_53(image: number[][]): number[][] {
    for (let y=0; y<height; y++) {
        for (let x=0; x<width; x++) {
            // Convert pixel coordinate to complex number
            let x_ = new BigFloat53(x/width);
            x_.mulSmall(reWidth, x_);
            x_.addSmall(reStart, x_);
            let y_ = new BigFloat53(y/height);
            y_.mulSmall(imWidth, y_);
            y_.addSmall(imStart, y_);

            // Compute the number of iterations
            let zRe = new BigFloat53(0);
            let zIm = new BigFloat53(0);
            let n = 0;
            let looping = true;
            const dps = 28;
            while (looping) {
                let zRe_ = (zRe.mul(zRe).round(dps).sub(zIm.mul(zIm).round(dps)).round(dps)).add(x_).round(dps);
                let int = zRe.mul(zIm).round(dps);
                zIm = int.add(int).round(dps).add(y_).round(dps);
                zRe = zRe_;
                n++;

                looping = zRe.mul(zRe).round(dps).add(zIm.mul(zIm).round(dps)).round(dps).cmp(4) < 0 && n < maxIter;
            }

            image[y][x] = n;
        }
    }

    return image;
}


export { testBigfloat_53 }
