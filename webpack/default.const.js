const path = require('path')

// dev 和 prod 一些共同的参数
// 便于修改

// 入口
const entry = path.join(__dirname, '../src/index.tsx')

// output
const output = {
    path: path.join(__dirname, '../docs')
}

// html
const htmlWebpackPlugin = {
    filename: 'index.html',
    template: 'public/index.html',
    inject: true,
    favicon: 'public/favicon.ico'
}

// less
const lessRule = ({ styleLoader, cssLoaderModules }) => ({
    test: /\.less$/, // 正则匹配less, 样式文件匹配 非依赖文件夹，
    use: [
        // loader生效是从下往上的
        styleLoader,
        {
            loader: 'css-loader',
            options: {
                modules: cssLoaderModules
            }
        },
        'postcss-loader', // postcss
        'less-loader'
    ],
    include: path.join(__dirname, '../src')
})


module.exports = { entry, output, htmlWebpackPlugin, lessRule }
