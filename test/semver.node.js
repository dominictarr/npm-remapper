
var it = require('it-is')
  , semver = require('../semver')
  
  it([
    '0.0.0'
  , 'v0.0.0'
  , 'v9999.9999.9999'
  , 'v9999.9999.9999-link'
  , 'v9999.9999.9999-link-2sadf1adfs7asdf9'
  , 'v9999.9999.9999-2340-2sadf1adfs7asdf9'
  , 'v9999.9999.9999-2340-2sadf1adfs7asdf9'
  , '999.999.999.-LINK-2349fse9'
  , 'v9.99.99-2340-2sadf1adfs7asdf9'
  ]).every(function (e){
    it(semver.parse(e)).ok()
  })



  it([
    '0.0.x'
  , 'V0.0.0'
  , 'v333.9999'
  , 'x.y.z'
  , '0x.y.z'
  ]).every(function (e){
    it(semver.parse(e)).equal(false)
  })
