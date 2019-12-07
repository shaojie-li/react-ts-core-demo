const path = require("path");
const fs = require("fs");
const yargs = require("yargs");

const env = yargs.argv.env || null;
const profile = yargs.argv.profile || false;

function resolve(relativePath) {
    return path.resolve(__dirname, `../${relativePath}`);
}

function webpackJSON() {
    if (env === null) return null;
    const path = resolve(`conf/${env}/webpack.json`);
    if (!fs.existsSync(path)) return null;

    return JSON.parse(fs.readFileSync(path));
}

module.exports = {
    dist: resolve("build/dist"),
    src: resolve("src"),
    theme: resolve("webpack/theme"),
    static: resolve("static"),
    conf: env == null ? resolve("src/conf") : resolve(`conf/${env}`),
    lib: resolve("lib"),
    tsConfig: resolve("webpack/tsconfig.json"),
    tslintConfig: resolve("webpack/tslint.json"),
    stylelintConfig: resolve("webpack/stylelint.json"),
    webpackJSON: webpackJSON(),
    profile: profile,
    https: false,
    port: 7557,
    apiRoot: "http://132.232.149.204:8080",
};
