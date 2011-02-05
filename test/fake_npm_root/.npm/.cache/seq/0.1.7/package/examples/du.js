var Seq = require('seq');
var fs = require('fs');

exports = module.exports = function du (base, cb) {
    fs.stat(base, function (err, stat) {
        if (err) {
            console.error(err.stack);
        }
        else if (!stat.isDirectory()) {
            cb(stat.size);
        }
        else {
            fs.readdir(base, function (err, files) {
                if (err) console.error(err.stack);
                
                var sizes = 0, rem = files.length;
                files.forEach(function (file) {
                    du(base + '/' + file, function (size) {
                        sizes += size;
                        rem --;
                        if (rem === 0) cb(sizes);
                    });
                });
            })
        }
    })
};

exports.du = function (base, cb) {
    Seq('.').parMap(function (file) {
        var encore = this.encore;
        Seq()
            .seq(fs.stat, file)
            .seq(function (stat) {
                if (stat.isDirectory()) {
                    fs.readdir(file, encore(this));
                }
                else {
                    this(null, [stat.size]);
                }
            })
            .seq(function (sizes) {
                this(null, sizes.reduce(
                    function (sum, s) { return sum + x }, 0
                ));
            })
            .seq(this)
        ;
    })
};
