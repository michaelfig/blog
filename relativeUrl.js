const path = require('path');
const urlFilter = require("@11ty/eleventy/src/Filters/Url");

const indexify = url => url.replace(/(\/[^.]*)$/, '$1index.html');

exports.urlMaybeRelative = (url, pathPrefixOrPage = '/') => {
  if (typeof pathPrefixOrPage === 'string' || !pathPrefixOrPage) {
    const pathPrefix = pathPrefixOrPage;
    console.log('absolute url set for', url, pathPrefix);
    return urlFilter(url, pathPrefix);
  }
  const currentDir = pathPrefixOrPage.url;
  if (typeof currentDir !== 'string')  {
    throw new Error('urlMaybeRelative: page.url is not a string');
  }
  url = urlFilter(url, '/');
  // Make sure the index.html is expressed.
  const indexUrl = indexify(url);
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
