describe('Proxies', function() {

    it('should let you intercept gets', function() {
        let product = {
            price: 100,
            category: 'shoe',
            colour: 'black'
        };

        let productProxy = new Proxy(product, {
            get: function(target, property) {
                if(property === 'category') {
                    return 'Awesome ' + target[property];
                } else {
                    return target[property];
                }
            }
        });

        expect(productProxy.price).toBe(100);
        expect(productProxy.category).toBe('Awesome shoe');
    });

    it('should let you intercept sets', function() {
        let product = {
            price: 100,
            category: 'shoe',
            colour: 'black'
        };

        let productProxy = new Proxy(product, {
            set: function(target, property, value) {
                if(property === 'price' && value <= 0) {
                    throw Error('Invalid price point');
                } else {
                    target[property] = value;
                }
            }
        });

        productProxy.price = 200;
        productProxy.colour = 'red';

        expect(productProxy.price).toBe(200);
        expect(productProxy.colour).toBe('red');
        expect(function() {
            productProxy.price = -10;
        }).toThrow(new Error('Invalid price point'));
        expect(productProxy.price).toBe(200);
    });

    it('can trap a single method', function() {

        var storeProduct = {
            price: 300,
            name: 'Red Shirt',
            colour: 'Red',
            addToBag(bagOwner) {
                return 'Product [' + this.name + '] is added to ' + bagOwner + '\'s bag.';
            }
        };

        storeProduct.addToBag = new Proxy(storeProduct.addToBag, {
            apply: function(target, context, args) {
                if(context !== storeProduct) {
                    return 'Possible XXS attack detacted.';
                } else {
                    return target.apply(context, args);
                }
            }
        });
        
        let fakeProduct = { name: 'Fake' };
        fakeProduct.addToBag = storeProduct.addToBag;
        expect(fakeProduct.addToBag('Liwen')).toBe('Possible XXS attack detacted.');
        expect(storeProduct.addToBag('Liwen')).toBe('Product [Red Shirt] is added to Liwen\'s bag.');
        
    });
    
    it('can trap `apply`', function() {
        
        var Calculator = function() {
            this.result = 0;
        };
        
        Calculator.prototype.add = function(...args) {
            var self = this;
            args.forEach(function(val) {
                self.result += val;
            });
        };

        let cal = new Calculator();
        cal.add(3, 2, 5);
        expect(cal.result).toBe(10);
        
        // The handler.apply(0 method is a trap for a function call (*ANY* function call)
        var clacProxy = new Proxy(Calculator, {
            apply: function(target, thisArg, argumentsList) {
                let result = 1;
                for(let n in argumentsList) {
                    result *= argumentsList[n];
                }
                return result;
            }
        });
        
        expect(clacProxy(2, 4, 2)).toBe(16);
    });

    it('can trap `constructor`', function() {
        var proxy = new Proxy(function() {}, {
            construct: function(target, argumentsList, newTarget) {
                return { value: argumentsList[0] * 10 };
            }
        });

        expect(new proxy(1).value).toBe(10);
    });

    it('can extend constructor', function() {
        
        function extend(sup, base) {
            
            var descriptor = Object.getOwnPropertyDescriptor(
                base.prototype, 'constructor'
            );

            base.prototype = Object.create(sup.prototype);

            var handler = {
                construct: function(target, args) {
                    var obj = Object.create(base.prototype);
                    this.apply(target, obj, args);
                    return obj;
                },

                apply: function(target, that, args) {
                    sup.apply(that, args);
                    base.apply(that, args);
                }
            };

            var proxy = new Proxy(base, handler);
            descriptor.value = proxy;
            Object.defineProperty(base.prototype, 'constructor', descriptor);
            return proxy;
        }

        var Person = function(name) {
            this.name = name;
        };

        var Boy = extend(Person, function(name, age) {
            this.age = age;
        });

        Boy.prototype.sex = 'M';

        var Peter = new Boy('Peter', 13);
        
        expect(Peter.sex).toBe('M');
        expect(Peter.name).toBe('Peter');
        expect(Peter.age).toBe(13);
    });

});













