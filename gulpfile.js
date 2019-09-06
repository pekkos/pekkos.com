
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

/* Default set of tasks */
require('./gulp/_default')();


/* Sass and CSS tasks */
require('./gulp/stylelint')();
require('./gulp/sass')();
require('./gulp/postcss')();
require('./gulp/cssmin')();


/* HTML tasks */
require('./gulp/html')();

/* Copy files between instances */
require('./gulp/copy')();

/* Run Fractal tasks */
require('./fractal')();


/* Deploy tasks */
require('./gulp/deploy')();
