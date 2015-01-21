var gulp = require('gulp');
var watch = require('gulp-watch');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');

gulp.task('default', function() {
  
  //gulp.src('./dist').pipe(clean());
  
  gulp.src('js/**/browser.js').
    pipe(browserify({insertGlobals: true})).
    pipe(gulp.dest('./dist/'));
  
});

gulp.task('watch', function() {
  
  gulp.watch('js/**', ['default']);
  
});