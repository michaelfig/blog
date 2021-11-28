const path = require('path');
const urlFilter = require("@11ty/eleventy/src/Filters/Url");

let currentPath;

exports.setCurrentPath = p => { currentPath = p; return ''; };

exports.urlRelativeToCurrentPath = (url, pathPrefix = undefined) => {
  if (currentPath === undefined || pathPrefix !== undefined) {
    return urlFilter(url, pathPrefix);
  }
  url = urlFilter(url, '/');
  const u = new URL(url, 'make-relative://');
  if (u.protocol !== 'make-relative:') {
    return url;
  }
  return `${path.relative(currentPath, u.pathname) || '.'}`;
};
