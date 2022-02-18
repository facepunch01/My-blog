const htmlmin = require('html-minifier')
const eleventyGoogleFonts = require("eleventy-google-fonts");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

const now = String(Date.now())

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addWatchTarget('./styles/tailwind.config.js')
  eleventyConfig.addWatchTarget('./styles/tailwind.css')
  eleventyConfig.addPlugin(eleventyGoogleFonts);

  eleventyConfig.addPassthroughCopy({
    './node_modules/alpinejs/dist/cdn.js': './js/alpine.js',
  })
  eleventyConfig.addPassthroughCopy({
    './node_modules/animejs/lib/anime.min.js': './js/anime.min.js',
  })
  eleventyConfig.addPassthroughCopy({
    './myjs.js': './js/myjs.js',
  })
  eleventyConfig.setTemplateFormats(["jpg", "png", "md", "njk"]);
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->",
  });

  eleventyConfig.addShortcode('version', function () {
    return now
  })

  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (
      process.env.ELEVENTY_PRODUCTION &&
      outputPath &&
      outputPath.endsWith('.html')
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      })
      return minified
    }

    return content
  })
}
