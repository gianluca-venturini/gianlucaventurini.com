const path = require('path');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PROJECTS = (process.env.PROJECTS || '').split(',');
const IS_WATCH = !!process.env.WATCH;

const resolveConfig = {
    symlinks: false,
    extensions: ['.js', '.json', '.ts', '.tsx']
};

const includeDirs = ['src'].map(x => path.resolve(__dirname, x));

const moduleConfig = (tscOptions = {}) => ({
    rules: [
        {
            test: /\.(ts|tsx)$/,
            include: includeDirs,
            use: [
                {
                    loader: 'ts-loader',
                    options: {
                        compilerOptions: {
                            ...tscOptions
                        }
                    }
                }
            ]
        }
    ]
});

const htmlPlugin = new HtmlWebpackPlugin({template: './src/frontend/index.html'});

const frontendBuild = (name, entryFile, outputFile) => ({
    name: name,
    entry: entryFile,
    output: {
        path: __dirname + '/dist/www',
        filename: outputFile
    },
    module: moduleConfig({ target: 'ES6', module: 'ES6' }),
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    resolve: resolveConfig,
    watch: IS_WATCH,
    devServer: {
        historyApiFallback: true, // replace 404 page with index.html for client-side routing
        port: 8000,
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                secure: false
            }
        }
    },
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows to avoid bundling all of your
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    plugins: [htmlPlugin]
});

const availableProjects = {

    frontend: frontendBuild('frontend', './src/frontend/main.ts', 'bundle.js'),

};

module.exports = PROJECTS.map(p => availableProjects[p]);
