(function () {

    jQuery.fn.rotate = function(degrees) {

        $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                     '-moz-transform' : 'rotate('+ degrees +'deg)',
                     '-ms-transform' : 'rotate('+ degrees +'deg)',
                     'transform' : 'rotate('+ degrees +'deg)'});

        return $(this);
    };

    var Box = require('./box.js');
    var Toy = require('./toy.js');
    var Rnd = require('./rand_gen.js');

    var box = new Box();
    box.rendar();

    /*
    new Toy(1, 1, "./img/1x1_B.png", 1, "").rendar(box, 0, 0);
    new Toy(1, 1, "./img/1x1_B.png", 1, "").rendar(box, 5, 5);
    new Toy(1, 1, "./img/1x1_G.png", 2, "").rendar();
    new Toy(1, 4, "./img/1x4_G.png", 2, "").rendar();

    new Toy(2, 3, "./img/2x3_R.png", 3, "").rendar(box, 3, 1);
     */

    var rnd = new Rnd();
    rnd.box_gen(box, 0);
})();
