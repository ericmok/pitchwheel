var gulp = require('gulp');
var watch = require('gulp-watch');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var shell = require('gulp-shell');
var browserify = require('gulp-browserify');
var shell = require('gulp-shell');

gulp.task('default', function() {
  
  //gulp.src('./dist').pipe(clean());
  
  gulp.src('js/**/browser.js').
    pipe(browserify({insertGlobals: true})).
    pipe(gulp.dest('./dist/'));
  
});

gulp.task('watch', function() {
  
  gulp.watch('js/**', ['default']);
  
});

gulp.task('cordova', shell.task([
    'cd ../pitchwheelapp/www/; git pull ../../www Cordova:Cordova; cordova run android'
]));