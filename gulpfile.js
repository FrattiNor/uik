const gulp = require('gulp')
const babel = require('gulp-babel')
const less = require('gulp-less')
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')

const paths = {
    dest: {
        cjs: 'lib', // commonjs 文件存放的目录名
        esm: 'esm', // ES module 文件存放的目录名
        umd: 'umd' // umd文件存放的目录名
    },
    styles: ['components/**/*.less'], // 样式文件路径
    cssStyles: ['components/**/*.less', '!components/**/theme.less'], // css 样式文件路径
    scripts: [
        'components/**/*.{ts,tsx}',
        '!components/_types/*',
        '!components/**/types.ts',
        '!components/**/__doc__/**',
        '!components/**/__tests__/*.{ts,tsx}'
    ] // 文件路径
}

const { dest, styles, cssStyles, scripts } = paths

/**
 * 生成css文件
 */
// function less2cssByEnv(env) {
//     return function less2css () {
//         return gulp
//             .src(cssStyles)
//             .pipe(less()) // 处理less文件
//             .pipe(autoprefixer()) // 根据browserslistrc增加前缀
//             .pipe(cssnano({ zindex: false, reduceIdents: false })) // 压缩
//             .pipe(gulp.dest(dest[env]))
//     }
// }

/**
 * 拷贝less文件
 */
function copyLessByEnv(env) {
    return function copyLess() {
        return gulp.src(styles).pipe(gulp.dest(dest[env]))
    }
}

/**
 * 编译脚本文件
 * @param {string} babelEnv babel环境变量
 * @param {string} destDir 目标目录
 */
function compileScripts(babelEnv, destDir) {
    // 设置环境变量
    process.env.BABEL_ENV = babelEnv

    return gulp
        .src(scripts)
        .pipe(babel()) // 使用gulp-babel处理
        .pipe(gulp.dest(destDir))
}

/**
 * 编译cjs umd esm
 */
function compileByEnv(env) {
    return function compile() {
        return compileScripts(env, dest[env])
    }
}

// // 串行执行编译脚本任务（cjs,esm） 避免环境变量影响
// const buildScripts = gulp.series(compileCJS, compileESM)

// 整体并行执行任务
const cjsBuild = gulp.parallel(compileByEnv('cjs'), copyLessByEnv('cjs'))
const esmBuild = gulp.parallel(compileByEnv('esm'), copyLessByEnv('esm'))
const umdBuild = gulp.parallel(compileByEnv('umd'), copyLessByEnv('umd'))

exports.cjs = cjsBuild
exports.esm = esmBuild
exports.umd = umdBuild
exports.default = cjsBuild
