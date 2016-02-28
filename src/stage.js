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

    var module = function () {};


    return module;
});
