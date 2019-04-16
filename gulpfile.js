
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


/**
 * Place all gulp modules in the /gulp/ folder and include (require) them here
 */

/* Default task */
require('./gulp/_default')();


/* Run Eleventy tasks */
require('./gulp/eleventy')();


/* Run Fractal tasks */
require('./fractal')();


/* Sass and CSS tasks */
// require('./gulp/sass')();
// require('./gulp/postcss')();
// require('./gulp/cssmin')();
// require('./gulp/stylelint')();

/* Run Fractal tasks */
// require('./fractal')();

/* Deploy tasks */
// require('./gulp/deploy')();

/* Run Jekyll tasks */
// require('./gulp/jekyll')();






