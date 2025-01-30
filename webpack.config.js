const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        background: './background.ts',
        content: './content.ts',
        popup: './popup/popup.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: './README.md', to: 'README.md' },
                { from: './manifest.json', to: 'manifest.json' },
                { from: './popup/popup.html', to: 'popup/popup.html' },
                { from: './icons/', to: 'icons' }
            ],
        }),
    ],
    mode: 'development',
};
