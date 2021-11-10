
import { BigFloat32 } from 'bigfloat';
import { width, height, reStart, imStart,maxIter, reWidth, imWidth } from './consts.js';


function testBigfloat_32(image: number[][]): number[][] {
    for (let y=0; y<height; y++) {
        for (let x=0; x<width; x++) {
            // Convert pixel coordinate to complex number
            let x_ = new BigFloat32(x/width);
            x_ = x_.mul(reWidth);
            x_ = x_.add(reStart);
            let y_ = new BigFloat32(y/height);
            y_ = y_.mul(imWidth);
            y_ = y_.add(imStart);

            // Compute the number of iterations
            let zRe = new BigFloat32(0);
            let zIm = new BigFloat32(0);
            let n = 0;
            let looping = true;
            //const dps = 28;
            const dps = 16;
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


export { testBigfloat_32 }
