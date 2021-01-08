// {
//     "presets": [
//         [
//             "@babel/preset-env", // babel预设环境，根据目标浏览器配置polyfill
//             {
//                 "modules": false // 关闭模块转换
//             }
//         ],
//         "@babel/preset-typescript", // ts预设环境
//         "@babel/preset-react" // react预设环境
//     ],
//     "plugins": [
//         ["@babel/plugin-proposal-decorators", { "legacy": true }], // 支持class的装饰器语法
//         ["@babel/plugin-proposal-class-properties", { "loose": true }], // 支持es的class语法
//         "@babel/plugin-syntax-dynamic-import", // 支持import动态导入
//         [
//             "@babel/plugin-transform-runtime", // 解决多次引入polyfill问题
//             {
//                 "useESModules": true // 使用esm形式的helper
//             }
//         ]
//     ]
// }

let babelEnv = process.env.BABEL_ENV

console.log('babelEnv', babelEnv)

let loose = false
let modules = false
let useESModules = false

switch (babelEnv) {
    case 'cjs':
        loose = true
        modules = 'cjs'
        useESModules = false
        break
    case 'esm':
        loose = true
        modules = false
        useESModules = true
        break
    case 'umd':
        loose = false
        modules = false
        useESModules = false
        break
    default: 
        loose = true
        modules = 'cjs'
        useESModules = false
        break
}

const presets = [
    [
        '@babel/preset-env',
        {
            loose,
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
            useESModules // 使用esm形式的helper
        }
    ]
]

// const presets = [
//     [
//         '@babel/preset-env', // babel预设环境，根据目标浏览器配置polyfill
//         {
//             modules: false // 关闭模块转换
//         }
//     ],
//     '@babel/preset-typescript', // ts预设环境
//     '@babel/preset-react' // react预设环境
// ]
// const plugins = [
//     ['@babel/plugin-proposal-decorators', { legacy: true }], // 支持class的装饰器语法
//     ['@babel/plugin-proposal-class-properties', { loose: true }], // 支持es的class语法
//     '@babel/plugin-syntax-dynamic-import', // 支持import动态导入
//     [
//         '@babel/plugin-transform-runtime', // 解决多次引入polyfill问题
//         {
//             useESModules: true // 使用esm形式的helper
//         }
//     ]
// ]

module.exports = { presets, plugins }
