var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-clean-css');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var server = require('gulp-develop-server');
require('dotenv').config();

// Register Tasks
gulp.task('start-server', startServer);
gulp.task('browser-sync', liveReload);
// gulp.task('less', compileLess);
gulp.task('watch', ['browser-sync'], watcher);
gulp.task('dev', ['start-server', 'watch']);

// Tasks Function
function startServer () {
    server.listen({
        path: './server.js'
    });
}

function liveReload () {
    var port = process.env.PORT;
    var browserSyncOptions = {
        proxy: 'localhost:' + port,
        browser: 'google chrome'
    };
    browserSync.init(browserSyncOptions);
}

function compileLess () {
    var srcPath = './web/src/assets/less/*.less';
    var destPath = './web/src/assets/css';
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
    gulp.watch('server.js', server.restart);
    gulp.watch('./server/**/*.js', server.restart);
    gulp.watch('./web/dist/index.html', browserSync.reload);
    gulp.watch('./web/dist/*.js', browserSync.reload);
    gulp.watch('./web/dist/*.css', browserSync.reload);    
    // gulp.watch('./web/dist/assets/less/*.less', browserSync.reload);
    // gulp.watch('./web/src/assets/less/*.less', ['less']);
}