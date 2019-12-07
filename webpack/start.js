const fs = require("fs");
const chalk = require("chalk");
const webpack = require("webpack");
const env = require("./env");
const webpackConfig = require("./webpack.config.dev");
const DevServer = require("webpack-dev-server");
const { generateAntdTheme } = require("./theme/generate.antd.theme");

function devServer(compiler) {
    return new DevServer(compiler, {
        contentBase: env.static,
        https: false,
        historyApiFallback: true,
        disableHostCheck: true,
        hot: true,
        compress: true,
        overlay: {
            warnings: true,
            errors: true,
        },
        quiet: true,
        stats: {
            colors: "errors-only",
        },
        host: "0.0.0.0",
        port: env.port,
        proxy: [
            {
                context: ["/app/mock/20/"],
                target: "http://132.232.149.204:8080",
                secure: false,
                changeOrigin: true,
            },
        ],
    });
}

function copyStatic() {
    console.info(chalk`{green.bold [task]} {white.bold copy custom-theme.less file to static folder}`);
    fs.copyFileSync(`${env.theme}/styles/custom-theme.less`, `${env.static}/custom-theme.less`);
}

function start() {
    console.info(chalk`{white.bold [env]} conf=${env.conf}`);

    generateAntdTheme();

    copyStatic();

    const compiler = webpack(webpackConfig);
    const server = devServer(compiler);
    server.listen(env.port, "0.0.0.0", error => {
        if (error) {
            console.error(error);
            process.exit(1);
        }
        console.info(chalk`starting dev server on {green http://localhost:${env.port}/} \n`);
        return null;
    });

    ["SIGINT", "SIGTERM"].forEach(signal => {
        process.on(signal, () => {
            server.close();
            process.exit();
        });
    });
}

start();
