var gulp = require('gulp');
var concat = require('gulp-concat');
var del = require('del');
var vinyl = require('vinyl-paths');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('js', function(){
  return gulp.src('public/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/js/min/'))
});

gulp.task('delete', function(){
	return gulp.src('public/js/min/*')
		.pipe(vinyl(del))
		.pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series('delete','js', function(done) { 
  console.log("Glug glug, gulp is running");
  done();
}));