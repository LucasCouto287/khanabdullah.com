const gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    prefix = require('gulp-autoprefixer');

// task to compile sass files on save and output a minified CSS file
gulp.task('sass', () => {
    return gulp.src('public/css/*.sass')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename((path) => {path.basename += ".min"}))
        .pipe(prefix())
        .pipe(gulp.dest('public/css/'));
});

// gulp watch task to watch for file changes
gulp.task('watch', () => {
  gulp.watch('public/css/*.sass', ['sass']);
});

// default gulp task - is executed automatically on `gulp` command
gulp.task('default', function() {
    // run the main tasks - including the watch task
    gulp.start('sass', 'watch');
});