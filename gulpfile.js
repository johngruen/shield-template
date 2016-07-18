
const del = require('delete');
const gulp = require('gulp');
const livereload = require('gulp-livereload');
const markdown = require('gulp-markdown');
const mustache = require('gulp-mustache');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const webserver = require('gulp-webserver');
const runSequence = require('run-sequence');

const DATA = require('./data');

gulp.task('styles', function () {
  return gulp.src('./src/styles/main.css')
    .pipe(sourcemaps.write({ sourceRoot: 'src/styles' }))
    .pipe(gulp.dest('./dist/styles'))
    .pipe(livereload());
});

gulp.task('compile-mustache', function () {
  return gulp.src('./src/template/index.mustache')
  .pipe(mustache({
    title: DATA.title,
    xpi: DATA.xpi,
    buttonText: DATA.buttonText
  }, { extension: '.html' }))
  .pipe(gulp.dest('./dist'))
  .pipe(livereload());
});

gulp.task('rename', function () {
  gulp.src('./compile/copy.html')
  .pipe(rename('./compile/copy.mustache'))
  .pipe(gulp.dest('./'));
});

gulp.task('markdown', function () {
  return gulp.src('copy.md')
    .pipe(markdown())
    .pipe(gulp.dest('./compile'));
});

gulp.task('move:images', function () {
  gulp.src('./src/images/**')
  .pipe(gulp.dest('./dist/images'));
});

gulp.task('compile-markdown', ['markdown', 'rename']);

gulp.task('build', function () {
  runSequence('compile-markdown',
              'move:images',
              'styles',
              'compile-mustache');
});

gulp.task('server', function () {
  gulp.src('./dist')
    .pipe(webserver({
      directoryListing: false
    }));
});

gulp.task('delete', function () {
  del(['./compile']);
});

gulp.task('default', ['build', 'server'], function () {
  livereload.listen();
  gulp.watch('./src/styles/**/*.css', ['styles']);
  gulp.watch('./src/**/*.mustache', ['compile-mustache']);
  gulp.watch('./dist/**').on('change', livereload.changed);
});
