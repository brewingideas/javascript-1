describe('weaksets', function() {

    it('should not have properties & methods that relate to the entire set', function() {
        let set = new WeakSet();
        expect(set.size).toBe(undefined);
        expect(set.entires).toBe(undefined);
        expect(set.values).toBe(undefined);
        expect(set.forEach).toBe(undefined);
    });

    it('should be able to find items with has', function() {
        let set = new WeakSet();
        let item = {'name': 'ASOS'};
        set.add(item);
        expect(set.has(item)).toBe(true);
    });

    it('should be able to remove items with delete', function() {
        let set = new WeakSet();
        let item = {'name': 'ASOS'};
        let item2 = {'office': 'GLH'};
        set.add(item);
        set.add(item2);

        set.delete(item2);
        
        expect(set.has(item2)).toBe(false);
    });

    //
    // Obsolete
    // This feature is obsolete.
    // Although it may still work in some browsers, its use is discouraged since it could
    // be removed at any time. Try to avoid using it.
    
    // it('should remove all items when clear is called', function() {
    //     let set = new WeakSet();
    //     let item = {'name': 'ASOS'};
    //     let item2 = {'office': 'GLH'};
    
    //     set.clear();

    //     expect(set.has(item2)).toBe(false);
    // });
});
