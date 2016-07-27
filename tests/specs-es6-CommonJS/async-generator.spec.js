var async = {};
var asyncP = {};

(function(async) {
    var sequence;
    var run = function(generator) {
        sequence = generator();
        var next = sequence.next();
    };

    var resume = function(value) {
        sequence.next(value);
    };

    var fail = function(reason) {
        sequence.throw(reason);
    };

    async.run = run;
    async.resume = resume;
    async.fail = fail;
    
}(async));

(function(asyncP){
    var run = function(generator) {
        var sequence;
        var process = function(result) {
            result.value.then(function(value) {
                if(!result.done) {
                    process(sequence.next(value));
                }
            }, function(err) {
                if(!result.done) {
                    process(sequence.throw(err));
                }
            });
        };

        sequence = generator();
        var next = sequence.next();
        process(next);
    };

    asyncP.run = run;
}(asyncP));

async.pause = function(delay) {
    setTimeout(function() {
        console.log('Paused for ' + delay + 'ms');
        async.resume();
    }, delay);   
};

async.getProductSucceed = function() {    
    setTimeout(function() {
        try {
            async.resume(50);
        } catch (ex) {
            async.fail(ex);
        }
    }, 300);
};

async.getProductFailed = function() {    
    setTimeout(function() {
        try {
            throw Error('Problem with getting product info.');
        } catch (ex) {
            async.fail(ex);
        }
    }, 300);
};

async.showAsomLooks = function() {
    setTimeout(function() {
        console.log('\nLooking sharp!');
        async.resume();
    }, 300);
};

asyncP.getProductSucceed = function() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(50);
        }, 300);
    });    
};

asyncP.getProductFailed = function() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            reject(Error('Problem with getting product info (Promise)'));
        }, 300);
    });    
};

asyncP.showAsomLooks = function() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            console.log('\nLooking sharp! Promise');
            resolve();
        }, 300);
    });    
};

describe('async generators', function() { // should really be called sync generators
    
    it('should be able to paulse with generators', function(done) {
        
        function* main() {
            console.log('\nSTART');
            yield async.pause(300);
            console.log('RUN');
            yield async.pause(300);
            console.log('END');
            yield async.pause(300);
            done();
        }
        
        async.run(main);
    });

    it('should work with returned data', function(done) {
        
        function* main() {
            try {
                var price = yield async.getProductSucceed();
                if(price > 45) {
                    yield async.showAsomLooks();
                } else {
                    console.log('\nNo looks to show.');
                }
            } catch (ex) {
                console.log('Error:', ex.message);
            }
            done();
        }

        async.run(main);
    });

    it('should work with error', function(done) {
        
        function* main() {
            try {
                var price = yield async.getProductFailed();
                if(price > 45) {
                    yield async.showAsomLooks();
                } else {
                    console.log('\No looks to show.');
                }
            } catch (ex) {
                console.log('\nExpected Error:', ex.message);
            }
            done();
        }

        async.run(main);
    });

    it('should work with promises', function(done) {
        function* main() {
            try {
                var price = yield asyncP.getProductFailed();
                if(price > 45) {
                    yield asyncP.showAsomLooks();
                } else {
                    console.log('\No looks to show.');
                }
            } catch (ex) {
                console.log('\nExpected Error:', ex.message);
            }
            done();
        }

        asyncP.run(main);
    });
    
});
