var gulp = require('gulp'),
	sass = require('gulp-sass'),
	jade = require('gulp-jade'),
	browserSync = require('browser-sync').create(),
	useref = require('gulp-useref'),
	uglify = require('gulp-uglify'),
	gulpIf = require('gulp-if'),
	cssnano = require('gulp-cssnano'),
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache'),
	del = require('del'),
	runSequence = require('run-sequence');



gulp.task('clean:dist', function() {
  return del.sync('dist');
})

gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})

gulp.task('img', function(){
  return gulp.src('app/img/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching img that ran through imagemin
  // .pipe(cache(imagemin({
  //     interlaced: true
  //   })))
  .pipe(gulp.dest('dist/img'))
});

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});


gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('jade', function() {
  return gulp.src('app/**/*.jade')
    .pipe(jade()) // Sends it through a gulp plugin
    .pipe(gulp.dest('dist')) // Outputs the file in the destination folder
    .pipe(browserSync.reload({
      stream: true
    }))
});


gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
  })
});

gulp.task('watch', ['browserSync', 'sass' , 'jade'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  gulp.watch('app/**/*.jade', ['jade']); 
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/**/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload); 
});

gulp.task('build', function (callback) {
  runSequence('clean:dist', 
    ['sass', 'jade', 'useref', 'img', 'fonts'],
    callback
  )
})

gulp.task('default', function (callback) {
  runSequence(['build' , 'sass', 'jade', 'browserSync', 'watch'],
    callback
  )
})

