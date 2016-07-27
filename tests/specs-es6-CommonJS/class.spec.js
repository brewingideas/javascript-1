var Person = require('../../src/es6-CommonJS/Person');
var Employee = require('../../src/es6-CommonJS/Employee');

// var Person = require('../../build/es5/Person');
// var Employee = require('../../build/es5/Employee');

describe('the class keyword', function() {

    it('can create a class', function() {

        let e = new Employee('Developer', 'Liwen');

        expect(e.doWork()).toBe('Liwen is working.');
        expect(e.name).toBe('Liwen');
        expect(Employee.prototype.doWork.call(e)).toBe('Liwen is working.');
    });


    it('can have a constructor', function() {

        let e1 = new Employee('Developer', 'Liwen');
        let e2 = new Employee('Programme Manager', 'Graham');

        expect(e1.name).toBe('Liwen');
        expect(e2.name).toBe('Graham');

        e1.name = 'Jason';
        expect(e1.name).toBe('Jason');
    });

    it('can have a super class', function() {
        let p1 = new Person('Liwen');
        let e1 = new Employee('Developer', 'Jason');

        expect(p1.name).toBe('Liwen');
        expect(e1.name).toBe('Jason');
        expect(e1.doWork()).toBe('Jason is working.');
    });

    it('can interact with super class', function() {
        let p1 = new Person('Liwen');
        let e1 = new Employee('Developer', 'Jason');

        expect(p1.name).toBe('Liwen');
        expect(e1.name).toBe('Jason');
        expect(e1.title).toBe('Developer');
    });

    it('can override methods in super class', function() {
        let e1 = new Employee('Developer', 'Liwen');
        let p1 = new Person('Graham');

        expect(p1.doWork()).toBe('Graham is free.');
        expect(e1.doWork()).toBe('Liwen is working.');
        expect(p1.toString()).toBe('Graham');
        expect(e1.toString()).toBe('Liwen');

        let makeEveryOneDoWork = function(...people) {
            var results = [];
            for(let i = 0; i < people.length; i++) {
                if(people[i] instanceof Person) {
                    results.push(people[i].doWork());
                }
            }
            return results;
        };

        expect(makeEveryOneDoWork(p1, e1)).toEqual(['Graham is free.', 'Liwen is working.']);
    });
    
});
