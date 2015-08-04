var gulp = require('gulp'),
    babel = require('gulp-babel'),
    watch = require('gulp-watch'),
    gutil = require('gulp-util'),
    jsdoc = require('gulp-jsdoc'),
    gls = require('gulp-live-server');

gulp.task('build', function () {
    return gulp.src('api/**/*.js')
    .pipe(babel()).on('error', function(err) {
        gutil.log(gutil.colors.red(err.message));
        gutil.beep();
        this.emit('end');
    })
    .pipe(gulp.dest('dist'));
});

gulp.task('server', function() {
    var server = gls.new('./dist/app.js');
    server.start().then(function(result) {
        console.log('Starting server', result);
    });

    gulp.watch('dist/**/*.js', function() {
        server.start()
    });
});

gulp.task('watch', function () {
    gulp.watch('api/**/*.js', ['build']);
});

gulp.task('jsdoc', function () {
    gulp.src(["dist/**/*.js"])
    .pipe(jsdoc('./jsdoc'))
});

gulp.task('default', ['server', 'watch']);
gulp.task('doc', ['build', 'jsdoc']);
