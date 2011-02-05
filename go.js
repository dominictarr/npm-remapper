
var Nihop = require('nih-op')
  , parser = new Nihop("npm-r -remap [package] [version] fileToRun.js\n")
  , NpmRemapper = require('./npm-remapper')

var remaps = {}

parser
  .option('remap','r',2)
  .describe('set package version to use','[package] [version]')
  .do(function (value){
    remaps[value[0]] = value[1]
  })
  
var parsed = parser.parse(process.argv.slice(2))

if(parsed.args.length) {
  var npmr = new NpmRemapper(module,remaps)

  npmr.require('./' + parsed.args[0])

  process.on('exit',function (){
  
    console.log("NpmRemapper " + new Date)

    console.log('./' + parsed.args[0] + " is using:\n")

    for(var i in npmr.depends){
      console.log(npmr.depends[i].toString())
    }
  })

} else {

  console.log(parser.usuage())

}
