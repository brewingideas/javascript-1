describe('WeakMap', function() {

    it('should not have properties & methods that relate to the entire map', function() {
        let map = new WeakMap();
        expect(map.size).toBe(undefined);
        expect(map.entires).toBe(undefined);
        expect(map.values).toBe(undefined);
        expect(map.keys).toBe(undefined);
        expect(map.forEach).toBe(undefined);
    });

    it('should be able to determine existince of items with has', function() {
        let map = new WeakMap();
        let key = {'name': 'ASOS'};
        map.set(key, 'GLH');
        expect(map.has(key)).toBe(true);
    });

    it('should be able to get the correct value', function() {
        let map = new WeakMap();
        let key1 = {'name': 'ASOS'};
        let key2 = {'name': 'River Island'};
        map.set(key1, 'GLH');
        map.set(key2, 'Oxford Street');

        expect(map.get(key2)).toBe('Oxford Street');
    });

    it('should be able to remove items with delete', function() {
        let map = new WeakMap();
        let key1 = {'name': 'ASOS'};
        let key2 = {'office': 'GLH'};
        map.set(key1, 'GLH');
        map.set(key2, 'Oxford Street');

        map.delete(key2);
        
        expect(map.has(key2)).toBe(false);
    });

    //
    // Obsolete
    // This feature is obsolete.
    // Although it may still work in some browsers, its use is discouraged since it could
    // be removed at any time. Try to avoid using it.
    
    // it('should remove all items when clear is called', function() {
    //     let map = new WeakMap();
    //     let key1 = {'name': 'ASOS'};
    //     let key2 = {'office': 'GLH'};
        
    //     map.set(key1, 'GLH');
    //     map.set(key2, 'Oxford Street');

    //     expect(map.has(key2)).toBe(false);
    // });
});
