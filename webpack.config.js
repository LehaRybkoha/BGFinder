const path = require("path");
const webpack = require("webpack");
const compiler = require("vue-template-compiler");
module.exports = {
    entry: {
        main: "./src/js/index.js"
    },
    
    output: {
        filename: "[name].js"
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: require.resolve("babel-loader"),
                    query: {
                        presets: [
                            ["@babel/preset-env", { modules: false }]
                        ]
                    }
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ],
    },

    plugins: [
        new webpack.ProvidePlugin({
         $: 'jquery',
        '$': 'jquery',
        jquery: 'jquery',
        jQuery: 'jquery',
      }),
    ],
    

    resolve: {
        alias: {
            "%modules%": path.resolve(__dirname, "src/blocks/modules"),
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    }
};