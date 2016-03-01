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

    var Grid = require('./grid.js');
    var _ = require('lodash');

    var module = function () {
        this.ary = new Array(6);
        for (var i=0;i<this.ary.length; i++) {
            this.ary[i] = new Array(8);
            for (var j=0; j<this.ary[i].length; j++) {
                this.ary[i][j] = new Grid(this, j, i);
            }
        }
    };

    module.prototype.getToy = function(x, y) {
        return this.ary[x][y].value;
    };

    module.prototype.rendar = function() {
        var box = $(".box");

        for (var i=0, len=this.ary.length; i<len; i++) {
            var gridLine = $("<div class='gird-line'></div>");
            for(var j = 0; j < this.ary[i].length; j++) {
                gridLine.append(this.ary[i][j].rendar());
            }
            box.append(gridLine);
        }

    };

    module.prototype.scoring = function() {
        var toys = _.map(this.ary, function(v) {
            return _.map(v, function(w) {
                return w.value() || null;
            })
        })
        console.log("scoring");
        console.log(toys);

		// スコア計算追加部分
		var Score = require('./score.js');
		var score = new Score(toys);
		return score.calc();
    };

    module.prototype.removeToy = function(id) {
        for (var i=0, len=this.ary.length; i<len; i++) {
            for(var j = 0; j < this.ary[i].length; j++) {
                var toy = this.ary[i][j].value();
                toy && toy.id === id
                    && this.ary[i][j].deactivate();
            }
        }
    };

    module.prototype.init = function() {
        for (var i=0, len=this.ary.length; i<len; i++) {
            for(var j = 0; j < this.ary[i].length; j++) {
                if (this.ary[i][j].toy) {
                    this.ary[i][j].toy = null;
                }
            }
        }
        $(".toy").remove();
    };

    module.prototype.findOverlapGrid = function(toy) {
        var grid = []
        for (var i=0, len=this.ary.length; i<len; i++) {
            for(var j = 0; j < this.ary[i].length; j++) {
                overlaps(toy, this.ary[i][j].$dom)
//                    && this.ary[i][j].put(toy);
                    && grid.push(this.ary[i][j]);
            }
        }

        for (var i=0; i<grid.length; i++) {
            if (grid[i].value()) {
                console.log(grid[i].x);
                console.log(grid[i].y);
                console.log("comflict tow toys!");
                return;
            }
        }

        for (var i=0; i<grid.length; i++) {
            grid[i].insertToy(toy);
        }

        // scoring
        var score = this.scoring();
        console.log(score);
        $(".score").text(score);

        return grid;
    };

    var overlaps = (function () {
        function getPositions( elem ) {
            var pos, width, height;
            pos = elem.position();
            width = elem.width();
            height = elem.height();
            return [ [ pos.left, pos.left + width ], [ pos.top, pos.top + height ] ];
        }

        function comparePositions( p1, p2 ) {
            var r1, r2;
            r1 = p1[0] < p2[0] ? p1 : p2;
            r2 = p1[0] < p2[0] ? p2 : p1;
            return r1[1] - r2[0] > 3 || r1[0] === r2[0];
        }

        return function ( a, b ) {
            var pos1 = getPositions( a ),
                pos2 = getPositions( b );
            return comparePositions( pos1[0], pos2[0] ) && comparePositions( pos1[1], pos2[1] );
        };
    })();

    return module;
});
