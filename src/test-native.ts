
import { width, height, reStart, imStart, maxIter, reWidth, imWidth } from './consts';


function testNative(image: number[][]): number[][] {
    for (let y=0; y<height; y++) {
        for (let x=0; x<width; x++) {
            // Convert pixel coordinate to complex number
            let x_ = reStart + (x/width *reWidth);
            let y_ = imStart + (y/height*imWidth);

            // Compute the number of iterations
            let zRe = 0;
            let zIm = 0;
            let n = 0;
            while (zRe*zRe + zIm*zIm <= 4 && n < maxIter) {
                let zRe_ = zRe*zRe - zIm*zIm + x_;
                zIm = 2*zRe*zIm + y_;
                zRe = zRe_;
                n++;
            }

            image[y][x] = n;
        }
    }

    return image;
}


export { testNative }
