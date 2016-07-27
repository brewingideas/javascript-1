describe('Sets', function() {

    it('should contain zero items when constructed', function() {
        var set = new Set();
        expect(set.size).toBe(0);
    });

    it('should contain 1 item when one item is added', function() {
        var set = new Set();
        set.add('somevalue');
        expect(set.size).toBe(1);
    });

    it('should allow object as key', function() {
        var set = new Set();
        var obj = {};
        set.add(obj);
        expect(set.has(obj)).toBe(true);
    });

    it('should contain items when given an array in the constructor', function() {
        var set = new Set([1, 2, 3, 5]);
        expect(set.has(5)).toBe(true);
    });

    it('should accept duplicate values', function() {
        var set = new Set();
        set.add(3);
        set.add(3);
        expect(set.size).toBe(1);
    });

    it('should have no items after clear is called', function() {
        var set = new Set();
        set.add(1);
        set.add(2);
        set.add(3);
        set.clear();
        expect(set.size).toBe(0);
    });

    it('should remove an itme when delete is called', function() {
        var set = new Set();
        set.add(1);
        set.add(2);
        set.add(3);
        set.delete(3);
        expect(set.size).toBe(2);
    });

    it('should call a callback function once for each item when forEach is called', function() {
        var set = new Set([1, 2, 3]);
        var iterateCount = 0;
        set.forEach(x => iterateCount++);
        expect(iterateCount).toBe(3);
    });

    it('should support for of iteration', function() {
        var set = new Set([1, 2, 3]);
        var iterateCount = 0;

        for(let item of set) {
            iterateCount++;
        }
        expect(iterateCount).toBe(3);
    });

    it('should return an iterator of arrays when entries is called', function() {
        var set = new Set();
        set.add(1);
        set.add('ASOS');

        var entries = set.entries();
        var firstEntry = entries.next().value;

        expect(firstEntry[0]).toBe(1);
        expect(firstEntry[1]).toBe(1);
    });

    it('should return an iterator of values when values is called', function() {
        var set = new Set();
        set.add(1);
        set.add('ASOS');

        var values = set.values();
        var firstValue = values.next().value;

        expect(firstValue).toBe(1);
    });

    it('should be able construct set with an iterator', function() {
        var set = new Set();
        set.add(1);
        set.add(2);
        set.add(3);

        var set2 = new Set(set.values());
        expect(set2.size).toBe(3);
    });
});
