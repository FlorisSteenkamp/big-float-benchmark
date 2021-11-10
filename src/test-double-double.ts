import { operators } from 'double-double';
import { width, height, reStart, imStart, maxIter, reWidth, imWidth } from './consts.js';


const {
    ddMultDd,
    ddAddDouble,
    ddAddDd, 
    ddDiffDd,
    ddMultBy2,
    twoProduct
} = operators;

const zero = [0,0];

function testDoubleDouble(image: number[][]): number[][] {
    for (let y=0; y<height; y++) {
        for (let x=0; x<width; x++) {
            // Convert pixel coordinate to complex number
            let x_ = ddAddDouble(twoProduct(reWidth, x/width), reStart);
            let y_ = ddAddDouble(twoProduct(imWidth, y/height), imStart);

            // Compute the number of iterations
            let zRe = zero;
            let zIm = zero;
            let n = 0;
            while (n < maxIter) {
                const zRe2 = ddMultDd(zRe,zRe);
                const zIm2 = ddMultDd(zIm,zIm);
                if (ddAddDd(zRe2, zIm2)[1] > 4) { 
                    break; 
                }

                let zRe_ = ddAddDd(ddDiffDd(zRe2, zIm2), x_);
                zIm = ddAddDd(ddMultBy2(ddMultDd(zRe,zIm)), y_);
                zRe = zRe_;
                n++;
            }

            image[y][x] = n;
        }
    }

    return image;
}


export { testDoubleDouble }
