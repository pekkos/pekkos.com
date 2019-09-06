/**
 * DEPLOY
 *
 * Tasks for publishing sites in development and production environments
 */

/**
* Require Gulp and common functions
*/
'use strict';

const gulp = require('gulp');
const shell = require('gulp-shell')
const runSequence = require('run-sequence');


/**
 * Task specific modules
 */

// var clean = require('gulp-clean');

module.exports = function () {

  /* Clean up _site before deploying new stuff */
  // gulp.task('clean_site', function () {
  //   return gulp.src('_site/*', {read: false})
  //     .pipe(clean());
  // });

//   /* Publish Eleventy site on dev.pekkos.com */

  gulp.task('deploy', function (callback) {
    runSequence(
//      'clean_site',         /* First, clean up the _site folder */
      '11ty',               /* Build static site */
      'css',                /* Build CSS and deploy to styleguide and site */
      callback
    )
  });

};
