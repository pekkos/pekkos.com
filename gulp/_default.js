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

};







