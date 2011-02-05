//npm-remapper.synct.js

var it = require('it-is')
  , NpmRemapper = require('../npm-remapper')
  , semver = require('npm/utils/semver')
  , packager = require('../package')
  , npm_path = process.env.HOME + '/dev/npm-remapper/fake_npm_root/.npm/'

exports ['create instance'] = function (){

  it(NpmRemapper(module))
    .instanceof(NpmRemapper)

  it(NpmRemapper(module))
    .property('require',it.function())
    .property('flatDepends',it.instanceof(Array))
}

exports ['can load npm modules'] = function (){

  var npmr = NpmRemapper(module)
    , class = npmr.require('../fake_npm_root/class-js')

  it(class)
    .has({
       ctor: it.function()
     , proto: it.function()
     , subclass: it.function()
    })

  it(npmr.flatDepends)
    .has([{
        name: 'class-js'
      , version: function (x){ it(semver.valid(x)).ok() }
      }])
}


function assertLoadModule(name,version,api,depends){
  
  var remaps = {}
  remaps[name] = version
  
  var npmr = NpmRemapper(module, remaps)

  var mod = npmr.require('../fake_npm_root/' + name)

  it(mod)
    .has(api || {})

  it(npmr.flatDepends)
    .has([{name:name, version: version}].concat(depends || []))

  return npmr
}

exports ['can remap modules to versions2'] = function (){

  assertLoadModule('class-js','0.0.1',{
       new: it.function() //API of class-js@0.0.1
     , ctor: it.function()
     , proto: it.function()
     , subclass: it.function()
    })

  assertLoadModule('class-js','0.0.2',{
       init: it.function() //API of class-js@0.0.2
     , ctor: it.function()
     , proto: it.function()
     , subclass: it.function()
    })
}


exports ['load more complex example'] = function (){

  var npmr = assertLoadModule('npmdep','0.0.2',{},[
    {name: 'npm', version: '0.2.17'}
  , {name: 'seq', version: '0.1.7'}
  , {name: 'traverse', version: '0.2.4'}
  , {name: 'chainsaw', version: '0.0.5'}
  ])
}

exports ['load more complex into tree'] = function (){

  var npmr = NpmRemapper(module)
    , Pack = packager()
    , npmdep = npmr.require('../fake_npm_root/npmdep')
    , class = npmr.require('../fake_npm_root/class-js')
    , example1 =  
      { name: 'npmdep'
      , version: '0.0.2'
      , depends: 
        { npm: 
          { name: 'npm'
          , version: '0.2.17' }
        , traverse: traverse = 
          { name: 'traverse', version: '0.2.4' }
        , seq: 
          { name: 'seq'
          , version: '0.1.7'
          , depends: 
            { chainsaw: 
              { name: 'chainsaw'
              , version: '0.0.5'
              , depends: {traverse: traverse} }
            , traverse: traverse
            }
          }
        } 
      }
    , example2 = 
      { name: 'class-js'
      , version: '0.0.2' }
  
  it(npmr.depends)
    .has({
      npmdep: example1
    , 'class-js': example2
    })
}