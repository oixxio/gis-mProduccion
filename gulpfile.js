// grab all our packages
var gulp = require('gulp'),
    browserSync = require('browser-sync').create();

// create a task to serve the app
gulp.task('serve', function() {
    // start the proxy for apache
    browserSync.init({
        proxy: "127.0.0.1/gis-mProduccion-project/gis-mProduccion-app"
    });
    gulp.watch("gis-mProduccion-app/**/*.html").on('change',browserSync.reload);
    gulp.watch("gis-mProduccion-app/**/*.js").on('change',browserSync.reload);
    gulp.watch("gis-mProduccion-app/**/*.css").on('change',browserSync.reload);
    gulp.watch("gis-mProduccion-app/**/*.php").on('change',browserSync.reload);
    gulp.watch("app/*.js").on('change', reload);
});