var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        'polyfills': './web/src/polyfills.ts',
        'vendor': './web/src/vendor.ts',
        'main': './web/src/main.ts'
    },
    resolve: {
        extensions: ['', '.ts', '.js', '.css', '.less'],
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
            },
            {
                test: /\.html$/,
                loader: 'raw-loader',
                exclude: './web/src/index.html'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader:  "css-loader"
                })
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: ['css-loader', 'less-loader']
                })
            },
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                loader: 'url-loader'
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new ExtractTextPlugin({
            filename: 'styles.css'
        }),
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
        new CopyWebpackPlugin(
            [
                {
                    from: './web/src/assets/img',
                    to: 'assets/img'
                }
            ]
        )
    ],
    output: {
        path: './web/dist',
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js'
    }
};