// node path模块
const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

process.env.BABEL_ENV = 'esm'

module.exports = {
    // 模块
    module: {
        rules: [
            {
                test: /(\.d)?\.(j|t)sx?$/, // 匹配js，ts
                use: ['babel-loader']
            },
            {
                test: /\.css$/, // 正则匹配css, 样式文件匹配 非依赖文件夹，
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/, // 正则匹配css, 样式文件匹配 非依赖文件夹，
                use: ['style-loader', 'css-loader', 'less-loader'],
                include: [
                    path.join(__dirname, '../components'),
                    path.join(__dirname, '../lib'),
                    path.join(__dirname, '../umd'),
                    path.join(__dirname, '../esm')
                ]
            },
            {
                test: /\.md$/,
                use: ['html-loader', 'markdown-loader']
            },
            {
                test: /\.mdx$/,
                use: ['babel-loader', '@mdx-js/loader']
            }
            // {
            //     test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, // 匹配图片文件
            //     use: [
            //         {
            //             loader: 'url-loader',
            //             options: {
            //                 //1024 == 1kb
            //                 //小于10kb时打包成base64编码的图片否则单独打包成图片
            //                 limit: 10240,
            //                 name: path.join('img/[name].[hash:7].[ext]')
            //             }
            //         }
            //     ]
            // },
            // {
            //     test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // 匹配文字文件
            //     use: [
            //         {
            //             loader: 'url-loader',
            //             options: {
            //                 limit: 10240,
            //                 name: path.join('font/[name].[hash:7].[ext]')
            //             }
            //         }
            //     ]
            // },
        ]
    },
    // 解析
    resolve: {
        // 自动解析确定的扩展,import的时候可以不带后缀
        extensions: ['.ts', '.tsx', '.js', '.jsx','.d.ts'],
        // 别名
        alias: {
            '@': path.join(__dirname, '../src'),
            'uik/lib': path.join(__dirname, '../components'),
            uik: path.join(__dirname, '../components')
        }
    },
    performance: {
        // 性能提示，可以提示过大文件
        hints: 'warning', // 性能提示开关 false | "error" | "warning"
        maxAssetSize: 102400, // 生成的文件最大限制 整数类型（以字节为单位）(100kb)
        maxEntrypointSize: 102400, // 引入的文件最大限制 整数类型（以字节为单位）(100kb)
        assetFilter: function (assetFilename) {
            // 提供资源文件名的断言函数
            return /\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetFilename)
        }
    },
    plugins: [
        // 打包📦进度条
        new ProgressBarPlugin()
    ]
}
