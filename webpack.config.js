const Path = require('path');
const Webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const srcPath = Path.resolve(__dirname, 'src');
const distPath = Path.resolve(__dirname, 'dist');

const APP_ENV = process.env.APP_ENV || 'dev'; //console.log("ENV: "+APP_ENV);

let config = {
    entry: `${srcPath}/index.js`,
    output: {
        path: distPath,
        filename: APP_ENV === "prod" ? 'app.bundle.min.js' : 'app.bundle.js'
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
    plugins: APP_ENV === "prod"
        ? [
            new HtmlWebpackPlugin({
                title: 'Todo App',
                minify: {
                    collapseWhitespace: true
                },
                hash: true,
                template: 'index.html',
            }),

            new Webpack.optimize.UglifyJsPlugin({
                compress: {warnings: false}
            }),

            new ExtractTextPlugin({
                publicPath: `${distPath}`,
                filename: 'app.bundle.min.css',
                allChunks: true
            }),
        ] : [
            new DashboardPlugin(),
            new HtmlWebpackPlugin({
                title: 'Todo App',
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