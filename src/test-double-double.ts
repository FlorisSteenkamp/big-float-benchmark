
import { operators } from 'double-double';
import { width, height, reStart, imStart,maxIter, reWidth, imWidth } from './consts';


const {
    ddMultDd,
    ddAddDouble,
    ddMultDouble2,
    ddAddDd, 
    ddDiffDd,
    ddMultBy2
} = operators;


function testDoubleDouble(image: number[][]): number[][] {
    for (let y=0; y<height; y++) {
        for (let x=0; x<width; x++) {
            // Convert pixel coordinate to complex number
            let x_ = ddAddDouble(ddMultDouble2(reWidth, [0,x/width]), reStart);
            let y_ = ddAddDouble(ddMultDouble2(imWidth, [0,y/height]), imStart);

            // Compute the number of iterations
            let zRe = [0,0];
            let zIm = [0,0];
            let n = 0;
            while (ddAddDd(ddMultDd(zRe,zRe), ddMultDd(zIm,zIm))[1] <= 4 && n < maxIter) {
                let zRe_ = ddAddDd(ddDiffDd(ddMultDd(zRe,zRe), ddMultDd(zIm,zIm)), x_);
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
