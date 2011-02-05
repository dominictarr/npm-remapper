//package.js

module.exports = packager

function nv(name,version){
  return name + '@' + version
}

/*

build a dependency tree of packages.

to load module from a specific context,

var Pack = packager()
then create package representations with Pack(name,version, depends)

where depends is an array of calls to Pack

*/

var matchNV = /([\w-]+)@([\d.\w]+)/

function indent(string){
  return (''+ string).split('\n').map(function(e){
    return '  ' + e
  }).join('\n')

}

function packager (){

  var loaded = Pack.loaded =  {}
  Pack.get = function (name,value){
    return loaded[nv(name,value)]
  }
  Pack.root = null
  Pack.roots = function (){
    //this won't work if there is a circular dependency.

  }
  Pack.prototype = {
    toString: function (){
      var s = []
      s.push(this.name + '@' + this.version)
      for(var i in this.depends){
        s.push(indent(this.depends[i].toString()))
      }
      return '{ ' + s.join('\n') + ' }'//(s.length > 1 ? '\n}' : ' }')
    }
  , add: function (name,version){
    this.depends[name] = Pack(name,version)
    return this
  }
  }
  return Pack

  function Pack (name,version,depends){
    var id = nv(name,version)
    if(loaded[id])
      return loaded[id]
    if(!(this instanceof Pack)) return new Pack(name,version,depends)

    if(!Pack.root)
      Pack.root = this

    var self = this
    
    this.name = name
    this.version = version
    this.depends = {}
    
    if(!loaded[id])
      loaded[id] = this

    if(depends)
    depends.forEach(function (e){
      self.depends[e.name] = e    
    })
  }
}

