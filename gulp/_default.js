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
const runSequence = require('gulp4-run-sequence');


module.exports = function () {


  gulp.task('default', function (callback) {
    runSequence(
      'html',
      'css',
//      'js',
      'weather',
      callback
    )
  });


  /* Weather in Gothenburg */
  gulp.task('weather', shell.task('curl -s http://wttr.in/Gothenburg | head -7'));



  /* CSS tasks */
  gulp.task('css', function (callback) {
    runSequence(
      'stylelint',  // stylelint.js
      'sass',       // sass.js
      'postcss',    // postcss.js
      'cssmin',      // cssmin.js
      'copy:css_to_fractal',
      'copy:css_to_eleventy',
      callback
    )
  });


  /* HTML tasks */
  gulp.task('html', function (callback) {
    runSequence(
      'fractal:build',
      'html_lint:styleguide',  // html.js
      'html_validation:styleguide', // html.js
      'html_validation_report:styleguide', // html.js
      'wcag_validation:styleguide', // html.js
      'wcag_validation_report:styleguide', // html.js
      callback
    )
  });


  /* Fractal start shortcut */
  gulp.task('sg:s', shell.task('gulp fractal:start'));

  /* Fractal build shortcut */
  gulp.task('sg:b', shell.task('gulp fractal:build'));


  /* Eleventy tasks */
  gulp.task('11ty', shell.task('eleventy'));

};







/*

CSS
[X] Stylelint and order Sass
- Compile Sass to CSS
- Process CSS with PostCSS
- Minify CSS
- Copy CSS to Fractal and 11ty

JS
- ES lint JS
- Copy JS to Fractal
- Webpack bundle and minify JS to 11ty

HTML
- HTML lint Fractal
- HTML vadlidate Fractal
- WCAG validate Fractal
- Check DOM?
- HTML lint 11ty
- HTML validate 11ty
- WCAG validate 11ty

SVG
- optimize

IMAGES
- optimize

OTHER STUFF??

*/
