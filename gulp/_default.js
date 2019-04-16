/**
 * DEFAULT TASK
 *
 * This is run with the '$ gulp' command
 */


/**
 * Require Gulp and common functions
 */

const gulp = require('gulp');
const runSequence = require('run-sequence');
const shell = require('gulp-shell')
const copy = require('gulp-copy');




module.exports = function () {

  gulp.task('default', function (callback) {
      runSequence(
//            ['css'],
          'eleventy_dev',
          'copy_assets',
          'done',
          'weather',
          callback
      )
  });


  gulp.task('deploy', function (callback) {
    runSequence(
      //            ['css'],
      'eleventy_prod',
      'copy_assets',
      'done',
      callback
    )
  });


    gulp.task('weather', shell.task('curl -s http://wttr.in/Gothenburg | head -7'));


    gulp.task('css', function (callback) {
        runSequence(
            'sass',       // sass.js
            'postcss',    // postcss.js
            'stylelint',  // stylelint.js
            'cssmin',      // cssmin.js
            callback
        )
    });


    gulp.task('done', function () {
        console.log('All tasks done. Wanna talk about the weather?');
    });


  gulp.task('copy_assets', function () {
    return gulp.src('./src/_includes/assets/**/*')
      .pipe(copy('./_site/assets/', { prefix: 3 }))
      .on('end', function () {
        console.log('Assets copied')
      });
  });


};







