module.exports = function (eleventyConfig) {

  // Aliases are in relation to the _includes folder
  eleventyConfig.addLayoutAlias('post', 'layouts/post.html');
  eleventyConfig.addLayoutAlias('default', 'layouts/default.html');

  // Use the default sorting algorithm in reverse (descending dir, date, filename)
  // Note that using a template engine’s `reverse` filter might be easier here
  eleventyConfig.addCollection("post", function (collection) {
    return collection.getAllSorted().reverse();
  });

  return {
    dir: {
      input: "./src",
      output: "./_site"
    }
  }
};
