/**
 # Two factors influenced the introduction of arrow functions: shorter functions and lexical `this`
 
 # Basic Syntax
 
 (param1, param2, …, paramN) => { statements }
 (param1, param2, …, paramN) => expression
 // equivalent to:  => { return expression; }
 
 // Parentheses are optional when there's only one parameter:
 (singleParam) => { statements }
 singleParam => { statements }
 
 // A function with no parameters requires parentheses:
 () => { statements }

 # Advanced Syntax
 
 // Parenthesize the body to return an object literal expression:
 params => ({foo: bar})
 
 // Rest parameters and default parameters are supported
 (param1, param2, ...rest) => { statements }
 (param1 = defaultValue1, param2, …, paramN = defaultValueN) => { statements }
 
 // Destructuring within the parameter list is also supported
 var f = ([a, b] = [1, 2], {x: c} = {x: a + b}) => a + b + c;
 f();  // 6 

 **/

describe('arrow function', function() {
    
    it('provide a compact syntax to define a function', function() {

        let add = (x, y) => x + y;
        let square = x => x * x; 

        expect(add(3, 4)).toBe(7);
        expect(square(8)).toBe(64);

        let empty = () => {};
        expect(empty()).toBeUndefined();
        expect((() => "foobar")()).toBe('foobar');
        
    });

    it('can be used with array methods', function() {
        
        let arr = [2, 4, 6, 8, 10, 11];
        let sum = 0;

        arr.forEach(x => sum += x);
        let doubled = arr.map(n => 2 * n);

        expect(arr.reduce((a, b) => a + b)).toBe(41);
        expect(sum).toBe(41);
        expect(doubled).toEqual([4, 8, 12, 16, 20, 22]);
        expect(arr.filter(v => v % 2 === 1)).toEqual([11]);
    });

    it('lexically binds to "this"', function(done) {
        
        this.name = 'Liwen';
        
        setTimeout(() => {
            expect(this.name).toBe('Liwen');
            done();
        }, 5);
    });

    
    it('capture the `this` value of the enclosing context', function(done) {

        function Person() {
            this.age = 0;
            
            setTimeout(() => {
                this.age++; // `this` properly refers to the person object
                expect(this.age).toBe(1);
                done();
            }, 100);
        }
        
        let p = new Person();
    });


    it('should has no effect on this when called through `call` or `apply`', function() {

        var adder = {
            base: 1,

            add: function(a) {
                var f = v => v + this.base;
                return f(a);
            },

            addThruCall: function(a) {
                var f = v => v + this.base;
                var b = {
                    base: 2
                };
                return f.call(b, a);
            }
        };

        expect(adder.add(1)).toBe(2);
        expect(adder.addThruCall(1)).toBe(2); // Only the arguments are passed, no effect on `this`
        
    });

    // it('should not expose `arguments.object', function() {
    //     var arguments = 42;
    //     var arr = () => arguments;
        
    //     expect(arr()).toBe(42);

    //     function foo() {
    //         var f = (i) => arguments[0] + i; // `foo's implicit arguments binding
    //         return f(2);
    //     }
        
    //     expect(foo(2)).toBe(4);
    // });
});
