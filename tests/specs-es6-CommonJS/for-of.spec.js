describe('for of', function() {

    it('can work with iterables at a high level', function() {
        let sum = 0;
        let numbers = [1, 2, 3, 4];

        for(let n of numbers) {
            sum += n;
        }
        
        expect(sum).toBe(10);
    });
    
});
