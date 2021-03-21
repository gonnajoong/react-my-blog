const path = require('path');
const webpack = require('webpack');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

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
                'babel-loader'
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
        })
    ]
};

module.exports = config;