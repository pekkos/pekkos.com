/*                                    lllllll
									  l:::::l
									  l:::::l
									  l:::::l
   ggggggggg   ggggguuuuuu    uuuuuu   l::::lppppp   ppppppppp
  g:::::::::ggg::::gu::::u    u::::u   l::::lp::::ppp:::::::::p
 g:::::::::::::::::gu::::u    u::::u   l::::lp:::::::::::::::::p
g::::::ggggg::::::ggu::::u    u::::u   l::::lpp::::::ppppp::::::p
g:::::g     g:::::g u::::u    u::::u   l::::l p:::::p     p:::::p
g:::::g     g:::::g u::::u    u::::u   l::::l p:::::p     p:::::p
g:::::g     g:::::g u::::u    u::::u   l::::l p:::::p     p:::::p
g::::::g    g:::::g u:::::uuuu:::::u   l::::l p:::::p    p::::::p
g:::::::ggggg:::::g u:::::::::::::::uul::::::lp:::::ppppp:::::::p
 g::::::::::::::::g  u:::::::::::::::ul::::::lp::::::::::::::::p
  gg::::::::::::::g   uu::::::::uu:::ul::::::lp::::::::::::::pp
	gggggggg::::::g     uuuuuuuu  uuuullllllllp::::::pppppppp
			g:::::g                           p:::::p
gggggg      g:::::g                           p:::::p
g:::::gg   gg:::::g                          p:::::::p
 g::::::ggg:::::::g                          p:::::::p
  gg:::::::::::::g                           p:::::::p
	ggg::::::ggg                             ppppppppp
	   gggggg

https://gulpjs.com/
*/

"use strict";

/**
 * Exported / Public tasks
 *
 *	'$ gulp css'				[Process Sass and CSS to files]
 *	'$ gulp fractal_start 		[Start a local fractal web server with browser sync]
 *	'$ gulp fractal_build 		[Build a static styleguide]
 *	'$ gulp deploy_legacy'		[Deploys the legacy github.io site, use it on Main/www]
 *	'$ gulp deploy_styleguide	[Builds and deploys a static styleguide]
 */

/**
 * Outside Gulp
 *
 *	'$ npm run 11ty_dev'		[Deploys the site in development environment]
 *	'$ npm run 11ty_www'		[Deploys the site in production environment]
 */

/* -----------------------------------------------------------------------------
 * Gulp requirements and plugins
 * -------------------------------------------------------------------------- */

/* Base gulp requirements */
const gulp = require("gulp");
const { src, dest, watch, series, parallel } = require("gulp");
const exec = require("child_process").exec;
const clean = require("gulp-clean");
const copy = require("gulp-copy");
const rename = require("gulp-rename");
const size = require("gulp-size");

/* Fetch required plugins */
const sass = require("gulp-dart-sass");
const sassGlob = require("gulp-sass-glob");
const postcss = require("gulp-postcss");
const cleanCSS = require("gulp-clean-css");

/* Fetch PostCSS plugins */
const postcssNormalize = require("postcss-normalize");

/* -----------------------------------------------------------------------------
 * Gulp tasks
 * -------------------------------------------------------------------------- */

function defaultTask(cb) {
	console.log("No default task defined");
	cb();
}

/* Clean destination folders */

function clean_site(cb) {
	return src("_site/*", { read: false }).pipe(clean());
}

function clean_site_legacy(cb) {
	return src("_site_legacy/*", { read: false }).pipe(clean());
}

function clean_dest_styleguide(cb) {
	return src("_styleguide/*", { read: false }).pipe(clean());
}

/* Copy common root files */

function copy_root_legacy() {
	return src("root/_legacy/*").pipe(copy("_site_legacy", { prefix: 2 }));
}

function copy_root_common() {
	return src("root/common/*").pipe(copy("_site", { prefix: 2 }));
}

function copy_root_dev() {
	return src("root/dev/*").pipe(copy("_site", { prefix: 2 }));
}

function copy_root_www() {
	return src("root/www/*").pipe(copy("_site", { prefix: 2 }));
}

/* Copy site */

