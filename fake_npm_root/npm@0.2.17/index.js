#!/usr/bin/env node
// generated by npm, please don't touch!
var dep = require('path').join(__dirname, "./../.npm/npm/0.2.17/node_modules")
var depMet = require.paths.indexOf(dep) !== -1
var bundle = dep.replace(/node_modules$/, 'package/node_modules')
var bundleMet = require.paths.indexOf(bundle) !== -1
var from = "./../.npm/npm/0.2.17/package/npm"

if (!depMet) require.paths.unshift(dep)
if (!bundleMet) require.paths.unshift(bundle)
module.exports = require(from)

if (!depMet) {
  var i = require.paths.indexOf(dep)
  if (i !== -1) require.paths.splice(i, 1)
}
if (!bundleMet) {
  var i = require.paths.indexOf(bundle)
  if (i !== -1) require.paths.slice(i, 1)
}
