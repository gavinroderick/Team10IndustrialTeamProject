var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('js', function(){
  return gulp.src('public/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/js/'))
});

gulp.task('default', gulp.series('js', function(done) { 
  console.log("Glug glug, gulp is running");
  done();
}));