function copy_site_legacy() {
	return src("src/_legacy/**/*").pipe(copy("_site_legacy", { prefix: 2 }));
}

function copy_site_assets(cb) {
	return src("src/_static/assets/**/*").pipe(
		copy("_site", { prefix: 2 }).on("end", function () {
			console.log("Assets folder copied from src to site.");
		})
	);
}

/* -----------------------------------------------------------------------------
 * CSS tasks
 * -------------------------------------------------------------------------- */

// [x] Stylelint of Sass files
// [ ] BEM lint of Sass files
// [x] Sass to css
// [ ] PostCSS css files
// [ ] Minify to css.min
// [ ] copy css files
// [ ] - styleguide css
// [ ] - pattern variant css
// [ ] - diagnostics css

/**
 * Lint Sass and report errors
 * https://stylelint.io/
 *
 * Order declarations
 * https://github.com/hudochenkov/stylelint-order
 *
 * Stylelint uses the rulesets defined in the .stylelintrc config file,
 * and tries to fix errors and saves changes back to source files
 */

function stylelintSass() {
	return gulp
		.src(["src/css/sass/**/*.scss", "!src/css/sass/*.scss"])
		.pipe(
			sassStylelint({
				failAfterError: true,
				fix: true,
				reporters: [{ formatter: "verbose", console: true }],
			})
		)
		.pipe(
			gulp.dest("src/css/sass/").on("end", function () {
				console.log("Linte and fixed Sass files with Stylelint");
			})
		);
}

function stylelintSassPatterns() {
	return gulp
		.src(["src/fractal/patterns/**/*.scss"])
		.pipe(
			sassStylelint({
				failAfterError: true,
				fix: true,
				reporters: [{ formatter: "verbose", console: true }],
			})
		)
		.pipe(
			gulp.dest("src/fractal/patterns/").on("end", function () {
				console.log(
					"Linted and fixed Sass pattern files with Stylelint"
				);
			})
		);
}

/**
 * Process Sass files to CSS
 */

function processSass() {
	return gulp
		.src(["src/css/sass/*.scss"])
		.pipe(sassGlob())
		.pipe(
			sass({
				outputStyle: "expanded",
			}).on("error", sass.logError)
		)
		.pipe(gulp.dest("src/css"))
		.pipe(
			size({
				title: "Process Sass to",
				showFiles: true,
			})
		)
		.on("end", function () {
			console.log("Sass pre-processed to CSS.");
		});
}

/**
 * Import Normalize based on Browserslist using PostCSS
 */

function postCSSnormalize(cb) {
	const plugins = [postcssNormalize()];

	return gulp
		.src(["src/css/*.css", "!src/css/*.min.css"])
		.pipe(postcss(plugins))
		.pipe(gulp.dest("src/css"))
		.pipe(
			size({
				title: "Inject Normalize to",
				showFiles: true,
			})
		)
		.on("end", function () {
			console.log("Normalized injected using PostCSS and Browserslist.");
		});
}

/**
 * Minify processed CSS
 */

function minifyCSS(cb) {
	return gulp
		.src(["src/css/*.css", "!src/css/*.min.css"])
		.pipe(
			cleanCSS({ debug: true }, (details) => {
				console.log(
					`${details.name} minified from ${details.stats.originalSize} to ${details.stats.minifiedSize}`
				);
			})
		)
		.pipe(rename({ suffix: ".min" }))
		.pipe(gulp.dest("src/css"));
}

// function minifyCSS(cb) {
// 	return (
// 		gulp
// 			.src(["src/css/*.css", "!src/css/*.min.css"])
// 			//		.pipe(cleanCSS())
// 			.pipe(rename({ suffix: ".min" }))
// 			.pipe(
// 				gulp
// 					.dest("src/css/pro")
// 					.pipe(
// 						size({
// 							title: "Minified",
// 							showFiles: true,
// 						})
// 					)
// 					.on("end", function () {
// 						console.log("CSS files minified.");
// 					})
// 			)
// 	);
// }

/**
 * Copy post-processed and minified CSS to static assets folder
 */

