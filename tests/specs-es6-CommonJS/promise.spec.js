describe('Promises', function() {

    var promiseStub;
    
    beforeAll(function() {

        promiseStub = {
            
            getOrder: function(orderId) {
                return Promise.resolve({ userId: 35 });
            },
            
            getUser: function(userId) {
                return Promise.resolve({ companyId: 18 });
            },
            
            getCompany: function(companyId) {
                return Promise.resolve({ name: 'ASOS' });
            },

            getProduct: function(productId) {
                var products = new Map([
                    [1, { 'name': 'Dr Martens Made In England Williams T-Bar Shoes' } ],
                    [2, { 'name': 'ASOS Off Shoulder Swing Dress in Vertical Stripe' } ],
                    [3, { 'name': 'ASOS Retro Cat Eye Sunglasses With Cut Away And Flat Lens' } ]
                ]);

                return products.get(productId);
            }
        };

    });

    it('should execute the callback given to then', function(done) {
        var promise = new Promise(function(resolve, reject) {
            resolve();
        });

        promise.then(function() {
            done();
        });
    });

    it('should receive the resolved data', function(done) {
        var promise = new Promise(function(resolve, reject) {
            resolve(1);
        });
        
        promise.then(function(data) {
            expect(data).toBe(1);
            done();
        });
    });

    it('should fail when rejected', function(done) {
        var promise = new Promise(function(resolve, reject) {
            reject(Error('error'));
        });

        promise.then(function() {
            // success
        }, function(err) {
            expect(err.message).toBe('error');
            done();
        });
    });


    it('should have a catch', function(done) {
        var promise = new Promise(function(resolve, reject) {
            reject(Error('error'));
        });

        promise.catch(function(err) {
            expect(err.message).toBe('error');
            done();
        });
    });

    it('should compose when resolved with a promise', function(done) {
        var prevPromise = new Promise(function(resolve, reject) {
            resolve(3);
        });

        var promise = new Promise(function(resolve, reject) {
            resolve(prevPromise);
        });

        promise.then(function(data) {
            expect(data).toBe(3);
            done();
        });
    });


    it('should have a static resolve', function(done) {
        var prevPromise = Promise.resolve(3);

        var promise = Promise.resolve(prevPromise);

        promise.then(function(data) {
            expect(data).toBe(3);
            done();
        });
    });

    it('should have a static reject', function(done) {
        var promise = Promise.reject(Error('error'));

        promise.catch(function(err) {
            expect(err.message).toBe('error');
            done();
        });
    });

    it('should be asynchronous', function(done) {
        var async = false;

        var promise = new Promise(function(resolve, reject) {
            resolve();
        });

        promise.then(function() {
            expect(async).toBe(true);
            done();
        });

        async = true;
    });

    it('should chain sequentially using then', function(done) {

        promiseStub.getOrder(3).then(function(order) {
            return promiseStub.getUser(order.userId);
        }).then(function(user) {
            return promiseStub.getCompany(user.companyId);
        }).then(function(data) {
            expect(data.name).toBe('ASOS');
            done();
        }).catch(function(error) {
            // handle error
        });
    });

    it('should execute after all promises with all', function(done) {
        var productIds = [1, 2, 3];
        var promises = [];
        for(let i = 0; i < productIds.length; i++) {
            promises.push(promiseStub.getProduct(productIds[i]));
        }

        Promise.all(promises).then(function(values) {
            expect(values.length).toBe(3);
            done();
        });
    });

    it('should resolve after the first promise', function(done) {
        var productIds = [1, 2, 3];
        var promises = [];
        for(let i = 0; i < productIds.length; i++) {
            promises.push(promiseStub.getProduct(productIds[i]));
        }

        Promise.race(promises).then(function(firstValue) {
            expect(firstValue.name).toBeDefined();
            done();
        });
    });
    
});
