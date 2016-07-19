var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync').create();

gulp.task('sass', function() {
    return gulp.src('./sass/**/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('watch', function() {
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch("./**/*.html", ['reload']);
    gulp.watch("./js/**/*.js", ['reload']);
});

gulp.task('reload', function() {
    browserSync.reload();
});


gulp.task('serve', ['watch'], function() {

    browserSync.init({
        notify: false,
		server: {
			baseDir: "./"
		}
    });

});

gulp.task('default', ['serve']);
