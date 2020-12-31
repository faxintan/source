const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './index.js',
    output: {
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [ /node_modules/ ],
                use: [
                    {
                        loader: 'babel-loader',
                        options: { presets: [ '@babel/preset-env' ] },
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ filename: 'index.html' }),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 9000
    }
}
