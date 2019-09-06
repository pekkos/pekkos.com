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

const clean = require('gulp-clean');

module.exports = function () {

  /* Clean up _site */
  gulp.task('clean_site', function () {
    return gulp.src('_site/*', {read: false})
      .pipe(clean());
  });


  /* Clean up _styleguide */
  gulp.task('clean_styleguide', function () {
    return gulp.src('_styleguide/*', { read: false })
      .pipe(clean());
  });


  /* Publish Eleventy site on dev.pekkos.com */

  gulp.task('deploy:dev', function (callback) {
    runSequence(
      '11ty',               /* Build static site */
      'css',                /* Build CSS and deploy to styleguide and site */
      callback
    )
  });


  /* Publish Eleventy site on www.pekkos.com */

  gulp.task('deploy:site', function (callback) {
    runSequence(
      '11ty',               /* Build static site */
      'copy:root',          /* Copy production files to the site root folder */
      'css',                /* Build CSS and deploy to styleguide and site */
      callback
    )
  });


  /* Publish Fractal styleguide on styleguide.pekkos.com */

  gulp.task('deploy:styleguide', function (callback) {
    runSequence(
      'css',                /* Build CSS and deploy to styleguide and site */
      'fractal:build',       /* Build static styleguide */
      callback
    )
  });

};
