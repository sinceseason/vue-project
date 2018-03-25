var gulp = require('gulp'),
    sass = require('gulp-sass');

gulp.task('sass', function () {
    return setTimeout(function () {
        return gulp.src('./src/assets/scss/pageContainer.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/assets/css'))
    }, 500)
    
})