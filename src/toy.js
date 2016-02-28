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

    /*
     * @string image
     * @int class
     * @string style
     */
    var _gridSize = 75;

    var module = function (x, y, image, cls, style) {
        this.x = x;
        this.y = y;

        this.cls = cls;
        this.id = new Date().getTime();

        this.image = image;
        this.style = style;

        this.deg = 0;
    };

    module.prototype.rendar = function (box, x, y) {
        var self = this;

        this.$dom = $("<div class='toy'></div>")
                .height(75 * this.y)
                .width(75 * this.x)
                .draggable({
                    snap: ".box-grid"
                });
        var img = $("<img>")
                .attr("src", this.image);

        this.$dom.on("click", function() {
            var h = $(this).height();
            var w = $(this).width();

            self.deg += 90;
            $(this).rotate(self.deg);

            $(this).height(w);
            $(this).width(h);

        });

        this.$dom.data("toy-obj", this);
        console.log(this.$dom.data("toy-obj"));

        this.$dom.append(img);
        $(".toy-factory").append(this.$dom);


        if (box && x && y) {
            var offset = $(".box").offset();

            this.$dom.css("position", "absolute");
            this.$dom.css("left", offset.left + x * 75);
            this.$dom.css("top", offset.top + y * 75);

            box.findOverlapGrid(this.$dom);
        }

    };

    return module;
});
