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

    var module = [
        {
            class: 1,
            image: "./img/1x1B.png",
            style: "",
            w: 1,
            h: 1
        },
        {
            class: 1,
            image: "./img/1x4B.png",
            style: "",
            w: 1,
            h: 4
        },
        {
            class: 1,
            image: "./img/2x3B.png",
            style: "",
            w: 2,
            h: 3
        },
        {
            class: 2,
            image: "./img/1x1G.png",
            style: "",
            w: 1,
            h: 1
        },
        {
            class: 2,
            image: "./img/1x4G.png",
            style: "",
            w: 1,
            h: 4
        },
        {
            class: 2,
            image: "./img/2x3G.png",
            style: "",
            w: 2,
            h: 3
        },
        {
            class: 3,
            image: "./img/1x1R.png",
            style: "",
            w: 1,
            h: 1
        },
        {
            class: 3,
            image: "./img/1x4R.png",
            style: "",
            w: 1,
            h: 4
        },
        {
            class: 3,
            image: "./img/2x3R.png",
            style: "",
            w: 2,
            h: 3
        },
    ];

    return module;
});
