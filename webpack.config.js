var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        'polyfills': './web/src/polyfills.ts',
        'vendor': './web/src/vendor.ts',
        'main': './web/src/main.ts'
    },
    resolve: {
        extensions: ['', '.ts', '.js'],
        root: './web/src',
        modulesDirectories: ['node_modules']
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: [
                    'ts-loader',
                    'angular2-template-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['polyfills', 'vendor'].reverse()
        }),
        new HtmlWebpackPlugin({
            template: './web/src/index.html',
            chunksSortMode: 'dependency'
        }),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            __dirname
        ),
        new CopyWebpackPlugin([{
            from: './web/src/assets',
            to: 'assets'
        }])
    ],
    output: {
        path: './web/dist',
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js'
    }
};