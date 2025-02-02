const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { DefinePlugin } = require('webpack');
const fs = require('fs');

class UpdateManifestVersionPlugin {
    apply(compiler) {
        compiler.hooks.afterEmit.tap('UpdateManifestVersionPlugin', (compilation) => {
            const manifestPath = path.resolve(__dirname, 'dist', 'manifest.json');

            // Check if the copied manifest.json exists in the dist folder
            if (fs.existsSync(manifestPath)) {
                const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

                const timestamp = Date.now(); // e.g., 1612325400000
                const newVersion = `${manifest.version}.${Math.floor(timestamp / 1000) % 65536}`;
                manifest.version = newVersion;

                // Write the updated manifest.json back to the dist folder
                fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
                console.log(`Manifest version updated in dist to: ${newVersion}`);
            }
        });
    }
}


module.exports = {
    devtool: 'source-map',
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
                { from: './popup/popup.css', to: 'popup/popup.css' },
                { from: './icons/', to: 'icons' }
            ],
        }),
        new UpdateManifestVersionPlugin(),
    ],
    mode: 'development',
};
