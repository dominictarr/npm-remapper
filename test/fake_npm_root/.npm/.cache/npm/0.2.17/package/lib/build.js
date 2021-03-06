
// npm build command

// everything about the installation after the creation of
// the .npm/{name}/{version}/package folder.
// linking the modules into the npm.root,
// resolving dependencies, etc.

// This runs AFTER install or link are completed.

var npm = require("../npm")
  , log = require("./utils/log")
  , chain = require("./utils/chain")
  , fetch = require("./utils/fetch")
  , fs = require("./utils/graceful-fs")
  , path = require("path")
  , semver = require("./utils/semver")
  , mkdir = require("./utils/mkdir-p")
  , lifecycle = require("./utils/lifecycle")
  , readJson = require("./utils/read-json")
  , ini = require("./utils/ini")
  , sys = require("./utils/sys")
  , writeShim = require("./utils/write-shim")
  , link = require("./utils/link")
  , linkIfExists = link.ifExists
  , shimIfExists = writeShim.ifExists
  , readInstalled = require("./utils/read-installed")
  , asyncMap = require("./utils/async-map")
  , loadPackageDefaults = require("./utils/load-package-defaults")
  , exec = require("./utils/exec")
  , conf = ini.configList

module.exports = build
build.usage = "npm build <folder>\n(this is plumbing)"
build.linkBins = linkBins
build.linkModules = linkModules

// pkg is either a "package" folder, or a package.json data obj, or an
// object that has the package.json data on the _data member.
function build (args, cb) {
  readAll(args, function (er, args) {
    if (er) return cb(er)
    // do all preinstalls, then check deps, then install all, then finish up.
    chain
      ( [asyncMap, args, function (a, cb) {
          return lifecycle(a, "preinstall", cb)
        }]
      , [asyncMap, args, function (a, cb) {
          return resolveDependencies(a, cb)
        }]
      , [ asyncMap
        , args
        , function (pkg, cb) {
            linkModules(pkg, path.join(npm.root, pkg.name+"@"+pkg.version), cb)
          }
        , linkBins
        , linkMans
        ]
      // must rebuild bundles serially, because it messes with configs.
      , [chain].concat(args.map(function (a) { return [rebuildBundle, a] }))
      , [linkDependencies, args]
      , [finishBuild, args]
      , cb
      )
  })
}

function rebuildBundle (pkg, cb) {
  if (!npm.config.get("rebuild-bundle")) return cb()
  var bundle = path.join( npm.dir, pkg.name, pkg.version
                        , "package", "node_modules")
  fs.stat(bundle, function (er, s) {
    if (er || !s.isDirectory()) return cb()
    log(pkg._id, "rebuilding bundled dependencies")
    conf.unshift({ root : bundle
                 , binroot : null
                 , manroot : null
                 })
    npm.commands.rebuild([], function (er, data) {
      conf.shift()
      cb(er, data)
    })
  })
}

// might be overwritten.
var autoUpdate = function (pkg, cb) {
  var auto = npm.config.get("update-dependents")
  if (!auto) {
    autoUpdate = function (_, cb) { return cb() }
    return log.verbose(
      "update-dependents disabled by config", "update-dependents", cb)
  }
  pkg = pkg && pkg._data || pkg
  if (auto === "always") {
    return npm.commands["update-dependents"]([pkg], cb)
  }
  readInstalled(pkg.name, function (er, inst) {
    if (er) return cb(er)
    var versions = Object.keys(inst[pkg.name])
                   .filter(function (v) { return v !== pkg.version })
                   .sort(semver.sort)
      , maxHave = versions.pop()
    if (!maxHave) return cb()
    if (!semver.gt(pkg.version, maxHave)) return log.verbose(
      "downgrade, not updating dependencencies", "update-dependents", cb)
    npm.commands["update-dependents"]([pkg], cb)
  })
}

