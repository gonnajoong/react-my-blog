const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const inject = require('gulp-inject');
const rename = require('gulp-rename');
const webpackStream = require('webpack-stream');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const injectString = require('gulp-inject-string');
const args = require('get-gulp-args')();

const ENV_DEVELOPMENT = 'development';
const ENV_PRODUCTION = 'production';
const now = new Date().getTime();

if (!args.env) {
    args.env = process.env.NODE_ENV = ENV_DEVELOPMENT;
} else {
    process.env.NODE_ENV = args.env;
}
const distPath = './dist';
if (!fs.existsSync(distPath)) fs.mkdirSync(distPath);

const modulePages = fs.readdirSync(path.join(__dirname, './src/pages/'));
modulePages.forEach((page) => {
    if (!fs.existsSync(`${distPath}/${page}.js`)) fs.writeFileSync(`${distPath}/${page}.js`, '');
    if (!fs.existsSync(`${distPath}/${page}.css`)) fs.writeFileSync(`${distPath}/${page}.css`, '');
});

console.log("NODE_ENV=", process.env.NODE_ENV);
console.log("v=", now);

// gulp.task('build', ['webpack-watch']);
gulp.task('build', gulp.series('webpack-watch'));

modulePages.forEach((page, index) => {
    gulp.task(`inject-${page}`, returnNextTask(index, 'inject'), () => {
        console.log(`inject-${page}`);
        const path = './server/views/';
        const array = [`./dist/${page}.js`, `./dist/${page}.css`];
        return gulp.src(path + `${page}-origin.ejs`)
            .pipe(inject(gulp.src(array, {read: false})))
            .pipe(rename(`${page}-render.ejs`))
            .pipe(gulp.dest(path));
    });
});

modulePages.forEach((page, index) => {
    gulp.task(`inject-string-${page}`, returnNextTask(index, 'inject-string', 'inject'), () => {
        console.log(`inject-string-${page}`);
        const path = `./server/views/${page}-render.ejs`;
        return gulp.src(path, {base: './'})
            .pipe(injectString.replace('script src', 'script type="text/javascript" src'))
            .pipe(injectString.replace(`${page}.js`, `${page}.js?v=${now}`))
            .pipe(injectString.replace(`${page}.css`, `${page}.css?v=${now}`))
            .pipe(gulp.dest('./'));
    });
});

gulp.task('webpack-watch', gulp.series('inject-string-' + modulePages[0]), () => {
    console.log('webpack-watch');
    let webpackConfig = require('./webpack.config');

    if (process.env.NODE_ENV === ENV_DEVELOPMENT) {
        webpackConfig.watch = true;
    }

    webpackConfig.entry = {};

    modulePages.forEach(page => {
        webpackConfig.entry[page] = './client/pages/' + page + '/module.js';
    });

    return gulp.src('')
        .pipe(webpackStream(webpackConfig))
        .pipe(gulp.dest('dist'));
});

function returnNextTask(currentIndex, key, endKey) {
    if (currentIndex === modulePages.length - 1) {
        return endKey ? [endKey + '-' + modulePages[0]] : [];
    } else {
        return [key + '-' + modulePages[currentIndex + 1]];
    }
}
