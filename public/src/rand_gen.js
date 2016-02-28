(function (Definition) {

    // use webpack
    module.exports = Definition();
    // export to window
    /*
    (function() {
        window[module_name] = Definition();
    })(module_name);
     */

})(function () {
    'use strict';

    var Toy = require('./toy.js');
    var data = require('./data.js');
    var _ = require('lodash');

    var module = function(){
        this.isRendar = new Array(6);
        for(var i = 0; i < this.isRendar.length; i++) {
            this.isRendar[i] = new Array(8);
        }
    };

    module.prototype.init = function() {
        this.isRendar = new Array(6);
        for(var i = 0; i < this.isRendar.length; i++) {
            this.isRendar[i] = new Array(8);
        }
    }

    module.prototype.box_gen = function(box, n) {
        var region = 0;

        var toys = [];

        // sampling
        for(var i = 0; i < 7+n; i++) {
            var toy = _.cloneDeep(data[_.random(0, data.length - 1)]);

            var p = this.sampling_pos(toy);
            if (p) {
                region += toy.w * toy.h;

                toy.x = p[0];
                toy.y = p[1];
                toys.push(toy);
            } else {
                i--;
            }

            if (region > 36) break;
            if (region > 16 && toys.length + n > 5) break;
        }

        // 配置
        _.map(toys, function(v) {
            var toy = new Toy(v.w, v.h, v.image, v.class, "");
            toy.rendar(box, v.x, v.y);
        });

        return toys;
    };

    var sampling = function() {
        return data[_.random(0, data.length - 1)];
    };

    module.prototype.sampling_pos = function(toy) {
        var x = _.random(0,5);
        var y = _.random(0,7);
        if (toy.w + x > 6 || toy.h + y > 8) return false;

        for(var i = x; i < toy.w + x; i++) {
            for(var j = y; j < toy.h + y; j++) {
                if (this.isRendar[i][j] === true) return false;

                this.isRendar[i][j] = true;
            }
        }

        return [x, y];
    };

    return module;
});
