describe('Array in ES6', function() {

    it('should return the first matching element using find', function() {
        var ary = [1, 5, 9];
        var match = ary.find(x => x > 8);
        expect(match).toBe(9);
    });


    it('should return the first matching index using findIndex', function() {
        var index = [1, 5, 10].findIndex(x => x > 3);
        expect(index).toBe(1);
    });

    it('should fill in the entire array when fill is called', function() {
        var ary = [1, 2, 3, 4, 8];
        ary.fill('a');
        expect(ary[1]).toBe('a');
        expect(ary[4]).toBe('a');
    });

    it('should fill some of the array when fill is called with args', function() {
        var ary = [1, 3, 4, 6, 6, 9];
        ary.fill('a', 2, 3);
        expect(ary[2]).toBe('a');
        expect(ary[3]).toBe(6);
    });

    it('should copy elements with copyWithin', function() {
        var ary = [1, 2, 3, 4]; // [1, 2, 1, 2,]
        ary.copyWithin(0, -2); // [3, 4, 3, 4]
        expect(ary[0]).toBe(3);
        expect(ary[1]).toBe(4);
    });

    it('should create an array with 1 item when given one arg when ~of~ is called', function() {
        var ary = new Array(3);
        var ofAry = Array.of(3);
        expect(ary.length).toBe(3);
        expect(ofAry.length).toBe(1);
    });

    // it('should create a new array from an array-like object when from is called', function() {
    //     var arrayLike = document.querySelectorAll('div');
    //     expect(arrayLike.forEach).toBe(undefined);

    //     var fromArray = Array.from(arrayLike);
    //     expect(fromArray.forEach).toDefined();
    // });

    it('should return entries from the entries function', function() {
        var a = ['Men', 'Women', 'Marketplace'];
        var entries = a.entries();

        var firstEntry = entries.next().value;
        expect(firstEntry[0]).toBe(0); // index of the element
        expect(firstEntry[1]).toBe('Men');
    });
    
    it('should emulate keys with the ~keys~ function', function() {
        var a = ['Men', 'Women', 'Marketplace'];
        var keys = a.keys();
        expect(keys.next().value).toBe(0);
    });

    describe('comprehensions', function() {
        
        // it('should create array easily', function() {
            
        //     var ary1 = [for (i of [1, 2, 3]) i]; // [1, 2, 3,]
        //     expect(ary1[2]).toBe(3);
        //     var ary2 = [for (i of [1, 2, 3]) i * i]; // [1, 4, 9]
        //     expect(ary2[2]).toBe(9);
        //     var ary3 = [for (i of [1, 2, 3,]) if(i < 3) i]; // [1, 2]
        //     expect(ary3.length).toBe(2);

        //     var ary4 = [for (first of ['ASOS', 'River Island', 'Zera'])
        //                 for (middle of ['Men', 'Women', 'Unisex'])
        //                 if(first !== middle) (first + ' ' + middle + ' Range')];
        //     expect(ary4[0]).toBe('ASOS Men Range');
        
        // });        
    });
});
