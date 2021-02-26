let babelEnv = process.env.BABEL_ENV || 'cjs'

let modules
let useESModules

switch (babelEnv) {
    case 'cjs':
        modules = 'cjs'
        useESModules = false
        break
    case 'esm':
        modules = false
        useESModules = true
        break
    case 'umd':
        modules = 'umd'
        useESModules = false
        break
    default:
        modules = 'cjs'
        useESModules = false
        break
}

const presets = [
    [
        '@babel/preset-env',
        {
            modules
        }
    ], // babel预设环境，根据目标浏览器配置polyfill
    '@babel/preset-typescript', // ts预设环境
    '@babel/preset-react' // react预设环境
]

const plugins = [
    ['@babel/plugin-proposal-decorators', { legacy: true }], // 支持class的装饰器语法
    ['@babel/plugin-proposal-class-properties', { loose: true }], // 支持es的class语法
    '@babel/plugin-syntax-dynamic-import', // 支持import动态导入
    [
        '@babel/plugin-transform-runtime', // 解决多次引入polyfill问题
        {
            corejs: 3,
            useESModules // 使用esm形式的helper
        }
    ]
]

module.exports = { presets, plugins }
