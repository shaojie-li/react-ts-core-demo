const path = require("path");
const { generateTheme } = require("antd-theme-generator");

const options = {
    antDir: path.join(__dirname, "../../node_modules/antd"),
    stylesDir: path.join(__dirname, "./styles"),
    varFile: path.join(__dirname, "./styles/variables.less"),
    mainLessFile: path.join(__dirname, "./styles/index.less"),
    outputFilePath: path.join(__dirname, "../../static/color.less"),
};

module.exports = {
    generateAntdTheme: function() {
        generateTheme(options)
            .then(() => {
                console.log("Theme generated successfully");
            })
            .catch(error => {
                // console.log("Error", error);
            });
    },
};
