define(function(require) {

    var registerSuite = require('intern!object');
    var assert = require('intern/chai!assert');
    var hello = require('src/es5-AMD/hello');
    
    registerSuite({

        name: 'intern-unit-test-setup',
        
        greet: function() {
            assert.strictEqual(
                hello.greet('Liwen'),
                'Hello Liwen!',
                'hello.greet should return a greeting for the person named in the first argument');
            assert.strictEqual(
                hello.greet(),
                'Hello world!',
                'hello.greet with no arguments should return a greeting to "world"');
        }
        
    });
    
});
