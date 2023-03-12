const path = require('path');
const BrotliPlugin = require('brotli-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    entry: './public/src/',
    plugins: [
        new BrotliPlugin({
            asset: './dist/js[file].br',
            test: /\.(js)$/
        }),
        new CompressionPlugin({
            test: /\.js(\?.*)?$/i,
        }),
    ],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public/dist/js'),
    },
    // Loaders  
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 50
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            }
        ]
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 200,
        poll: 1000,
    },
};