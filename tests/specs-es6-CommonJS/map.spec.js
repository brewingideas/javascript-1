describe('Map', function() {

    it('should contain zero items when constructed', function() {
        var map = new Map();
        expect(map.size).toBe(0);
    });

    it('should contain 1 item when one item is added', function() {
        var map = new Map();
        map.set('age', 35);
        expect(map.size).toBe(1);
    });

    it('should return the value when get is called with corrrect key', function() {
        var map = new Map();
        map.set('age', 35);
        expect(map.get('age')).toBe(35);
    });

    it('should allow an object to be the key', function() {
        var addressMap = new Map();
        var asos = {'name': 'ASOS'};
        addressMap.set(asos, 'GLH');
        expect(addressMap.get(asos)).toBe('GLH');
    });

    it('should contain items when given an array in the constructor', function() {
        var map = new Map([['name', 'asos'], ['address', 'GLH'], ['age', 12]]);
        expect(map.size).toBe(3);
    });

    it('should find the correct item when has is called', function() {
        var map = new Map([['name', 'asos'], ['address', 'GLH'], ['age', 12]]);
        expect(map.has('name')).toBe(true);
    });

    it('should not allow duplicate keys', function() {
        let map = new Map();
        let key = {};

        map.set(key, 'first');
        map.set(key, 'second');

        expect(map.get(key)).toBe('second');
    });

    it('should have no items when clear is called', function() {
        let map = new Map();
        map.set('name', 'asos');
        map.set('office', 'GLH');
        map.set('age', 10);
        map.clear();
        expect(map.size).toBe(0);
    });

    it('should remove an item when delete is called', function() {
        var map = new Map();
        // var key1 = {'name': 'asos'};
        // var key2 = {'name': 'river island'};

        var key1 = {};
        var key2 = {}; // key1 !== key2, they are different object
        map.set(key1, 100);
        map.set(key2, 200);
        map.delete(key2);
        expect(map.has(key2)).toBe(false);
    });

    it('should call the callback function for each item when forEach is called', function() {
        var map = new Map([['name', 'asos'], ['address', 'GLH'], ['age', 12]]);
        var iterationCount = 0;
        map.forEach(function(value, key) {
            iterationCount++;
        });
        expect(iterationCount).toBe(3);
    });

    it('should support for of iteration', function() {
        var map = new Map([['name', 'asos'], ['address', 'GLH'], ['age', 12]]);
        var iterationCount = 0;
        for(let [key, value] of map) {
            // item is an array like ['name', 'asos']
            iterationCount++;
        }
        expect(iterationCount).toBe(3);
    });

    it('should return an iterator of arrays of key value pairs when entries is called', function() {
        var map = new Map();
        map.set('name', 'asos');
        var entries = map.entries();
        var firstEntry = entries.next().value;

        expect(firstEntry[0]).toBe('name');
        expect(firstEntry[1]).toBe('asos');
    });

    it('should return an iterator of values when values is called', function() {
        var map = new Map();
        map.set('name', 'asos');
        map.set('office', 'GLH');
        
        var values = map.values();
        var first = values.next().value;

        expect(first).toBe('asos');
    });

    it('should return an iterator of keys when keys is called', function() {
        var map = new Map();
        map.set('name', 'asos');
        map.set('office', 'GLH');

        var keys = map.keys();
        var first = keys.next().value;

        expect(first).toBe('name');
    });

    it('should be able to be constructed with an iterator', function() {
        var map = new Map();
        map.set('1');
        map.set('2');
        map.set('3');

        var map2 = new Map(map.entries());

        expect(map2.size).toBe(3);
    });
});
