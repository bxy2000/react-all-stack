const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'react-all-stack-webpack.bundle.js'
    },
    mode: 'development',
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }]
    },
    devServer: {
        hot: true, // 热替换
        contentBase: path.join(__dirname, 'dist'), // server文件的根目录
        compress: true, // 开启gzip
        port: 8080 // 端口
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // HMR允许在运行时更新各种模块，而无需进行完全刷新
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: path.resolve(__dirname, "dist/index.html")
        })
    ]
};
