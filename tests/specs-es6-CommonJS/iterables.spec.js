var ArrayIterator = require('../../src/es6-CommonJS/ArrayIterator');

// var ArrayIterator = require('../../build/es5/ArrayIterator');

describe('iterables', function() {

    it('can work with iterators at a low level', function() {

        let sum = 0;
        let numbers = [1, 2, 3, 4];

        // for loop
        sum = 0;
        for(let i = 0; i < numbers.length; i++) {
            sum += numbers[i];
        }
        expect(sum).toBe(10);

        // for in
        sum = 0;
        for(let i in numbers) {
            sum += numbers[i];
        }
        expect(sum).toBe(10);
        
        // iterator
        sum = 0;

        // let iterator = numbers.values();
        let iterator = numbers[Symbol.iterator]();
        let next = iterator.next();

        while(!next.done) {
            sum += next.value;
            next = iterator.next();
        }
        expect(sum).toBe(10);
        
    });


    it('can be built by implementing Symbol.iterator', function() {

        class Team {
            constructor() {
                this.members = [];
            }

            addMember(...names) {
                this.members= this.members.concat(names);
            }

            // [Symbol.iterator]() {
            //     return new ArrayIterator(this.members);
            // }

            *[Symbol.iterator]() {
                for(let m of this.members) {
                    yield m;
                }
            }
        }

        let filter = function*(items, predicate) {
            for(let item of items) {
                if(predicate(item)) {
                    yield item;
                }
            }
        };

        let take = function*(items, number) {
            let count = 0;
            if(number < 1) {
                return;
            }

            for(let item of items) {
                yield item;
                count += 1;
                if(count >= number) {
                    return;
                }
            }
        };
        
        let count = 0;
        let cd = new Team();

        cd.addMember('Liwen', 'Jason', 'Alex', 'John');

        for(let member of take(filter(cd, m => m[0] === 'J'), 1)) {
            count += 1;
        }

        expect(count).toBe(1);
        
    });

});
