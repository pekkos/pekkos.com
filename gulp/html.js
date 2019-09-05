/**
 * HTML
 *
 * Lint and validate html
 */


/**
 * Require Gulp and common functions
 */

const gulp = require('gulp');
const concat = require('gulp-concat');


/**
 * Task specific modules
 */

const htmlhint = require("gulp-htmlhint");
const htmlValidation = require('gulp-w3c-html-validation');
const axe = require('gulp-axe-webdriver');



module.exports = function () {

  // Lint HTML for code errors
  gulp.task('html_lint:styleguide', function () {
    return gulp.src([
        '_styleguide/components/preview/*.html'
      ])
      .pipe(htmlhint({
        htmlhintrc: '.htmlhintrc'
      }))
      // .pipe(htmlhint.reporter())
      .pipe(htmlhint.failAfterError())
      .on('end', function () {
        console.log('Styleguide HTML files hinted without problems.')
      });
  });


  // Validate HTML with the W3C validator service
  gulp.task('html_validation:styleguide', function () {
    return gulp.src('_styleguide/components/preview/*.html')
      .pipe(htmlValidation({
        reportpath: 'test/reports/html_validation.json',
        statusPath: 'test/reports/html_validation_status.json',
        generateReport: false
        // errorTemplate: 'test/reports/w3c/w3c_template.html',
        // errorHTMLRootDir: 'test/reports/w3c'
      }))
  });


  // Write HTML validation results to a report file
  gulp.task("html_validation_report:styleguide", function () {
    return gulp.src([
      'src/fractal/patterns/_hidden/test-reports/report-begin.txt',
      'test/reports/html_validation.json',
      'src/fractal/patterns/_hidden/test-reports/report-end.txt'
    ])
    .pipe(concat('html-validation.config.json'))
    .pipe(gulp.dest('src/fractal/patterns/_hidden/test-reports/html-validation'))
    .on('end', function () {
      console.log('HTML validation report deployed to the Styleguide');
    })
  });


  // Validate HTML using Axe accessibility checker
  gulp.task("wcag_validation:styleguide", function () {
    var options = {
      headless: true,
      folderOutputReport: 'test/reports/',
      saveOutputIn: 'wcag_validation.json',
      urls: [
        'http://localhost:3000/components/preview/test'
      ]
    };
    return axe(options);
  });


  // Write WCAG validation results to a report file
  gulp.task("wcag_validation_report:styleguide", function () {
    return gulp.src([
      'src/fractal/patterns/_hidden/test-reports/report-begin.txt',
      'test/reports/wcag_validation.json',
      'src/fractal/patterns/_hidden/test-reports/report-end.txt'
    ])
      .pipe(concat('wcag-validation.config.json'))
      .pipe(gulp.dest('src/fractal/patterns/_hidden/test-reports/wcag-validation'))
      .on('end', function () {
        console.log('WCAG validation report deployed to the Styleguide');
      })
  });
};

