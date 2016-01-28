var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: {
        flight: './src/app.js'
    },
    output: {
        path: './dist',
        filename: "js/app.min.js"
    },
    module: {
        loaders: [{
            //tell webpack to use jsx-loader for all *.jsx files
            test: /\.jsx$/,
            loader: 'jsx-loader?insertPragma=React.DOM&harmony'
        }]
    },
    resolveLoader: {                                                                                
        root: path.join(__dirname, 'node_modules')                                                  
    }, 
    resolve: {
        root: './src',
        alias: {
            _: 'lodash',
            react: path.resolve('./node_modules/react')
        },
        extensions: ['', '.js', '.jsx']
    },
    plugins: [ 
        /*new webpack.optimize.UglifyJsPlugin({minimize: true}),*/
        new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
        new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                _: 'lodash'
        }) 
    ]
};