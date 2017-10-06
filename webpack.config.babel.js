import webpack from 'webpack';
import path from 'path';

export default {
     entry: './src/js/app.js',
     output: {
         path: path.resolve(__dirname, 'public/js'),
         filename: 'app.js'
     },
     watch: true,
     module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        plugins: [
                            'transform-runtime',
                            'transform-object-rest-spread'
                        ],
                    },
                },
            },
        ],
     },
 };