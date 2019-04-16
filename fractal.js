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
 * Fractal documentation can be found here:
 * https://fractal.build/guide/project-settings.html#the-fractal-js-file
 */



'use strict';

/* To use gulp */
const gulp = require('gulp');


/*
 * Require the path module
 */
const path = require('path');

/*
 * Require the Fractal module
 */
const fractal = module.exports = require('@frctl/fractal').create();

/*
 * Give your project a title.
 */
fractal.set('project.title', 'pekkos.com');

/*
 * Tell Fractal where to look for components.
 */
//fractal.components.set('path', path.join(__dirname, '/source/patterns'));
fractal.components.set('path', __dirname + '/src/styleguide/patterns');
fractal.components.set('label', 'Patterns');
fractal.components.set('title', 'Patterns');

/*
 * Tell Fractal where to look for documentation pages.
 */
//fractal.docs.set('path', path.join(__dirname, '/source/docs'));
fractal.docs.set('path', __dirname + '/src/styleguide/docs');

/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
//fractal.web.set('static.path', path.join(__dirname, '/static'));
fractal.web.set('static.path', __dirname + '/src/styleguide/_static');


/*
To set the directory within which any static HTML exports of the web UI should
be generated, use the builder.dest setting:
*/

fractal.web.set('builder.dest', __dirname + '/_styleguide');


/* Preview */

fractal.components.set('default.preview', '@preview');
fractal.components.set('collate.preview', '@collate');


const logger = fractal.cli.console; // keep a reference to the fractal CLI console utility

module.exports = function () {

  gulp.task('fractal:start', function () {
    const server = fractal.web.server({
      sync: true
    });
    server.on('error', err => logger.error(err.message));
    return server.start().then(() => {
      logger.success(`Fractal server is now running at ${server.url}`);
    });
  });


  gulp.task('fractal:build', function () {
    const builder = fractal.web.builder();
    builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
    builder.on('error', err => logger.error(err.message));
    return builder.build().then(() => {
      logger.success('Fractal build completed!');
    });
  });

};
