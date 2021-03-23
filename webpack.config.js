const path = require('path');
const webpack = require('webpack');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {test: /\.scss$/, use: [
                {
                    loader: miniCssExtractPlugin.loader
                },
                "css-loader",
                "sass-loader"
            ]},
            {test: /\.css$/, use: [
                'style-loader',
                'css-loader'
            ]},
            {test: /\.(png|woff|woff2|eot|ttf|svg)$/, use: [
                    'url-loader'
                ]},
            {test: /\.(js|jsx)$/, exclude: /node_modules/, use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-react'
                        ]
                    }
                },
            ]}
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new miniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].css'
        }),
        new webpack.DefinePlugin({
            '__REACT_DEVTOOLS_GLOBAL_HOOK__': '({ isDisabled: true })'
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: './index.html'
        })
        // 추가중
    ]
};

module.exports = config;