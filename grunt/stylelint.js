/**
 *
 * Lint Sass and CSS
 *
 */


 module.exports = {

    options: {
		configFile: '.stylelintrc',
		formatter: 'string',
		ignoreDisables: false,
		failOnError: true,
		outputFile: '',
		reportNeedlessDisables: false,
		fix: false,
		syntax: ''
	},
	src: [
		'src/**/*.scss',
		'!src/badstyles/*.css'
	]

  };

