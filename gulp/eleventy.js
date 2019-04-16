
/**
 * ELEVENTY TASKS
 *
 * Eleventy is the static html site generator
 */


/**
 * Require Gulp and common functions
 */

const gulp = require('gulp');
const runSequence = require('run-sequence');
const shell = require('gulp-shell')
const copy = require('gulp-copy');




module.exports = function () {



  gulp.task('eleventy', shell.task('eleventy'));


  gulp.task('eleventy_copy_devscripts', function () {
    return gulp.src('./src/_js-includes/dev/scripts.html')
      .pipe(copy('./src/_includes/', { prefix: 4 }))
      .on('end', function () {
        console.log('Develop mode scripts applied')
      });
  });


  gulp.task('eleventy_copy_prodscripts', function () {
    return gulp.src('./src/_js-includes/prod/scripts.html')
      .pipe(copy('./src/_includes/', { prefix: 4 }))
      .on('end', function () {
        console.log('Production mode scripts applied')
      });
  });


  gulp.task('eleventy_dev', function (callback) {
    runSequence(
      'eleventy_copy_devscripts',
      'eleventy',
      callback
    )
  });

  gulp.task('eleventy_prod', function (callback) {
    runSequence(
      'eleventy_copy_prodscripts',
      'eleventy',
      callback
    )
  });


  gulp.task('eleventydone', function () {
    console.log('All pages turned up to 11ty');
  });



};







