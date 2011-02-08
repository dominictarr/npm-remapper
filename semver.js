//semver.js


var semver = "[v=]*[0-9]+"                // major
           + "\\.[0-9]+"                  // minor
           + "\\.[0-9]+"                  // patch
           + "\\.?" //don't know what this is meant to be, but npm made a directory with a dot here.
           + "(?:?-[0-9]+-?)?"                 // build
           + "(?:[a-zA-Z-][a-zA-Z0-9-\.:]*)?" // tag

  , match = new RegExp("^\\s*"+semver+"\\s*$")

function parse (string){
  return !!match(string)
}

exports.parse = parse
exports.match = match
exports.semver = semver
