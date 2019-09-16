/*
                    lllllll                                                                                             tttt
                    l:::::l                                                                                          ttt:::t
                    l:::::l                                                                                          t:::::t
                    l:::::l                                                                                          t:::::t
    eeeeeeeeeeee     l::::l     eeeeeeeeeeee    vvvvvvv           vvvvvvv    eeeeeeeeeeee    nnnn  nnnnnnnn    ttttttt:::::ttttttt    yyyyyyy           yyyyyyy
  ee::::::::::::ee   l::::l   ee::::::::::::ee   v:::::v         v:::::v   ee::::::::::::ee  n:::nn::::::::nn  t:::::::::::::::::t     y:::::y         y:::::y
 e::::::eeeee:::::ee l::::l  e::::::eeeee:::::ee  v:::::v       v:::::v   e::::::eeeee:::::een::::::::::::::nn t:::::::::::::::::t      y:::::y       y:::::y
e::::::e     e:::::e l::::l e::::::e     e:::::e   v:::::v     v:::::v   e::::::e     e:::::enn:::::::::::::::ntttttt:::::::tttttt       y:::::y     y:::::y
e:::::::eeeee::::::e l::::l e:::::::eeeee::::::e    v:::::v   v:::::v    e:::::::eeeee::::::e  n:::::nnnn:::::n      t:::::t              y:::::y   y:::::y
e:::::::::::::::::e  l::::l e:::::::::::::::::e      v:::::v v:::::v     e:::::::::::::::::e   n::::n    n::::n      t:::::t               y:::::y y:::::y
e::::::eeeeeeeeeee   l::::l e::::::eeeeeeeeeee        v:::::v:::::v      e::::::eeeeeeeeeee    n::::n    n::::n      t:::::t                y:::::y:::::y
e:::::::e            l::::l e:::::::e                  v:::::::::v       e:::::::e             n::::n    n::::n      t:::::t    tttttt       y:::::::::y
e::::::::e          l::::::le::::::::e                  v:::::::v        e::::::::e            n::::n    n::::n      t::::::tttt:::::t        y:::::::y
 e::::::::eeeeeeee  l::::::l e::::::::eeeeeeee           v:::::v          e::::::::eeeeeeee    n::::n    n::::n      tt::::::::::::::t         y:::::y
  ee:::::::::::::e  l::::::l  ee:::::::::::::e            v:::v            ee:::::::::::::e    n::::n    n::::n        tt:::::::::::tt        y:::::y
    eeeeeeeeeeeeee  llllllll    eeeeeeeeeeeeee             vvv               eeeeeeeeeeeeee    nnnnnn    nnnnnn          ttttttttttt         y:::::y
                                                                                                                                            y:::::y
                                                                                                                                           y:::::y
                                                                                                                                          y:::::y
                                                                                                                                         y:::::y
                                                                                                                                        yyyyyyy

https://www.11ty.io
*/



const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
};

module.exports = function (eleventyConfig) {

  // Aliases are in relation to the _includes folder
  eleventyConfig.addLayoutAlias('post', 'layouts/post.html');
  eleventyConfig.addLayoutAlias('default', 'layouts/default.html');

  // Use the default sorting algorithm in reverse (descending dir, date, filename)
  // Note that using a template engine’s `reverse` filter might be easier here
  eleventyConfig.addCollection("post", function (collection) {
    // return collection.getAllSorted().reverse();
    return collection.getFilteredByGlob('./src/11ty/_posts/*.md').reverse();
  });

  eleventyConfig.addCollection("page", function (collection) {
    return collection.getAllSorted().reverse();
  });

  // Defines shortcode for generating post excerpts
  eleventyConfig.addShortcode('excerpt', post => extractExcerpt(post));



  return {
    dir: {
      input: "./src/11ty",
      output: "./_site"
    }
  }
};




/**
 * Extracts the excerpt from a document.
 *
 * @param {*} doc A real big object full of all sorts of information about a document.
 * @returns {String} the excerpt.
 */

const excerptMinimumLength = 140;
const excerptSeparator = '<!--more-->'

function extractExcerpt(doc) {
  if (!doc.hasOwnProperty('templateContent')) {
    console.warn('Failed to extract excerpt: Document has no property `templateContent`.');
    return;
  }

  const content = doc.templateContent;

  if (content.includes(excerptSeparator)) {
    return content.substring(0, content.indexOf(excerptSeparator)).trim();
  }
  else if (content.length <= excerptMinimumLength) {
    return content.trim();
  }

  const excerptEnd = findExcerptEnd(content);
  return content.substring(0, excerptEnd).trim();
}


/**
 * Finds the end position of the excerpt of a given piece of content.
 * This should only be used when there is no excerpt marker in the content (e.g. no `<!--more-->`).
 *
 * @param {String} content The full text of a piece of content (e.g. a blog post)
 * @param {Number?} skipLength Amount of characters to skip before starting to look for a `</p>`
 * tag. This is used when calling this method recursively.
 * @returns {Number} the end position of the excerpt
 */
function findExcerptEnd(content, skipLength = 0) {
  if (content === '') {
    return 0;
  }

  const paragraphEnd = content.indexOf('</p>', skipLength) + 4;

  if (paragraphEnd < excerptMinimumLength) {
    return paragraphEnd + findExcerptEnd(content.substring(paragraphEnd), paragraphEnd);
  }

  return paragraphEnd;
}
