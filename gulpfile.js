var gulp = require('gulp');
var watch = require('gulp-watch');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var shell = require('gulp-shell');
var browserify = require('gulp-browserify');
var wrench = require('wrench');

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
    'echo "++Cordova Build"',
    'git checkout Cordova',
    'git add --all',
    'git commit -m "sync"',
    'echo "++Changed directory"',
    'cd ../pitchwheelapp/www/; git pull ../../www Cordova:Cordova; cordova run android'
]));