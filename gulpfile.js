var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-clean-css');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
var rename = require('gulp-rename');
var server = require('gulp-develop-server');
require('dotenv').config();

// Register Tasks
gulp.task('start-server', startServer);
gulp.task('browser-sync', liveReload);
gulp.task('less', compileLess);
gulp.task('watch', ['browser-sync'], watcher);
gulp.task('build', ['less']);
gulp.task('dev', ['start-server', 'watch', 'less']);

// Tasks Function
function startServer () {
    server.listen({
        path: './server.js'
    });
}

function liveReload () {
    var port = process.env.PORT ? process.env.PORT : 8888;
    var browserSyncOptions = {
        proxy: 'localhost:' + port,
        browser: 'google chrome'
    };
    browserSync.init(browserSyncOptions);
}

function compileLess () {
    var srcPath = './public/less/**/*.less';
    var destPath = './public/css';
    return gulp.src(srcPath)
        .pipe(plumber())
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(gulp.dest(destPath))
        .pipe(minifyCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(destPath));
}

function watcher () {
    gulp.watch('./public/less/**/*.less', ['less', browserSync.reload]);
    gulp.watch(['./public/app/**/*.html', './public/app/**/*.js'], browserSync.reload);
    gulp.watch('./public/index.html', browserSync.reload);
    gulp.watch('./app/**/*.js', server.restart);
    gulp.watch('server.js', server.restart);
}