function copyCssAssets() {
	return src(["src/css/*.css", "src/css/*.min.css"])
		.pipe(copy("src/_static/assets/css", { prefix: 2 }))
		.pipe(
			size({
				title: "Copy processed CSS file:",
				showFiles: true,
			})
		)
		.on("end", function () {
			console.log(
				"Post-processed CSS files copied to the static assets folder"
			);
		});
}
/* -----------------------------------------------------------------------------
 * Fractal configuration and tasks
 *
 * Fractal settings documentation can be found here:
 * https://fractal.build/guide/project-settings.html#the-fractal-js-file
 * -------------------------------------------------------------------------- */

/**
 * Base Fractal requirements
 */

const fractal = require("@frctl/fractal").create();
const logger = fractal.cli.console;

/**
 * Fractal configuration
 */

/* Set the title of the project */
fractal.set("project.title", "pekkos.com styleguide");

/* Tell Fractal where the components will live */
fractal.components.set("path", __dirname + "/src/fractal/patterns");
fractal.components.set("label", "Patterns");
fractal.components.set("title", "Patterns");

/* Tell Fractal where the documentation pages will live */
fractal.docs.set("path", __dirname + "/src/fractal/docs");

/* Specify a directory of static assets */
fractal.web.set("static.path", __dirname + "/src/_static");

/* Set the static HTML build destination */
fractal.web.set("builder.dest", __dirname + "/_styleguide");

/* Preview */
fractal.components.set("default.preview", "@preview");
fractal.components.set("collate.preview", "@collate");

/**
 * Customized Styleguide theme
 */

/* Require the Mandelbrot theme module */
const mandelbrot = require("@frctl/mandelbrot");

/* Create a new instance with custom config options */
const myCustomisedTheme = mandelbrot({
	styles: ["/styleguide.css", "default"],
});

/* Tell Fractal to use the configured theme by default */
fractal.web.theme(myCustomisedTheme);

/**
 * Adding a SVG inline helper
 */

const hbs = require("@frctl/handlebars")({});
const instance = fractal.components.engine(hbs);

var fs = require("fs");
instance.handlebars.registerHelper("svg", function (iconName) {
	let path = __dirname + "/project/static/icons/" + iconName + ".svg";
	let content = fs.readFileSync(path, "utf8");
	return content;
});

/**
 * Fractal tasks
 */

/* Start a localhost:3000 web server with browser sync */
function fractal_start() {
	const server = fractal.web.server({
		sync: true,
	});
	server.on("error", (err) => logger.error(err.message));
	return server.start().then(() => {
		logger.success(`Fractal server is now running at ${server.url}`);
	});
}

/* Build a static web site */
function fractal_build() {
	const builder = fractal.web.builder();
	builder.on("progress", (completed, total) =>
		logger.update(`Exported ${completed} of ${total} items`, "info")
	);
	builder.on("error", (err) => logger.error(err.message));
	return builder.start().then(() => {
		logger.success("Fractal build completed!");
	});
}

/* -----------------------------------------------------------------------------
 * Public Gulp tasks
 * -------------------------------------------------------------------------- */

/* Default */
exports.default = defaultTask;

/**
 * CSS
 */

exports.css = series(
	processSass,
	postCSSnormalize,
	minifyCSS,
	copyCssAssets
	// postcss plus
	// postcss minus
);

/**
 * Deploy Legacy Site
 */

exports.deploy_legacy = series(
	clean_site_legacy,
	copy_root_legacy,
	copy_site_legacy
);

/**
 * Deploy Eleventy Site
 */

exports.pre_11ty_dev = series(
	clean_site,
	copy_root_common,
	copy_root_dev,
	copy_site_assets
);

exports.pre_11ty_www = series(
	clean_site,
	copy_root_common,
	copy_root_www,
	copy_site_assets
);

/**
 * Deploy Fractal Styleguide
 */

exports.fractal_start = fractal_start;
exports.fractal_build = fractal_build;

exports.deploy_styleguide = series(clean_dest_styleguide, fractal_build);

/* Single tasks */
// exports.clean = clean_site;

/* Verified */
exports.css_sass = processSass;
exports.css_norm = postCSSnormalize;
exports.css_min = minifyCSS;
exports.css_assets = copyCssAssets;
