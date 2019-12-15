/**
 * SASS
 *
 * Compile SCSS files into CSS
 * https://www.npmjs.com/package/gulp-sass
 */

/**
* Require Gulp and common functions
*/
'use strict';

const gulp = require('gulp');


/**
 * Task specific modules
 */

const sass = require('gulp-sass');
sass.compiler = require('node-sass');

/* Glob Sass files https://www.npmjs.com/package/gulp-sass-glob */
const sassGlob = require('gulp-sass-glob');



module.exports = function () {

  gulp.task('sass', function () {
    return gulp
      .src([
        'src/css/sass/*.scss'
      ])
      .pipe(sassGlob())
      .pipe(sass({
          outputStyle: 'expanded'
        })
        .on('error', sass.logError))
      .pipe(gulp.dest('src/css'))
      .on('end', function () {
        console.log('SCSS compiled to CSS.');
      })
  });

};
