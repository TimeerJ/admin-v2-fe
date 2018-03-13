const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/app.jsx',
    devServer: {
        port: 8086
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/dist/",
        filename: 'js/app.js'
    },
    module: {
        rules: [
            // react
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env','react']
                    }
                }
            },
            // css
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                     fallback: "style-loader",
                     use: "css-loader"
                })
            },
            // sass
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                     fallback: 'style-loader',
                     use: ['css-loader', 'sass-loader']
                })
            },
            // 图片配置
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            },
            // 字体图标配置
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        // 处理 html 文件
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // 独立 css 文件
        new ExtractTextPlugin("css/[name].css"),
    ]
};