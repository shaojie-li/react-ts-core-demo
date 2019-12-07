const webpack = require("webpack");
const env = require("./env");
const autoprefixer = require("autoprefixer");
const ExtractCSSPlugin = require("mini-css-extract-plugin");
const ForkTSCheckerPlugin = require("fork-ts-checker-webpack-plugin");
const HTMLPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const TSImportPlugin = require("ts-import-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const config = {
    mode: "production",
    entry: ["babel-polyfill", `${env.src}/index.tsx`],
    output: {
        path: env.dist,
        filename: "static/js/[name].[chunkhash:8].js",
        publicPath: env.webpackJSON === null ? "/" : env.webpackJSON.publicPath,
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".less"],
        modules: [env.src, "node_modules"],
        alias: {
            conf: env.conf,
            lib: env.lib,
        },
    },
    devtool: "nosources-source-map",
    bail: true,
    optimization: {
        namedModules: true,
        runtimeChunk: "single",
        splitChunks: {
            chunks: "all",
            automaticNameDelimiter: "-",
        },
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                terserOptions: {
                    compress: {
                        pure_funcs: ["console.log", "console.info", "console.debug"],
                    },
                },
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorPluginOptions: {
                    preset: ["default", { discardComments: { removeAll: true } }],
                },
                canPrint: true,
            }),
        ],
    },
    performance: {
        maxEntrypointSize: 2000000,
        maxAssetSize: 1000000,
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
                use: [
                    ExtractCSSPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            importLoaders: 2,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            plugins: () => [
                                autoprefixer({
                                    flexbox: "no-2009",
                                    overrideBrowserslist: ["last 2 version", ">1%", "ios 7", "not ie < 9"],
                                }),
                            ],
                        },
                    },
                    {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true,
                            sourceMap: true,
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
        new ExtractCSSPlugin({
            filename: "static/css/[name].[contenthash:8].css",
        }),
        new ForkTSCheckerPlugin({
            tsconfig: env.tsConfig,
            tslint: env.tslintConfig,
            useTypescriptIncrementalApi: false,
            workers: ForkTSCheckerPlugin.TWO_CPUS_FREE,
        }),
        new StylelintPlugin({
            configFile: env.stylelintConfig,
            context: env.src,
            files: "**/*.less",
            syntax: "less",
        }),
        new HTMLPlugin({
            template: `${env.src}/index.html`,
            minify: {
                collapseBooleanAttributes: true,
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true,
                includeAutoGeneratedTags: false,
                keepClosingSlash: true,
                minifyCSS: true,
                minifyJS: true,
                minifyURLs: true,
                removeAttributeQuotes: true,
                removeComments: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeTagWhitespace: true,
                useShortDoctype: true,
            },
        }),
        new webpack.ProgressPlugin({ profile: env.profile }),
    ],
};

module.exports = config;
