// @ts-ignore
import _Double from 'double.js';
import { width, height, reStart, imStart,maxIter, reWidth, imWidth } from './consts.js';

const Double = _Double.Double;

const zero = Double.Zero;
const clone = Double.clone;
const mul21 = Double.mul21;
const mul22 = Double.mul22;
const add21 = Double.add21;
const add22 = Double.add22;
const sub22 = Double.sub22;
const fromMul11 = Double.fromMul11;


function testDoubleDotJs(image: number[][]): number[][] {
    for (let y=0; y<height; y++) {
        for (let x=0; x<width; x++) {
            // Convert pixel coordinate to complex number
            let x_ = add21(fromMul11(x/width, reWidth), reStart);
            let y_ = add21(fromMul11(y/height, imWidth), imStart);

            // Compute the number of iterations
            let zRe = zero;
            let zIm = zero;
            let n = 0;

            while (n < maxIter) {
                const zRe2 = mul22(clone(zRe),zRe);
                const zIm2 = mul22(clone(zIm),zIm);

                if (add22(clone(zRe2), zIm2).hi > 4) {
                    break;
                }

                let zRe_ = add22(sub22(zRe2, zIm2), x_);
                zIm = add22(mul21(mul22(clone(zRe),zIm),2), y_);
                zRe = zRe_;

                n++;
            }

            image[y][x] = n;
        }
    }

    return image;
}


export { testDoubleDotJs }
