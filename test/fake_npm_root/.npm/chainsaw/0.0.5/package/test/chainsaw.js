var Chainsaw = require('chainsaw');

exports.getset = function (assert) {
    var to = setTimeout(function () {
        assert.fail('builder never fired');
    }, 50);
    
    var ch = Chainsaw(function (saw) {
        clearInterval(to);
        var num = 0;
        
        this.get = function (cb) {
            cb(num);
            saw.next();
        };
        
        this.set = function (n) {
            num = n;
            saw.next();
        };
        
        var ti = setTimeout(function () {
            assert.fail('end event not emitted');
        }, 50);
        
        saw.on('end', function () {
            clearTimeout(ti);
            assert.equal(times, 3);
        });
    });
    
    var times = 0;
    ch
        .get(function (x) {
            assert.equal(x, 0);
            times ++;
        })
        .set(10)
        .get(function (x) {
            assert.equal(x, 10);
            times ++;
        })
        .set(20)
        .get(function (x) {
            assert.equal(x, 20);
            times ++;
        })
    ;
};

exports.nest = function (assert) {
    var ch = (function () {
        var vars = {};
        return Chainsaw(function (saw) {
            this.do = function (cb) {
                saw.nest(cb, vars);
            };
        });
    })();
    
    var order = [];
    var to = setTimeout(function () {
        assert.fail("Didn't get to the end");
    }, 50);
    
    ch
        .do(function (vars) {
            vars.x = 'y';
            order.push(1);
            
            this
                .do(function (vs) {
                    order.push(2);
                    vs.x = 'x';
                })
                .do(function (vs) {
                    order.push(3);
                    vs.z = 'z';
                })
            ;
        })
        .do(function (vars) {
            vars.y = 'y';
            order.push(4);
        })
        .do(function (vars) {
            assert.eql(order, [1,2,3,4]);
            assert.eql(vars, { x : 'x', y : 'y', z : 'z' });
            clearTimeout(to);
        })
    ;
};

exports.builder = function (assert) {
    var cx = Chainsaw(function (saw) {
        this.x = function () {};
    });
    assert.ok(cx.x);
    
    var cy = Chainsaw(function (saw) {
        return { y : function () {} };
    });
    assert.ok(cy.y);
    
    var cz = Chainsaw(function (saw) {
        return { z : function (cb) { saw.nest(cb) } };
    });
    assert.ok(cz.z);
    
    var to = setTimeout(function () {
        assert.fail("Nested z didn't run");
    }, 50);
    
    cz.z(function () {
        clearTimeout(to);
        assert.ok(this.z);
    });
};

this.attr = function (assert) {
    var to = setTimeout(function () {
        assert.fail("attr chain didn't finish");
    }, 50);
    
    var xy = [];
    var ch = Chainsaw(function (saw) {
        this.h = {
            x : function () { 
                xy.push('x');
                saw.next();
            },
            y : function () {
                xy.push('y');
                saw.next();
                assert.eql(xy, ['x','y']);
                clearTimeout(to);
            }
        };
    });
    assert.ok(ch.h);
    assert.ok(ch.h.x);
    assert.ok(ch.h.y);
    
    ch.h.x().h.y();
};

exports.down = function (assert) {
    var error = null;
    var s;
    var ch = Chainsaw(function (saw) {
        s = saw;
        this.raise = function (err) {
            error = err;
            saw.down('catch');
        };
        
        this.do = function (cb) {
            cb.call(this);
        };
        
        this.catch = function (cb) {
            if (error) {
                saw.nest(cb, error);
                error = null;
            }
            else saw.next();
        };
    });
    
    var to = setTimeout(function () {
        assert.fail(".do() after .catch() didn't fire");
    }, 50);
    
    ch
        .do(function () {
            this.raise('pow');
        })
        .do(function () {
            assert.fail("raise didn't skip over this do block");
        })
        .catch(function (err) {
            assert.equal(err, 'pow');
        })
        .do(function () {
            clearTimeout(to);
        })
    ;
};

exports.trap = function (assert) {
    var error = null;
    var ch = Chainsaw(function (saw) {
        var pars = 0;
        var stack = [];
        var i = 0;
        
        this.par = function (cb) {
            pars ++;
            var j = i ++;
            cb.call(function () {
                pars --;
                stack[j] = [].slice.call(arguments);
                saw.down('result');
            });
            saw.next();
        };
        
        this.join = function (cb) {
            saw.trap('result', function () {
                if (pars == 0) {
                    cb.apply(this, stack);
                    saw.next();
                }
            });
        };
        
        this.raise = function (err) {
            error = err;
            saw.down('catch');
        };
        
        this.do = function (cb) {
            cb.call(this);
        };
        
        this.catch = function (cb) {
            if (error) {
                saw.nest(cb, error);
                error = null;
            }
            else saw.next();
        };
    });
    
    var to = setTimeout(function () {
        assert.fail(".do() after .join() didn't fire");
    }, 100);
    var tj = setTimeout(function () {
        assert.fail('.join() never fired');
    }, 100);
    
    var joined = false;
    ch
        .par(function () {
            setTimeout(this.bind(null, 1), 50);
        })
        .par(function () {
            setTimeout(this.bind(null, 2), 25);
        })
        .join(function (x, y) {
            assert.equal(x[0], 1);
            assert.equal(y[0], 2);
            clearTimeout(tj);
            joined = true;
        })
        .do(function () {
            clearTimeout(to);
            assert.ok(joined);
        })
    ;
};

exports.jump = function (assert) {
    var to = setTimeout(function () {
        assert.fail('builder never fired');
    }, 50);
    
    var xs = [ 4, 5, 6, -4, 8, 9, -1, 8 ];
    var xs_ = [];
    
    var ch = Chainsaw(function (saw) {
        this.x = function (i) {
            xs_.push(i);
            saw.next();
        };
        
        this.y = function (step) {
            var x = xs.shift();
            if (x > 0) saw.jump(step);
            else saw.next();
        };
        
        saw.on('end', function () {
            clearTimeout(to);
            assert.eql(xs, [ 8 ]);
            assert.eql(xs_, [ 1, 1, 1, 1, 2, 3, 2, 3, 2, 3 ]);
        });
    });
    
    ch
        .x(1)
        .y(0)
        .x(2)
        .x(3)
        .y(2)
    ;
};
