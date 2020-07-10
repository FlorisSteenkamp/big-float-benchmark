
import { operators } from 'big-float-ts';
import { width, height, reStart, imStart,maxIter, reWidth, imWidth } from './consts';


const { 
    eAddDouble, eMultDouble2, eMult, eAdd, eDiff, eMultBy2, eEstimate 
} = operators;


function testBigFloat(image: number[][]): number[][] {
    for (let y=0; y<height; y++) {
        for (let x=0; x<width; x++) {
            // Convert pixel coordinate to complex number
            let x_ = eAddDouble(eMultDouble2(reWidth, [x/width]), reStart);
            let y_ = eAddDouble(eMultDouble2(imWidth, [y/height]), imStart);

            // Compute the number of iterations
            let zRe = [0,0];
            let zIm = [0,0];
            let n = 0;
            const dps = -2; // 28
            while (eEstimate(eAdd(eMult(zRe,zRe).slice(dps), eMult(zIm,zIm).slice(dps))) <= 4 && n < maxIter) {
                let zRe_ = eAdd(eDiff(eMult(zRe,zRe).slice(dps), eMult(zIm,zIm).slice(dps)).slice(dps), x_).slice(dps);
                zIm = eAdd(eMultBy2(eMult(zRe,zIm).slice(dps)).slice(dps), y_).slice(dps);
                zRe = zRe_;
                n++;
            }

            image[y][x] = n;
        }
    }

    return image;
}


export { testBigFloat }
