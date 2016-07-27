/**
 * This approach is NOT recommended. Properties which are objects or functions will not be duplicated,
 * they will exist as one object with two references. Changing one will change the other. 
 */

var MODULE_TWO = (function(old) {
    var my = {},
        key;

    for (key in old) {
        if (old.hasOwnProperty(key)) {
            my[key] = old[key];
        }
    }

    var super_moduleMethod = old.moduleMethod;
    my.moduleMethod = function() {
        // override method on the clone, access to super through super_moduleMethod
    };

    return my;

}(MODULE));
