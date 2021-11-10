const ResolveTypeScriptPlugin = require("resolve-typescript-plugin").default;


module.exports = {
    entry: './src/test.ts',
    mode: 'development',
    //mode: 'production',
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
        extensions: [
            '.js', '.mjs', '.cjs'
        ],
        plugins: [new ResolveTypeScriptPlugin({
            includeNodeModules: false
        })]
    },
    output: {
        filename: 'test.js',
    },
    stats: {
        // Don't display most things
        all: false,
        colors: true,
        errors: true,
        builtAt: true
    }
};
