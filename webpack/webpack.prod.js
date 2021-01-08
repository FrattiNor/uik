/* eslint-disable @typescript-eslint/camelcase */
const merge = require('webpack-merge')
const baseConfig = require('./webpack.common')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const path = require('path')
// const PrerenderSPAPlugin = require('prerender-spa-plugin')
const { entry, output, htmlWebpackPlugin, lessRule } = require('./default.const')

const prodConfig = {
    mode: 'production',
    devtool: 'none',
    entry,
    output: {
        filename: 'js/[name].[chunkhash].js',
        publicPath: '/',
        ...output
    },
    module: {
        rules: [
            lessRule({
                styleLoader: MiniCssExtractPlugin.loader,
                cssLoaderModules: {
                    localIdentName: '[hash:base64:6]'
                }
            })
        ]
    },
    plugins: [
        // html模板配置插件
        new HtmlWebpackPlugin({
            ...htmlWebpackPlugin,
            minify: {
                removeComments: true, // 去掉注释
                collapseWhitespace: true, // 去掉多余空白
                removeAttributeQuotes: true // 去掉一些属性的引号，例如id="moo" => id=moo
            }
        }),
        // css单独提取插件
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/[name].[id].[contenthash].css'
        }),
        // 注意一定要在HtmlWebpackPlugin之后引用
        // inline 的name 和你 runtimeChunk 的 name保持一致
        new ScriptExtHtmlWebpackPlugin({
            //`runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
        })
        // webpack打包之后输出文件的大小占比
        // new BundleAnalyzerPlugin(),
        // 预渲染插件
        // new PrerenderSPAPlugin({
        //     routes: ['/', '/doc'],
        //     staticDir: path.join(__dirname, '../dist')
        //     // renderer: new Renderer({
        //     //     renderAfterTime: 50000
        //     // })
        // })
    ],
    optimization: {
        // 性能配置
        minimizer: [
            // 打包时优化压缩css代码
            new OptimizeCssAssetsPlugin(),
            // 打包时优化压缩js代码
            new TerserPlugin()
        ],
        runtimeChunk: true
    },
    stats: {
        entrypoints: false,
        builtAt: false,
        assets: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }
}

module.exports = merge(baseConfig, prodConfig)
