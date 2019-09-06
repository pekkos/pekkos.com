/**
 * COPY
 *
 * Copy files to styleguide and site instances
 */


/**
 * Require Gulp and common functions
 */

const gulp = require('gulp');


/**
 * Task specific modules
 */

const copy = require('gulp-copy');




module.exports = function () {

  // Copy CSS to the Fractal styleguide
  gulp.task('copy:css_to_fractal', function () {
    return gulp.src(['src/css/*.css', '!src/css/*.min.css'])
      .pipe(copy('src/fractal/static/assets/css', { prefix: 4 }))
      .on('end', function () {
        console.log('CSS files copied to Fractal Styleguide.')
      });
  });


  // Copy assets to the Eleventy site
  gulp.task('copy:assets_to_eleventy', function () {
    return gulp.src([
        'src/fractal/static/assets/**/*'
      ])
      .pipe(copy('_site/assets', { prefix: 4 }))
      .on('end', function () {
        console.log('Assets copied to Eleventy site.')
      });
  });

};
