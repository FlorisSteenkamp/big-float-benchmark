
const path = require('path');
const projectRoot = '../';

module.exports = {
    entry: './src/test.ts',
    //mode: 'development',
    mode: 'production',
    devtool: 'none',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js', '.d.ts' ],
        alias: {
            //'double-double$': path.resolve(__dirname, projectRoot + 'double-double/src/index.ts'),
            //'big-float-ts$': path.resolve(__dirname, projectRoot + 'big-float/src/index.ts'),
        }
    },
    output: {
        filename: 'test.js',
        //path: path.resolve(__dirname, 'browser'),
    },
    stats: {
        // Don't display most things
        all: false,
        colors: true,
        errors: true,
        builtAt: true
    }
};
