const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './client_src/react/index.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: [
                    /server/
                ],
                options: {
                    configFile: "tsconfig.client.json",
                }
            },
            {
                test: /\.css$/,
                exclude: [
                    /server/
                ],
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                exclude: [
                    /server/
                ],
                use: ['file-loader']
            },
            {
                test: /\.html$/,
                exclude: [
                    /server/
                ],
                use: [
                    {
                        loader: "html-loader",
                        //options: { minimize: true }
                    }
                ]
            },
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    output: {
        path: path.join(__dirname, 'public'),
        publicPath: '/',
        filename: 'main.js'
    },
    mode: 'development',
    target: 'web',
    devtool: '#source-map',
    plugins: [
        new HtmlWebPackPlugin({
            template: "./client_src/html/index.html",
            filename: "./index.html",
            excludeChunks: ['/server/']
        }),
    ]
};