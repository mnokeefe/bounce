// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    pixrem = require('gulp-pixrem'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    nodemon = nodemon = require('gulp-nodemon');

// Styles
gulp.task('styles', function() {
  return gulp.src('src/styles/style.scss')
    .pipe(sass({ style: 'expanded', }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('assets/styles'))
    .pipe(pixrem())
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('assets/styles'))
    .pipe(livereload());
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('assets/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'))
    .pipe(livereload());
});

// Images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('assets/images'))
    .pipe(livereload());
});

// Clean
gulp.task('clean', function() {
  return gulp.src(['assets/styles', 'assets/js', 'assets/images'], {read: false})
    .pipe(clean());
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});

// Watch
gulp.task('watch', function() {

  // Dev server with livereload
  livereload.listen();

  // Watch assets
  gulp.watch('src/styles/**/*.scss', ['styles']);
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/images/**/*', ['images']);

  // Nodemon server
  nodemon({ script: 'app.js', ext: 'html' })
  .on('restart', function () {
    console.log('restarted!')
  })

});