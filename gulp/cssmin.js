/**
 * CSSMIN
 *
 * Minify CSS files and measure sizes
 */


/**
 * Require Gulp and common functions
 */

const gulp = require('gulp');
const runSequence = require('gulp4-run-sequence');
const rename = require('gulp-rename');



/**
 * Task specific modules
 */

// CSS Minification
// https://github.com/pdehaan/gulp-cssmin
const cssmin = require('gulp-cssmin');

// Size measuring
// https://github.com/sindresorhus/gulp-size
const cssSize = require('gulp-size');




module.exports = function () {

  gulp.task('cssmin', function (callback) {
    runSequence(
      'cssMinify',
      'cssMeasureSize', // Get main unminified CSS file size
      'cssCalculateGzip', // Get main minified CSS file gzipped
      callback
    )
  });


  gulp.task('cssMinify', function () {
    return gulp.src([
      'src/css/*.css',
      // If any minified CSS files in the source foolder
      '!src/css/*.min.css'
    ])
      .pipe(cssmin())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('src/css'));
  });


  gulp.task('cssMeasureSize', function () {
    return gulp.src(['src/css/*.css', '!src/css/*.min.css'])
      .pipe(cssSize({ showFiles: true, title: 'Compiled and optimized CSS: ' }));
  });


  gulp.task('cssCalculateGzip', function () {
    return gulp.src('src/css/*.min.css')
      .pipe(cssSize({ gzip: true, showFiles: true, title: 'Minified and Gzipped CSS: ' }));
  });


  gulp.task('cssMinify:deploy', function () {
    return gulp.src([
      'src/css/*.css',
      // If any minified CSS files in the source foolder
      '!src/css/*.min.css'
    ])
      .pipe(cssmin())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('_site/assets/css'))
      .on('end', function () {
        console.log('CSS files minified and copied to site assets')
      });
  });

};
