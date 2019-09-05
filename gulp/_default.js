/**
 * DEFAULT TASK
 *
 * This is run with the '$ gulp' command
 */


/**
 * Require Gulp and common functions
 */

const gulp = require('gulp');
const shell = require('gulp-shell')
const runSequence = require('run-sequence');


module.exports = function () {


  gulp.task('default', function () {
    console.log('Gulp had nothing to do today.');
  });


  /* Weather in Gothenburg */
  gulp.task('weather', shell.task('curl -s http://wttr.in/Gothenburg | head -7'));



  /* CSS tasks */
  gulp.task('css', function (callback) {
    runSequence(
      'stylelint',  // stylelint.js
      'sass',       // sass.js
      'postcss',    // postcss.js
//      'cssmin',      // cssmin.js
      callback
    )
  });


};







