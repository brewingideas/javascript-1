var MODULE = (function(my) {

    var old_moduleMethod = my.moduleMethod;

    my.moduleMethod = function() {
        // method override, has access to old through old_moduleMethod...
    };

    return my;

}(MODULE));
