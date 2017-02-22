var gulp = require('gulp');
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');

var browserSync = require('browser-sync').create();;
var reload = browserSync.reload;
var resumeData = require('./sample.json');

gulp.task('html', function buildHTML() {
  return gulp
    .src('./resume.pug')
    .pipe(plumber())
    .pipe(pug({
      // Your options in here.
      data: resumeData
    }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./'))
    .pipe(reload({stream: true}))
});

gulp.task('stylus', function () {
  return gulp
    .src('./resume.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(rename('index.css'))
    .pipe(gulp.dest('./'))
    .pipe(reload({stream: true}));
});

gulp.task('browser-sync', function () {
  browserSync.init({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['./']
    }
  });
  
  gulp.watch('./index.html', reload);
  gulp.watch('./resume.pug', ['html'])
  gulp.watch('./resume.styl', ['stylus'])
});
gulp.task('default', ['stylus', 'html', 'browser-sync']);