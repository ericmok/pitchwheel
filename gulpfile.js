var gulp = require('gulp');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');

gulp.task('default', function() {
  
  gulp.src('js/index.js').
    pipe(browserify({insertGlobals: true})).
    pipe(rename({
      basename: 'lib'
    })).
    pipe(gulp.dest('./browser/'));
  
});

gulp.task('watch', function() {
  
  gulp.watch('js/**', ['default']);
  
});