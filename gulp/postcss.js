/**
 * POSTCSS
 *
 * CSS files are post-processed with PostCSS
 * https://postcss.org/
 */


/**
 * Require Gulp and common functions
 */

const gulp = require('gulp');
const runSequence = require('run-sequence');



/**
 * Task specific modules
 */

const postcss = require('gulp-postcss');



/**
 * PostCSS plugins that add code
 */

// Normalize - base on .browserslistrc
// https://github.com/csstools/postcss-normalize/blob/master/INSTALL.md
// https://github.com/browserslist/browserslist
const postcssNormalize = require('postcss-normalize');

// Autoprefixer - base on .browserslistrc
// https://github.com/postcss/autoprefixer
const autoprefixer = require('autoprefixer');

// Pixrem - if support for IE<9 is required
// https://github.com/robwierzbowski/node-pixrem
const pixrem = require('pixrem');



/**
 * PostCSS plugins that order code
 */

// Declaration sort order
// https://github.com/Siilwyn/css-declaration-sorter/
const cssDeclarationSorter = require('css-declaration-sorter');

// Ordered values
// https://github.com/cssnano/cssnano/tree/master/packages/postcss-ordered-values
const postcssOrderValues = require('postcss-ordered-values');



/**
 * PostCSS plugins that remove code
 */

// Merge Longhand
// https://github.com/cssnano/cssnano/tree/master/packages/postcss-merge-longhand
const postcssMergeLonghand = require('postcss-merge-longhand');

// Discard duplicates
// https://github.com/cssnano/cssnano/tree/master/packages/postcss-discard-duplicates
const postcssDiscardDuplicates = require('postcss-discard-duplicates');

// Merge rules
// https://github.com/cssnano/cssnano/tree/master/packages/postcss-merge-rules
const postcssMergeRules = require('postcss-merge-rules');




module.exports = function () {

  gulp.task('postcss', function (callback) {
    runSequence(
      'normalize',
      'postcss-plus',
      'postcss-order',
      'postcss-minus',
      'postcss-done',
      callback
    )
  });


  gulp.task('normalize', () => gulp.src('./src/css/*.css').pipe(
    postcss([
      postcssNormalize(/*{ forceImport: true}*/)
    ])
  ).pipe(
    gulp.dest('./src/css')
  ));


  gulp.task('postcss-plus', function () {
    const plugins = [
      autoprefixer(), // Using .browserslistrc
      pixrem()
    ];

    return gulp.src('src/css/*.css')
      .pipe(postcss(plugins))
      .pipe(gulp.dest('src/css'));
  });


  gulp.task('postcss-order', function () {
    const plugins = [
      cssDeclarationSorter({ order: 'concentric-css' }),
      postcssOrderValues()
    ];

    return gulp.src('src/css/*.css')
      .pipe(postcss(plugins))
      .pipe(gulp.dest('src/css'));
  });


  gulp.task('postcss-minus', function () {
    const plugins = [
      postcssMergeLonghand(),
      postcssDiscardDuplicates(),
      postcssMergeRules()
    ];

    return gulp.src('src/css/*.css')
      .pipe(postcss(plugins))
      .pipe(gulp.dest('src/css'));
  });


  gulp.task('postcss-done', function () {
    console.log('CSS files processed by PostCSS plugins');
  });

};
