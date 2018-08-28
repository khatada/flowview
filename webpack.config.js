"use strict"

module.exports = [{
    entry: {
      "flowview": "./src/flowview.tsx",
      "example": "./example/index.tsx"
    },
    output: {
        path: __dirname,
        filename: "./build/[name].js",
    },
    module: {
      rules: [
        { test: /\.ts(x?)$/, use: "ts-loader" }
      ]
    },
    devtool: "source-map",
    target: "web",
    resolve: {
      extensions: [".js", ".ts" ,".tsx"]
    },
    plugins: [
    ]
}];
