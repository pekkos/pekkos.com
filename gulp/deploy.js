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


module.exports = function () {

//   /* Publish Eleventy site on dev.pekkos.com */

  gulp.task('deploy_site', function (callback) {
    runSequence(
      '11ty',
      'copy:assets_to_eleventy',
      callback
    )
  });

};
