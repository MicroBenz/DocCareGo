var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var server = require('gulp-develop-server');
require('dotenv').config();

// Register Tasks
gulp.task('start-server', startServer);
gulp.task('browser-sync', liveReload);
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

function watcher () {
    gulp.watch('server.js', server.restart);    
    gulp.watch('./web/dist/index.html', browserSync.reload);
    gulp.watch('./web/dist/*.js', browserSync.reload);    
}