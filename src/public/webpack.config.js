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
const { ProvidePlugin } =require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
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
        filename: appName + '.js',
        chunkFilename: '[name].js'
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true
            }),
            new OptimizeCSSAssetsPlugin()
        ],
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../../dist'),
        index: appName + '.html',
        port: 8888,
        proxy: {
            '/': 'http://localhost:3000'
        },
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

        // Generate global constants to be used by the front-end
        new DefinePlugin({
            APP_NAME: JSON.stringify(config.APP_NAME),
            APP_PUBLIC_PATH: JSON.stringify(config.APP_PUBLIC_PATH),
            APP_VERSION: JSON.stringify(config.APP_VERSION),
            APP_DESCRIPTION: JSON.stringify(config.APP_DESCRIPTION),
            APP_CONTACT: JSON.stringify(config.APP_CONTACT)
        }),

        // Remove dist folder after each reload to avoid issues
        new CleanWebpackPlugin(),

        // Put the CSS in a separate chunk
        new MiniCssExtractPlugin({
            filename: appName + '.css',
            chunkFilename: '[name].css'
        }),

        // Generate the main index.html page
        new HtmlWebpackPlugin({
            filename: appName + '.html',
            template: './index.html',
            favicon: 'app/images/favicon.png'
        }),

        // Raw copy of the brainBrowser files and workers
        new CopyPlugin([
            {
                from: 'app/lib/',
                to: path.resolve(__dirname, '../../dist/lib'),
                ignore: [
                    'brainbrowser.surface-viewer.min.js'
                ]
            }
        ]),

        // Replace the default Chinese language with english
        new NormalModuleReplacementPlugin(/element-ui[\/\\]lib[\/\\]locale[\/\\]lang[\/\\]zh-CN/, 'element-ui/lib/locale/lang/en'),

        // Inject introJS
        new ProvidePlugin({
            introJs: [ 'intro.js' ]
        })
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
