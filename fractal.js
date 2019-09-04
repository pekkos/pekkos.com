/*
    ffffffffffffffff                                                                  tttt                            lllllll
   f::::::::::::::::f                                                              ttt:::t                            l:::::l
  f::::::::::::::::::f                                                             t:::::t                            l:::::l
  f::::::fffffff:::::f                                                             t:::::t                            l:::::l
  f:::::f       ffffffrrrrr   rrrrrrrrr   aaaaaaaaaaaaa      ccccccccccccccccttttttt:::::ttttttt      aaaaaaaaaaaaa    l::::l
  f:::::f             r::::rrr:::::::::r  a::::::::::::a   cc:::::::::::::::ct:::::::::::::::::t      a::::::::::::a   l::::l
 f:::::::ffffff       r:::::::::::::::::r aaaaaaaaa:::::a c:::::::::::::::::ct:::::::::::::::::t      aaaaaaaaa:::::a  l::::l
 f::::::::::::f       rr::::::rrrrr::::::r         a::::ac:::::::cccccc:::::ctttttt:::::::tttttt               a::::a  l::::l
 f::::::::::::f        r:::::r     r:::::r  aaaaaaa:::::ac::::::c     ccccccc      t:::::t              aaaaaaa:::::a  l::::l
 f:::::::ffffff        r:::::r     rrrrrrraa::::::::::::ac:::::c                   t:::::t            aa::::::::::::a  l::::l
  f:::::f              r:::::r           a::::aaaa::::::ac:::::c                   t:::::t           a::::aaaa::::::a  l::::l
  f:::::f              r:::::r          a::::a    a:::::ac::::::c     ccccccc      t:::::t    tttttta::::a    a:::::a  l::::l
 f:::::::f             r:::::r          a::::a    a:::::ac:::::::cccccc:::::c      t::::::tttt:::::ta::::a    a:::::a l::::::l
 f:::::::f             r:::::r          a:::::aaaa::::::a c:::::::::::::::::c      tt::::::::::::::ta:::::aaaa::::::a l::::::l
 f:::::::f             r:::::r           a::::::::::aa:::a cc:::::::::::::::c        tt:::::::::::tt a::::::::::aa:::al::::::l
 fffffffff             rrrrrrr            aaaaaaaaaa  aaaa   cccccccccccccccc          ttttttttttt    aaaaaaaaaa  aaaallllllll
*/

/**
 * Fractal settings documentation can be found here:
 * https://fractal.build/guide/project-settings.html#the-fractal-js-file
 */

 'use strict';

/* Create a new Fractal instance and export it for use elsewhere if required */
const fractal = module.exports = require('@frctl/fractal').create();

/* Set the title of the project */
fractal.set('project.title', 'pekkos.com styleguide');

/* Tell Fractal where the components will live */
fractal.components.set('path', __dirname + '/src/fractal/patterns');
fractal.components.set('label', 'Patterns');
fractal.components.set('title', 'Patterns');


/* Tell Fractal where the documentation pages will live */
fractal.docs.set('path', __dirname + '/src/fractal/docs');

/* Specify a directory of static assets */
fractal.web.set('static.path', __dirname + '/src/fractal/static');

/* Set the static HTML build destination */
fractal.web.set('builder.dest', __dirname + '/_styleguide');



/* Customized Styleguide theme */

// require the Mandelbrot theme module
const mandelbrot = require('@frctl/mandelbrot');

// create a new instance with custom config options
const myCustomisedTheme = mandelbrot({
  "styles": [
    "/css/styleguide.css",
    "default"
  ]
});

// tell Fractal to use the configured theme by default
fractal.web.theme(myCustomisedTheme);



/* Adding a SVG inline helper */

const hbs = require('@frctl/handlebars')({
});
const instance = fractal.components.engine(hbs);

var fs = require('fs');
instance.handlebars.registerHelper('svg', function (iconName) {
  let path = __dirname + '/project/static/icons/' + iconName + '.svg';
  let content = fs.readFileSync(path, 'utf8');
  return content;
});


