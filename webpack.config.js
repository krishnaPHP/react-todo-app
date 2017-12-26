const Path = require('path');
const Webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const srcPath = Path.resolve(__dirname, 'src');
const distPath = Path.resolve(__dirname, 'dist');

let config = {
    entry: `${srcPath}/index.js`,
    output: {
        path: distPath,
        filename: 'app.bundle.js'
    },
    devServer: {
        contentBase: distPath,
        compress: true,
        open: true
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.css', '*']
    },
    module: {
        rules: [{
            test: /\.(js|jsx)?$/,
            loader: 'babel-loader',
            options: {
                presets: ['react', 'es2015']
            },
            exclude: /(node_modules|bower_components)/
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader']
            })
        }]
    },
    plugins: [

        new DashboardPlugin(),

        new HtmlWebpackPlugin({
            title: 'Todo App',
            // minify: {
            //     collapseWhitespace: true
            // },
            hash: true,
            template: 'index.html',
        }),

        new ExtractTextPlugin({
            publicPath: `${distPath}`,
            filename: 'app.bundle.css',
            allChunks: true
        }),
    ]
};

module.exports = config;