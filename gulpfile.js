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
  open = require('gulp-open'),
  gulpBowerFiles = require('gulp-bower-files');
  // rsync = require('gulp-rsync');
 


gulp.task("bower-files", function(){
    gulpBowerFiles().pipe(gulp.dest("dist/lib"));
});

// VINILE FTP
// var ftp = require( 'vinyl-ftp' );
// var conn = ftp.create( {
//     host: 'catbears.com',
//     user: 'catbears',
//     password: 'HB3g0yj24i'
// } );

var sftp = require('gulp-sftp');

var projectFolders = [
'*.*',
'img/',
'json',
'video/',
'css/',
'pages/',
'pdf/',
'scripts/',
'lib/'
];


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


// gulp-rsync!!!!!!!!!!!!!!!!!!
// gulp.task('deploy', function() {
//   console.log ("---------------------------------------DEPLOY")
//   // gulp.src('./dist/**/*')
//   gulp.src('dist/**/*')
//     .pipe(rsync({
//       root: 'dist/',
//       hostname: 'ftp.catbears.com',
//       destination: '/public_html',
//       archive: true,
//       silent: false,
//       compress: true
//     }));
// });

// PUSH PRODUCTION



gulp.task('push:production-silent', function (cb) {

    console.log ("----------------------------------------START")
    // function purgeProjectFolders (index){
    //   if (index < projectFolders.length){
    // console.log ("----------------------------------------PURGING")
    //    conn.rmdir ( "/public_html" + projectFolders[index] , function () {
    //     console.log ("cleared " + projectFolders[index]);
    //     purgeProjectFolders(index + 1);
    //    })
    //   }
    //    else {
    //     console.log('finish clearing')
    //     console.log('finish clearing')
    //     console.log('finish clearing')
    //     // return gulp.src('./dist/**/*')
    //     // .pipe( conn.dest( '/public_html' ) ).on('end' , cb)
    //    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //    return gulp.deploy


    //    }
    // }

    //return purgeProjectFolders(0);
    // runSequence('deploy');

    console.log ("----------------------------------------SFTP")
  return gulp.src('./dist/**/*')
        .pipe(sftp({
            host: 'ftp.catbears.com',
            user: 'catbears',
            password: 'HB3g0yj24i',
            port: 18765,
            // port: 21,
            remotePath: 'public_html'
        }));
} );

// gulp.task('push:production' , ['push:production-silent' , 'bush'], function (){
// })
gulp.task('push:production' , ['push:production-silent'], function (){
})

gulp.task ('bush' , function () {
  // console.log ("!!  step 2  !!")
  // runSequence('in-the-bush')
  // runSequence('open:homepage')
})


// PUSH STAGING
gulp.task('push:staging' , ['push:staging-silent'], function (){
          console.log ("Finished uploading to staging")
          runSequence('open:staging')
})


gulp.task('push:staging-silent', function (cb) {

    function purgeProjectFolders (index){
      if (index < projectFolders.length){
       conn.rmdir ( "/staging.catbears.com/" + projectFolders[index] , function () {
        console.log ("cleared " + projectFolders[index]);
        return purgeProjectFolders(index + 1);
       })
      }
       else {
        console.log('finish clearing')
        return gulp.src('./dist/**/*')
        // .pipe( conn.dest( '/staging.catbears.com' ) ).on('end', cb);
        .pipe( conn.dest( '/staging.catbears.com' ) ).on('end', cb);
       }
    }

    //return purgeProjectFolders(0);
      return gulp.src('./dist/**/*')
        .pipe(sftp({
            host: 'ftp.catbears.com',
            user: 'catbears',
            password: 'HB3g0yj24i',
            port: 18765,
            remotePath: 'staging.catbears.com'
            //host: 'website.com',
            //user: 'johndoe',
            //pass: '1234'
        }));
 
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

gulp.task('json', function(){
  return gulp.src('app/json/**/*.json')
  .pipe(gulp.dest('dist/json'))
});

gulp.task('video', function(){
  return gulp.src('app/video/**/*.+(avi|mov|mpeg|mp4)')
  .pipe(gulp.dest('dist/video'))
});

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});


gulp.task('pdf-files', function() {
  return gulp.src('app/pdf/**/*.pdf')
    .pipe(gulp.dest('dist/pdf'))
})


gulp.task('scripts', function() {
  return gulp.src('app/scripts/**/*.js')
    .pipe(gulp.dest('dist/scripts'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

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
      routes: {
        "/bower_components": "bower_components"
      }
    },
  })
});

gulp.task('watch', ['browserSync', 'sass' , 'jade' , 'scripts'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  gulp.watch('app/**/*.jade', ['jade']); 
  gulp.watch('app/**/*.+(png|jpg|jpeg|gif|svg)', ['img']);
  gulp.watch('app/json/**/*.json', ['json']);
  gulp.watch('app/video/**/*.+(avi|mov|mpeg|mp4)', ['video']);
  gulp.watch('app/**/*.html', browserSync.reload); 
  gulp.watch('app/scripts/**/*.js', ['scripts']); 
});

gulp.task('build', function (callback) {
  runSequence(//'clean:dist', 
    ['sass', 'jade', 'useref', 'img', 'json', 'video', 'scripts', 'pdf-files', 'fonts' , 'bower-files'],
    callback
  )
})

gulp.task('default', function (callback) {
  runSequence(['build' , 'sass', 'jade', 'browserSync', 'watch'],
    callback
  )
})





