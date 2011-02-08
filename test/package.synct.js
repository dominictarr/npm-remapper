
var it = require('it-is')
  , packager = require('../package')
//  , semver = require('../semver')
  , log = require('logger')
  , example =  
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


exports  ['load more complex example, into tree'] = function () {

  //datastructure for convienently managing npm deps.
  var Pack = packager()

  var tree = 
  Pack('npmdep','0.0.2',
  [ Pack('npm', '0.2.17')
  , Pack('traverse','0.2.4')
  , Pack('seq', '0.1.7', 
    [ Pack('chainsaw', '0.0.5', 
      [ Pack('traverse','0.2.4') ])
    , Pack('traverse','0.2.4') ] ) 
  ] )

  it(tree).has(example)
 
}

exports ['chaining API'] = function (){

  var Pack = packager()

  var tree = 
  Pack('npmdep','0.0.2')

  Pack.get('npmdep','0.0.2')
    .add('npm', '0.2.17')
    .add('traverse','0.2.4')
    .add('seq', '0.1.7')

  Pack.get('seq', '0.1.7')
    .add('chainsaw', '0.0.5')
    .add('traverse','0.2.4')

  Pack.get('chainsaw', '0.0.5')
    .add('traverse','0.2.4')

  it(tree).has(example)

}


exports ['linked version'] = function (){

 var Pack = packager()

  var tree = 
  Pack('traverser','9999.0.0-LINK-7889eeec')

}