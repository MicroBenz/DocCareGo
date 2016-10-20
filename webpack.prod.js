var webpackMerge = require('webpack-merge'); 
var commonConfig = require('./webpack.config');

var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var WebpackMd5Hash = require('webpack-md5-hash');

module.exports = function () {
    return webpackMerge(commonConfig, {
        output: {
            path: './web/prod',
            filename: '[name].[chunkhash].bundle.js',
            sourceMapFilename: '[name].[chunkhash].bundle.map',
            chunkFilename: '[id].[chunkhash].chunk.js'
        },
        plugins: [
            new WebpackMd5Hash(),
            new UglifyJsPlugin({
                beautify: false, //prod
                mangle: {
                    screw_ie8: true,
                    keep_fnames: true
                }, //prod
                compress: {
                    screw_ie8: true
                }, //prod
                comments: false //prod
            }),
        ]
    });
};