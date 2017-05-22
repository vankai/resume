var fs = require('fs');
var gulp = require('gulp');
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');

var browserSync = require('browser-sync').create();;
var reload = browserSync.reload;
var chineseFile = "./chinese.json";
var englishFile = './english.json';

var chineseR = JSON.parse(fs.readFileSync(chineseFile));
var englishR = JSON.parse(fs.readFileSync(englishFile));

gulp.watch(chineseFile, function (fn) {
  chineseR = JSON.parse(fs.readFileSync(chineseFile));
  return gulp.start('html:zh')

})
gulp.watch(englishFile, function (fn) {
  englishR = JSON.parse(fs.readFileSync(englishFile));
  return gulp.start('html:en')
})

gulp.task('html:zh', function buildHTML() {
  return gulp
    .src('./resume.pug')
    .pipe(plumber())
    .pipe(pug({
      // Your options in here.
      data: chineseR
    }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./'))
    .pipe(reload({stream: true}))
});

gulp.task('html:en', function buildHTML() {
  return gulp
    .src('./resume.pug')
    .pipe(plumber())
    .pipe(pug({
      // Your options in here.
      data: englishR
    }))
    .pipe(rename('index-en.html'))
    .pipe(gulp.dest('./'))
    .pipe(reload({stream: true}))
});

gulp.task('stylus', function () {
  return gulp
    .src('./resume.styl')
    .pipe(plumber())
    .pipe(stylus({compress: true}))
    .pipe(rename('index.css'))
    .pipe(gulp.dest('./'))
    .pipe(reload({stream: true}));
});

gulp.task('browser-sync', function () {
  browserSync.init({
    notify: false,
    port: 9002,
    server: {
      baseDir: ['./']
    }
  });

  gulp.watch([
    './index.html', './index-en.html'
  ], reload);
  gulp.watch('./resume.pug', ['html:zh', 'html:en'])
  gulp.watch('./resume.styl', ['stylus'])
});
gulp.task('default', ['stylus', 'html:zh', 'html:en', 'browser-sync']);