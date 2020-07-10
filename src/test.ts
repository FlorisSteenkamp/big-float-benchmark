
import { width, height } from './consts';
import { testNative } from './test-native';
import { testDoubleDouble } from './test-double-double';
import { testBigfloat } from './test-bigfloat';
import { testBigFloat } from './test-big-float-ts';
import { testBignumberJs } from './test-bignumber-js';
import { testBigJs } from './test-big-js';
import { testDecimalJs } from './test-decimal-js';
import { Chart, ChartData } from 'chart.js';


type Test = 
    | 'test-native'
    | 'test-double-double'
    | 'test-big-float-ts'
    | 'test-bigfloat'
    | 'test-bignumber.js'
    | 'test-decimal.js'
    | 'test-big.js';


const tests: { [key in Test]: { f: (image: number[][]) => number[][], timing?: number } } = {
    'test-native'        : { f: testNative },
    'test-double-double' : { f: testDoubleDouble },
    'test-big-float-ts'  : { f: testBigFloat },
    'test-bigfloat'      : { f: testBigfloat },
    'test-bignumber.js'  : { f: testBignumberJs },
    'test-decimal.js'    : { f: testDecimalJs },
    'test-big.js'        : { f: testBigJs },
};


function test(fStr: Test) {
    const f: (image: number[][]) => number[][] = tests[fStr].f;

    let context = (document.getElementById('gc') as HTMLCanvasElement).getContext('2d');
    let img = context.getImageData(0, 0, width, height);
    let buf = img.data;

    for (let i=0; i<1; i++) {
        let image: number[][] = [];

        // prefill
        for (let y=0; y<height; y++) {
            let arr: number[] = [];
            image.push(arr);
            for (let x=0; x<width; x++) {
                arr.push(0);
            }
        }

        let timeStart = performance.now();
        let im = f(image);
        let timing = performance.now() - timeStart;
        tests[fStr].timing = timing;

        let i = 0;
        for (let y=0; y<height; y++) {
            for (let x=0; x<width; x++) {
                // HSV to RGB: From wikipedia (https://en.wikipedia.org/wiki/HSL_and_HSV): 
                // "...Given an HSV color with hue H ∈ [0°, 360°], saturation SV ∈ [0, 1], and 
                // value V ∈ [0, 1], we can use the same strategy. First, we find chroma:
                // ...

                let Sv = 1;
                let V = 1;
                let H = im[y][x]*20;
                
                let C = V * Sv;
                let H_ = H/60;
                let X = C * (1 - Math.abs(H_%2 - 1));
                let RGB = 
                    H_ === 0 ? [0,0,0] :
                    H_ >= 0 && H_ <= 1 ? [C,X,0] :
                    H_ >  1 && H_ <= 2 ? [X,C,0] :
                    H_ >  2 && H_ <= 3 ? [0,C,X] :
                    H_ >  3 && H_ <= 4 ? [0,X,C] :
                    H_ >  4 && H_ <= 5 ? [X,0,C] :
                    H_ >  5 && H_ <= 6 ? [C,0,X] : [0,0,0];

                buf[i++] = RGB[0]*255;
                buf[i++] = RGB[1]*255;
                buf[i++] = RGB[2]*255;
                buf[i++] = 255;
            }
        }
        
        context.putImageData(img, 0, 0);

        let debug$ = document.getElementById('debug') as HTMLTextAreaElement;
        debug$.innerHTML = 'milli-seconds per frame: ' + tests[fStr].timing.toFixed(3);
    }
}


const fStrs: Test[] = [
    'test-native', 
    'test-double-double', 
    'test-big-float-ts', 
    'test-bigfloat', 
    'test-bignumber.js', 
    'test-big.js', 
    'test-decimal.js'
];

document.getElementById('tests').onclick = function() {
    for (let fStr of fStrs) { test(fStr); }
    drawBargraph();
}


function objToArr<T>(obj: { [K in keyof T]: T[K] }) {
    return Object.keys(obj).map(key => obj[key as keyof T]);
}


function drawBargraph() {
    let objs = objToArr(tests);
    const data = objs.map(o => o.timing);
    const labels = Object.keys(tests).map(s => s.substr(5));
    const chartData: ChartData = {
        labels,
        datasets: [{
            label: 'Milliseconds per frame (smaller is better)',
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
            data,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 206, 86)',
                'rgb(75, 192, 192)',
                'rgb(153, 102, 255)',
                'rgb(255, 159, 64)'
            ],
        }],
    };

    const canvas$ = document.getElementById('chart') as HTMLCanvasElement;
    const ctx = canvas$.getContext('2d');

    const chart = new Chart(ctx, {
        type: 'horizontalBar',
        data: chartData,
        options: {
            scales: {
                xAxes: [{
                    gridLines: {
                        offsetGridLines: true
                    }
                }]
            }
        }
    });
}


fStrs.map(str => document.getElementById(str).onclick = () => test(str));


test('test-double-double');
