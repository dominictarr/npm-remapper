
//require.paths.unshift(process.env.HOME + '/dev/npm-remapper/fake_npm_root')

/*
I'm probably gonna encounter some weirdness when i'm running a test within the ./npm/N/V/package/test directory.

may need to tell it to ignore [path]/test/.* ?

so whats next?

give this a command line interface so can run a script and detect npm versions?

integrate into meta-test as plugin?
(plugin interface not actually implemented yet...

okay, -- make CLI for remapper.

*/

var modules = require('remap/modules')
  , resolveModule = require('remap/resolve').resolveModuleFilename
  , packager = require('./package')
  , semver = require('./semver').semver
  , npm_path = ".*/\\.npm\/"
  , pack  = new RegExp ('^(' + npm_path + ')([\\w-]+)\/(' + semver + ')\/(.*)')
  console.log(pack)
  
  
exports = module.exports = NpmRemapper
exports.NpmRemapper = NpmRemapper 
exports.match = nameVersion
exports.matchRegExp = pack

function nameVersion (filepath){
  var matched
  if(matched = pack(filepath)){
    return {
        name: matched[2]
      , version: matched[3] 
      , rest: matched[4]
      , path: matched[1]
      , toString: function (){
        return this.name +'@' + this.version
      }
    }
  }
}

function NpmRemapper(_module,remaps){
  if(!(this instanceof NpmRemapper)) return new NpmRemapper(_module,remaps)
 

  this.remaps = remaps = remaps || {}
  var deps = {}
  var Pack = packager()
  
  var makeMake = modules.useCache({}).makeMake
    , self = this
    , resolves = {}
    , rootset = {}
    , roots = {}
    
    rootset[_module.id] = true
    
  function resolve(request,module){
    var resolved = resolveModule(request,module)
      , matched = nameVersion(resolved[1])

    if(matched){
      var name = matched.name
        , version = matched.version

      if(remaps[name]){
//      console.log(name, '@', version, '->',remaps[name])
          version = remaps[name]
        resolved [1] = matched.path + name + '/' + version + '/' + matched.rest
      }

      resolves[resolved[0]] = resolved[1]

      if(rootset[module.id]){
        roots[name] = Pack(name,version)
      }

      if(resolves[module.id]){
        var nv2 = nameVersion(resolves[module.id])
        if(matched.name == nv2.name && matched.version == nv2.version)
          ; 
        else{
          Pack(nv2.name,nv2.version)
            .add(matched.name,version)
        }
      }

      if(!deps[name]){
        self.flatDepends.push({name: name, version: version})
        deps[name] = version
      }
    } else if(rootset[module.id]){
      rootset[resolved[0]] = true
    }

    return resolved
  }
  
  function make(module){
    return makeMake({resolve: resolve, make: make})(module)
  }

  this.require = make(_module)
  this.flatDepends = []
  this.depends = roots
}