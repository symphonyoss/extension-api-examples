var path = require("path"),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        controller: path.resolve(__dirname, "./src/javascript/controller.js"),
        app: path.resolve(__dirname, "./src/javascript/app.js")
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css"}
        ]
    },
    headers: {

    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "controller.html",
            template: "./src/html/controller.html",
            inject: false
        }),
        new HtmlWebpackPlugin({
            filename: "app.html",
            template: "./src/html/app.html",
            inject: false
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 4000,
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    }
};
