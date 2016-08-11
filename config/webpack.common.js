const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    context: path.join(__dirname, '..', 'src'),
    entry: {
        home: './main.js',
        features: './pages/features.js'
    },
    output: {
        path: path.join(__dirname, '..', 'dist'),
        filename: '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'KMS Techcon 2016 - Webpack Demo',
            template: 'home-template.html',
            filename: 'index.html',
            inject: 'body',
            minify: {
                collapseWhitespace: false,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true
            }
        })
    ],
    resolve: {
        root: [
            path.resolve('./src')
        ],
        modulesDirectories: ['./node_modules'],
        extensions: ['', '.js', '.scss', '.css']
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.scss$/, loaders: ['style', 'css?sourceMap', 'sass?sourceMap']},
            {test: /\.html$/, loader: 'html', exclude: /.*-template\.html/},
            {test: /.*-template\.html/, loader: 'ejs'},
            { test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports?jQuery=jquery' },
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
            // helps to load bootstrap's css.
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&minetype=application/font-woff'
            },
            {
                test: /\.woff2$/,
                loader: 'url?limit=10000&minetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&minetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&minetype=image/svg+xml'
            }
        ]
    }
};