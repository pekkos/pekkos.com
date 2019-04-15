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
            'done',
            'weather',
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
        console.log('All tasks done. Now what?');
    });


    gulp.task('copydevscripts', function () {
      return gulp.src('./src/_js-includes/dev/scripts.html')
        .pipe(copy('./src/_includes/', { prefix: 4 }))
        .on('end', function () {
          console.log('correct scripts hopefully copied :)')
        });
    });

    gulp.task('copyassets', function () {
      return gulp.src('./src/_includes/assets/**/*')
        .pipe(copy('./_site/assets/', { prefix: 3 }))
        .on('end', function () {
          console.log('assets scripts hopefully copied :)')
        });
    });

    gulp.task('copyprodscripts', function () {
      return gulp.src('./src/_js-includes/prod/scripts.html')
        .pipe(copy('./src/_includes/', { prefix: 4 }))
        .on('end', function () {
          console.log('correct scripts hopefully copied :)')
        });
    });

    gulp.task('eleventy', shell.task('eleventy'));

    gulp.task('elevendev', function (callback) {
      runSequence(
        'copydevscripts',
        'eleventy',
        'copyassets',
        callback
      )
    });

    gulp.task('elevenprod', function (callback) {
      runSequence(
        'copyprodscripts',
        'eleventy',
        callback
      )
    });


};







