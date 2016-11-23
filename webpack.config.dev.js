var path = require('path');
var webpack = require('webpack');
var outputPath = path.join(__dirname, 'public', 'assets');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var parseEntry = require('./middleware/ParsePlugin').parseEntry;
var enter = parseEntry(path.join(__dirname, "source"), {
    ignore: ['lib', 'remotes']
});

module.exports = {
    name: 'client',
    entry: Object.assign({common: ['react', 'react-dom', 'react-datetime', 'moment', 'el-table']}, enter),
    output: {
        path: outputPath,
        filename: '[name].[hash].js',
        publicPath: '/assets'
    },
    resolve: {
        alias: {
            'react': path.join(__dirname, 'node_modules', 'react'),
            'react-dom': path.join(__dirname, 'node_modules', 'react-dom')
        }
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.(js)?$/,
            exclude: /node_modules/,
            loader: "babel"
        }, {
            test: /\.(less|css)?$/,
            loader: ExtractTextPlugin.extract(['css', 'less'])
        }, {
            test: /\.(png|jpg|jpeg|gif)$/,
            loader: "url-loader?limit=3000&name=images/[name].[ext]"
        }, {
            test: /\.(svg|ttf|eot|svg|woff(\(?2\)?)?)(\?[a-zA-Z_0-9.=&]*)?(#[a-zA-Z_0-9.=&]*)?$/,
            loader: "file-loader?name=fonts/[name].[ext]"
        }, {
            test: /\.(json)?$/,
            loader: "json-loader"
        }]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin('common', 'common.[hash].js'),
        new ExtractTextPlugin("[name].[hash].css", {
            allChunks: true
        })
    ]
};