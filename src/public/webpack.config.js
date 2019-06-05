// The individuals interface
// Copyright (C) 2017 Institut Pasteur
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

// =========================================================================
// Webpack configuration
// =========================================================================

const path = require('path');

const { DefinePlugin } = require('webpack');
const { NormalModuleReplacementPlugin } = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = require('./config/env');
const appName = process.env.npm_package_name;

// =========================================================================

module.exports = {
    mode: config.APP_ENV === 'production' ? 'production' : 'development',
    watch: false,
    watchOptions: {
        ignored: /node_modules/
    },
    context: path.resolve(__dirname),
    entry: [
        './index.js'
    ],
    output: {
        path: path.resolve(__dirname, '../../dist'),
        publicPath: '/',
        filename: appName + '.js'
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true
            }),
            new OptimizeCSSAssetsPlugin()
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../../dist'),
        index: appName + '.html',
        port: 8888,
        stats: {
            assetsSort: '!size',
            children: false,
            modules: false
        },
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    },
    stats: {
        assetsSort: '!size',
        children: false,
        modules: false
    },
    plugins: [
        new VueLoaderPlugin(),
        new DefinePlugin(config),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: appName + '.css',
            chunkFilename: '[name].css'
        }),
        new HtmlWebpackPlugin({
            filename: appName + '.html',
            template: './index.html'
        }),
        // Replace the default Chinese language with english
        new NormalModuleReplacementPlugin(/element-ui[\/\\]lib[\/\\]locale[\/\\]lang[\/\\]zh-CN/, 'element-ui/lib/locale/lang/en')
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/',
                        limit: 10000
                    }
                }]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/'
                    }
                }
            }
        ]
    }
};