// might be overwritten.
var autoActivate = function (pkg, cb) {
  var auto = npm.config.get("auto-activate")
  if (!auto) {
    autoActivate = function (_, cb) { return cb() }
    return log.verbose("auto-activate", "disabled by config", cb)
  }
  pkg = pkg && pkg._data || pkg
  // get the list of versions of this package.
  readInstalled(pkg.name, function (er, inst) {
    if (er) return cb(er)
    var versions = Object.keys(inst)
    if (auto !== "always" && versions.indexOf("active") !== -1) {
      log("another version already active", "auto-activate")
      log("to activate, do:   npm activate "+
        pkg.name+"@"+pkg.version, "auto-activate")
      return cb()
    }
    var u = pkg.name+"@"+pkg.version
    log.verbose(u, "auto-activate")
    npm.commands.activate([u], function (er) {
      // don't rollback the whole install if the activate fails.
      if (er) log.error(er, "Failed to update "+u)
      cb()
    })
  })
}

function readAll (folders, cb) {
  var data = []
    , errState = null
    , f = folders.length
  asyncMap(folders, function (folder, cb) {
    if (typeof folder === "object") return loadPackageDefaults(folder, cb)
    else if (folder.indexOf(npm.dir) !== 0) return cb(new Error(
      "The build command should only be used on folders inside the\n"+
      "npm folder.  Are you quite sure you know what you're doing?"))
    readJson(path.join(folder, "package", "package.json"), function (er, d) {
      if (er) {
        log.error(folder, "Error building")
        return cb()
      }
      // FIXME: in 0.3.0, remove this, and make it the default
      // behavior in read-json.js
      if (!er && d.main && d.modules && d.modules["index.js"]) delete d.main
      loadPackageDefaults(d, cb)
    })
  }, cb)
}

// make sure that all the dependencies have been installed.
function resolveDependencies (pkg, cb) {
  if (!pkg) return topCb(new Error(
    "Package not found to resolve dependencies"))
  // link foo-1.0.3 to ROOT/.npm/{pkg}/{version}/node_modules/foo

  // see if it's bundled already
  var bundleDir = path.join( npm.dir, pkg.name, pkg.version
                           , "package", "node_modules" )
   , deps = pkg.dependencies && Object.keys(pkg.dependencies) || []
  log.verbose([pkg, deps], "deps being resolved")
  fs.readdir(bundleDir, function (er, bundledDeps) {
    if (er) bundledDeps = []
    bundledDeps.forEach(function (bd) {
      var i = deps.indexOf(bd)
      if (i !== -1) deps.splice(i, 1)
    })

    asyncMap(deps, function (i, cb) {
      var req = { name:i, version:pkg.dependencies[i] }
      log.verbose(req.name+"@"+req.version, "required")

      // see if we have this thing installed.
      fs.readdir(path.join(npm.dir, req.name), function (er, versions) {
        if (er) return cb(new Error(
          "Required package: "+req.name+"("+req.version+") not found."+
          "\n(required by: "+pkg._id+")"))
        // TODO: Get the "stable" version if there is one.
        // Look that up from the registry.
        var satis = semver.maxSatisfying(versions, req.version)
        if (satis) return cb(null, {name:req.name, version:satis})
        return cb(new Error(
          "Required package: "+req.name+"("+req.version+") not found. "+
          "(Found: "+JSON.stringify(versions)+")"+
          "\n(required by: "+pkg._id+")"))
      })
    }, function (er, found) {
      // save the resolved dependencies on the pkg data for later
      pkg._resolvedDeps = found
      cb(er, found)
    })
  })
}

function linkDependencies (args, cb) {
  // at this point, we know that all the packages in the "args" list have
  // been installed, and so have all the dependencies in each of their
  // _resolvedDeps array.
  // link each package's _resolvedDeps properly.
  asyncMap(args, function (pkg, cb) {
    log.verbose("linkDependencies", pkg._id, cb)
  }, dependentLink, dependencyLink, cb)
}

