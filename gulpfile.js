

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
  runSequence = require('run-sequence'),
  open = require('gulp-open');



// VINILE FTP
var ftp = require( 'vinyl-ftp' );
var conn = ftp.create( {
    host:     'catbears.com',
    user:     'catbears',
    password: 'HB3g0yj24i'
} );



gulp.task('in-the-bush', function(){
  gulp.src(__filename)
  .pipe(open({uri: 'https://youtu.be/O3kcRLEnL88?t=14s'}));
});

gulp.task('open:homepage', function(){
  gulp.src(__filename)
  .pipe(open({uri: 'www.catbears.com'}));
});


gulp.task('open:staging', function(){
  gulp.src(__filename)
  .pipe(open({uri: 'www.staging.catbears.com'}));
});

 
gulp.task('push:production' , ['push:production-silent'], function (){
          console.log ("Finished uploading to production")
          runSequence('in-the-bush')
          runSequence('open:homepage')
})




gulp.task ('clear:production' , function () {
    return conn.rmdir ( '/public_html/img/' , function () {
      console.log ("clear /img");
    }  )

    // console.log ('clearing production...'),
    // // CLEAR FILES
    // conn.rmdir ( '/public_html/*.*' , function () {
    //   console.log ("clear public_html");
    // }  ),
    // conn.rmdir ( '/public_html/img/' , function () {
    //   console.log ("clear /img");
    // }  ),
    // conn.rmdir ( '/public_html/css/' , function () {
    //   console.log ("clear /css");
    // }  ),
    // conn.rmdir ( '/public_html/pages/' , function () {
    //   console.log ("clear /pages");
    // }  ),
    // conn.rmdir ( '/public_html/scripts/' , function () {
    //   console.log ("clear /scripts");
    // }  )    
  
  
})


gulp.task('test', ['clear:production'], function (){
  runSequence('upload:production')
//  console.log ('clear and upload : production - finished')
})


gulp.task('upload:production' , function (){
    // UPLOAD FILES
    console.log ('Start uploading files...')
    return gulp.src('./dist/**/*')
        .pipe( conn.dest( '/public_html'))  
})

gulp.task('push:production-silent', ['clear:production'] , function () {
  
    // UPLOAD FILES
    
    console.log ('Start uploading files...')
    return gulp.src('./dist/**/*')
        .pipe( conn.dest( '/public_html'))
 });



gulp.task('push:staging' , ['push:staging-silent'], function (){
          console.log ("Finished uploading to staging")
          runSequence('open:staging')
})


gulp.task('push:staging-silent', function () {
    var conn = ftp.create( {
        host:     'catbears.com',
        user:     'catbears',
        password: 'HB3g0yj24i'
    } );
 
 
    // using base = '.' will transfer everything to /public_html correctly 
    // turn off buffering in gulp.src for best performance 
 
    // conn.rmdir ( '/public_html/*.*' , function () {
    //   console.log ("cb");
    // }  )

    conn.rmdir ( '/staging.catbears.com/*.*' , function () {
      console.log ("clear staging.catbears.com");
    }  )
    conn.rmdir ( '/staging.catbears.com/img/' , function () {
      console.log ("clear /img");
    }  )
    conn.rmdir ( '/staging.catbears.com/css/' , function () {
      console.log ("clear /css");
    }  )
    conn.rmdir ( '/staging.catbears.com/pages/' , function () {
      console.log ("clear /pages");
    }  )
    // conn.rmdir ( '/staging.catbears.com/scripts/' , function () {
    //   console.log ("clear /scripts");
    // }  )    

    return gulp.src('./dist/**/*')
        .pipe( conn.dest( '/staging.catbears.com' ) ) 
} );
// END VINILE FTP





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
  gulp.watch('app/**/*.+(png|jpg|jpeg|gif|svg)', ['img']); 
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

