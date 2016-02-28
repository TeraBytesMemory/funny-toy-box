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

    var module = function (box, x, y) {
        this.toy = null;

        this.box = box;
        this.x = x;
        this.y = y;

        this.checked;

        this.dom;
    };

    module.prototype.rendar = function() {
        var self = this;

        this.$dom = $("<div class='box-grid red lighten-3'></div>").droppable({
            "drop": function (event, ui) {
                self.box.findOverlapGrid(ui.draggable);
//                self.put($dom);
            },
            "out": function(event, ui) {
                if (self.toy) {
                    console.log("out");
                    console.log(ui.draggable);
                    self.box.removeToy(self.toy.id);
                }
//                self.deactivate();
            }
        });

        return this.$dom;
    };


    module.prototype.deactivate = function() {
        if (this.toy) {
            console.log("deactivate");
            console.log(this.toy);
            console.log(this.x);
            console.log(this.y);
            this.toy = null;
        }
    }

    module.prototype.value = function() {
        return this.toy;
    };

    module.prototype.insertToy = function($dom) {
        console.log(this.x);
        console.log(this.y);
        this.toy = $dom.data("toy-obj") || $dom;
        console.log(this.toy);
    };

    module.prototype.put = function($dom) {
        console.log($dom);
        if (!this.toy) {
            this.toy = $dom.data("toy-obj");
            console.log(this.x);
            console.log(this.y);
            console.log(this.toy);
        } else {
            console.log(this.x);
            console.log(this.y);
            console.log("comflict tow toys!");
        }
    };

    return module;
});