// for each dependency, link this pkg into the proper "dependent" folder
function dependentLink (pkg, cb) {
  asyncMap(pkg._resolvedDeps, function (dep, cb) {
    var dependents = path.join(npm.dir, dep.name, dep.version, "dependents")
      , to = path.join(dependents, pkg.name + "@" + pkg.version)
      , from = path.join(npm.dir, pkg.name, pkg.version)
    link(from, to, cb)
  }, cb)
}


// link each dep into this pkg's "node_modules" folder
function dependencyLink (pkg, cb) {
  var dependencies = path.join(npm.dir, pkg.name, pkg.version, "node_modules")
    , depBin = path.join(npm.dir, pkg.name, pkg.version, "dep-bin")
  asyncMap(pkg._resolvedDeps, function (dep, cb) {
    log.silly(dep, "dependency")
    var fromRoot = path.join(npm.dir, dep.name, dep.version)
      , dependsOn = path.join( npm.dir, pkg.name, pkg.version
                             , "dependson", dep.name + "@" + dep.version
                             )
    link(fromRoot, dependsOn, cb)
  }, function (dep, cb) {
    var depDir = path.join(npm.dir, dep.name, dep.version, "package")
    readJson(path.join(depDir, "package.json"), function (er, dep) {
      if (er) return cb(er)
      loadPackageDefaults(dep, function (er, dep) {
        if (er) return cb(er)
        asyncMap([dep], function (dep) {
          var toLib = path.join(dependencies, dep.name)
          linkModules(dep, toLib, cb)
        }, function (dep, cb) {
          // link the bins to this pkg's "dep-bin" folder.
          linkBins(dep, depBin, false, cb)
        }, cb)
      })
    })
  }, cb)
}

// link ROOT/.npm/{name}/{ver}/package/{man} to
// {manroot}/{section}/{man-basename}-{ver}{man-extname}
function linkMans (pkg, cb) {
  log.verbose(pkg._id, "linkMans")
  log.silly(pkg.man, "linkMans")
  var man = pkg.man
    , manroot = npm.config.get("manroot")
    , pkgDir = path.join(npm.dir, pkg.name, pkg.version, "package")
  if (!man || !manroot) return cb()
  exec("manpath", [], null, false, function (er, code, stdout, stderr) {
    var manpath = er ? [] : stdout.trim().split(":")
    if (manpath.indexOf(manroot) === -1) {
      log.warn("man pages installing to " + manroot + ", outside MANPATH")
    }
    asyncMap(man, function (man, cb) {
      var parseMan = man.match(/(.*)\.([0-9]+)(\.gz)?$/)
        , stem = parseMan[1]
        , sxn = parseMan[2]
        , gz = parseMan[3] || ""
        , bn = path.basename(stem)
        , manSrc = path.join( pkgDir, man )
        , manDest = path.join( manroot
                             , "man"+sxn
                             , (bn.indexOf(pkg.name) === 0 ? bn
                               : pkg.name + "-" + bn)
                               + "@" + pkg.version
                               + "." + sxn + gz
                             )
      // ln {cwd}/man {manroot}/man{sxn}/{bn}-{ver}.{sxn}{gz}
      log.silly(manSrc, "manSrc")
      log.silly(manDest, "manDest")
      linkIfExists(manSrc, manDest, cb)
    }, cb)
  })
}

