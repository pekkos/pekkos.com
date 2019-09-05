/**
 * STYLELINT
 *
 * Lint Sass and report errors
 * https://stylelint.io/
 *
 * Stylelint uses the rulesets defined in the .stylelintrc config file
 */


/**
 * Require Gulp and common functions
 */

const gulp = require('gulp');
const runSequence = require('run-sequence');


/**
 * Task specific modules
 */

const sassStylelint = require('gulp-stylelint');
const concat = require('gulp-concat');



module.exports = function () {

  gulp.task('stylelint', function (callback) {
    runSequence(
      'sass-lint',
      'stylelint-report',
      callback
    )
  });


  gulp.task("sass-lint", function () {
    return gulp.src(
      ['src/css/sass/**/*.scss',
        '!src/css/sass/*.scss'])
      .pipe(sassStylelint({
        failAfterError: false,
        reporters: [
          // { formatter: 'string', console: true },
          { formatter: 'json', save: 'test-reports/css_stylelint.json' }
        ]
      })
        .on('end', function () {
          console.log('Styles linted and errors reported to /test-reports/css_stylelint.json');
        })
      );
  });


  /**
   * Make the Stylelint report available to Fractal as a part of the
   * documentation section
   */

  gulp.task("stylelint-report", function () {
    return gulp.src([
        'src/fractal/patterns/_hidden/test-reports/report-begin.txt',
        'test-reports/css_stylelint.json',
        'src/fractal/patterns/_hidden/test-reports/report-end.txt'
      ])
      .pipe(concat('css-stylelint.config.json'))
      .pipe(gulp.dest('src/fractal/patterns/_hidden/test-reports/css-stylelint'))
      .on('end', function () {
        console.log('Stylelint report deployed to the Styleguide');
      })
  });

};
