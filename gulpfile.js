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

gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
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
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('templates', function() {
  return gulp.src('app/lib/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('app'))
    .pipe(browserSync.reload({
      stream: true
    }))
});


gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});

gulp.task('watch', ['browserSync', 'sass' , 'templates'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  gulp.watch('app/lib/**/*.jade', ['templates']); 
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/**/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload); 
});

gulp.task('build', function (callback) {
  runSequence('clean:dist', 
    ['sass', 'templates', 'useref', 'images', 'fonts'],
    callback
  )
})

gulp.task('default', function (callback) {
  runSequence(['sass', 'templates', 'browserSync', 'watch'],
    callback
  )
})

