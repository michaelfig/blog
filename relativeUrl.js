const path = require('path');
const urlFilter = require("@11ty/eleventy/src/Filters/Url");

const indexify = url => url.replace(/(\/[^.]*)$/, '$1index.html');

exports.urlMaybeRelative = function(url, pathPrefix = undefined) {
  if (pathPrefix !== undefined) {
    return urlFilter(url, pathPrefix);
  }
  const currentDir = this.ctx.page.url;
  const filteredUrl = urlFilter(url, '/');
  // Make sure the index.html is expressed.
  const indexUrl = indexify(filteredUrl);
  const u = new URL(indexUrl, 'make-relative://');
  if (u.protocol !== 'make-relative:') {
    return indexUrl;
  }
  const relativePath = `${path.relative(currentDir, u.pathname) || 'index.html'}`
  // if (url.includes('secondpost')) {
  // console.log({url, indexUrl, currentPath: currentDir, pathname: u.pathname, relativePath  });
  // }
  return relativePath;
};
