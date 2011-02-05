#!/usr/bin/env node
var Traverse = require('traverse');
var sys = require('sys');

exports.circular = function (assert) {
    var obj = { x : 3 };
    obj.y = obj;
    var foundY = false;
    Traverse(obj).forEach(function (x) {
        if (this.path.join('') == 'y') {
            assert.equal(
                sys.inspect(this.circular.node),
                sys.inspect(obj)
            );
            foundY = true;
        }
    });
    assert.ok(foundY);
};