// shim {target}/{module-name}
// to ROOT/.npm/{name}/{version}/package/{module-path}
function linkModules (pkg, target, cb) {
  log.silly(pkg.modules, "linkModules")
  log.verbose(target, "linkModules")
  if (target === npm.root
      && !target.match(/node_modules$/)
      && -1 === require.paths.indexOf(target)) {
    log.warn("modules installing to "+target+", outside NODE_PATH")
  }
  if (!pkg.modules) pkg.modules = {}
  var mod = pkg.modules

  // FIXME: remove in 0.3.0, and uncomment this functionality in
  // lib/utils/read-json.js
  if (pkg.main) {
    mod["index.js"] = pkg.main
    delete pkg.main
  }

  var versionDir = path.join(npm.dir, pkg.name, pkg.version)
    , pkgDir = path.join(versionDir, "package")

  asyncMap(Object.keys(mod), function (key, cb) {
    writeShim
      ( path.join(pkgDir, mod[key])
      , path.join(target, key.replace(/\.js$/, '')+".js")
      , path.join(versionDir, "node_modules")
      , cb
      )
  }, function (er) {
    if (er) return cb(er)
    mkdir(target, function (er) {
      if (er) return cb(er)
      pkg._npmConfig = npm.config.get()
      pkg._env = {}
      Object.keys(process.env).forEach(function (e) {
        if (!e.match(/^npm_/i)) return
        pkg._env[e] = process.env[e]
      })
      pkg._npmPaths = { root : npm.root
                      , dir : npm.dir
                      , cache : npm.cache
                      , tmp : npm.tmp
                      , package : pkgDir
                      , modules : target
                      , dependencies : path.join(versionDir, "node_modules")
                      }
      var pkgCode = "module.exports = "
                  + JSON.stringify(pkg, null, 2)
                  + "\n"
      delete pkg._npmConfig
      delete pkg._npmPaths
      fs.writeFile(path.join(target,"package.json.js"), pkgCode, "utf8", cb)
    })
  })
}

function linkBins (pkg, binroot, versioned, cb) {
  if (typeof cb !== "function") cb = versioned, versioned = true
  if (typeof cb !== "function") cb = binroot, binroot = null
  if (!pkg.bin) return cb()
  log.verbose(pkg._id, "linkBins")
  if (!binroot) {
    binroot = binroot || npm.config.get("binroot")
    if (binroot &&
        (!process.env.PATH || -1 === process.env.PATH.indexOf(binroot))) {
      log.warn("bins installing to "+binroot+", outside PATH")
    }
  }
  if (!binroot) return cb()
  var dep = path.join(npm.dir, pkg.name, pkg.version, "node_modules")
  asyncMap(Object.keys(pkg.bin).filter(function (i) {
    return i.charAt(0) !== "_"
  }), function (i, cb) {
    log.verbose(i+" "+pkg.bin[i], "linkBin")
    var to = path.join(binroot, i+(versioned ? "@"+pkg.version : ""))
      , from = path.join(npm.dir, pkg.name, pkg.version, "package", pkg.bin[i])
    shimTest(from, to, dep, cb)
  }, log.er(cb, "failed to link bins"))
}

function shimTest (from, to, dep, cb) {
  // if it needs a shim, then call writeShim
  // otherwise, just link it in.
  fs.stat(from, function S (er, s) {
    if (er && !from.match(/\.(js|node)$/)) {
      from += '.js'
      return fs.stat(from, S)
    }
    if (er) return cb(er)
    if (from.match(/\.(node|js)$/)) return writeShim(from, to, dep, cb)
    fs.readFile(from, function (er, data) {
      if (er) return cb(er)
      data = data.toString("ascii")
      var envNode = data.match(/#!(\/usr\/bin\/)?env node/)
        , node = data.match(/#!(\/usr(\/local)?\/bin\/)?node/)
      if (envNode && envNode.index === 0 || node && node.index === 0) {
        return writeShim(from, to, dep, cb)
      }
      return link(from, to, cb)
    })
  })
}

function finishBuild (args, cb) {
  chain(args.map(function (pkg) { return function (cb) {
    chain
      ( [lifecycle, pkg, "install"]
      , [lifecycle, pkg, "postinstall"]
      , [autoActivate, pkg]
      , [autoUpdate, pkg]
      , cb
      )
  }}).concat(args.map(function (pkg) {
    pkg = pkg && pkg._data || pkg
    return [ log, "Success: "+(pkg.name + "@"+pkg.version), "build" ]
  })).concat(cb))
}
