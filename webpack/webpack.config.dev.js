const webpack = require("webpack");
const env = require("./env");
const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const ForkTSCheckerPlugin = require("fork-ts-checker-webpack-plugin");
const TSImportPlugin = require("ts-import-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const config = {
    mode: "development",
    entry: ["babel-polyfill", `webpack-dev-server/client?http://0.0.0.0:${env.port}`, "webpack/hot/dev-server", `${env.src}/index.tsx`],
    output: {
        filename: "static/js/[name].js",
        publicPath: "/",
        pathinfo: false,
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".less"],
        modules: [env.src, "node_modules"],
        alias: {
            conf: env.conf,
            lib: env.lib,
        },
    },
    devtool: "cheap-module-eval-source-map",
    optimization: {
        splitChunks: {
            automaticNameDelimiter: "-",
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                include: env.src,
                loader: "ts-loader",
                options: {
                    configFile: env.tsConfig,
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [TSImportPlugin({ libraryName: "antd", libraryDirectory: "es", style: true })],
                    }),
                },
            },
            {
                test: /\.(js|jsx|mjs)$/,
                include: env.src,
                loader: "babel-loader",
                options: {
                    plugins: ["lodash"],
                    presets: ["es2015", "react", ["env", { modules: false, targets: { node: 4 } }]],
                },
            },
            {
                test: /\.(css|less)$/,
                exclude: path.resolve(__dirname, "node_modules"),
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "less-loader",
                        options: {
                            modifyVars: {
                                hack: `true; @import "${env.src}/assets/styles/theme.less";`,
                            },
                            javascriptEnabled: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: "url-loader",
                query: {
                    limit: 1024,
                    name: "static/img/[name].[hash:8].[ext]",
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                loader: "file-loader",
                options: {
                    name: "static/font/[name].[hash:8].[ext]",
                },
            },
        ],
    },
    plugins: [
        new LodashModuleReplacementPlugin({
            collections: true,
            paths: true,
        }),
        new StylelintPlugin({
            configFile: env.stylelintConfig,
            context: env.src,
            files: "**/*.less",
            syntax: "less",
        }),
        new ForkTSCheckerPlugin({
            tsconfig: env.tsConfig,
            tslint: env.tslintConfig,
        }),
        new HTMLPlugin({
            template: `${env.src}/index.html`,
            favicon: `${env.static}/favicon.ico`,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProgressPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [`Your application is running here: ${env.https ? "https" : "http"}://localhost:${env.port}`],
            },
            onErrors: () => console.error("error"),
            clearConsole: true,
        }),
        new CopyWebpackPlugin([
            {
                from: `${env.theme}/styles/custom-theme.less`,
                to: `${env.static}/custom-theme.less`,
            },
        ]),
    ],
};

module.exports = config;
