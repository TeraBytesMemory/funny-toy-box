(function () {

    var Box = require('./box.js');
    var Toy = require('./toy.js');
    var Rnd = require('./rand_gen.js');

    $(document).ready(function() {
        var box = new Box();
        box.rendar();

        $("#title").on("click", function() {
            $("#title").toggleClass("active");

            var rnd = new Rnd();
            rnd.box_gen(box, 0);
        });
    });
})();
