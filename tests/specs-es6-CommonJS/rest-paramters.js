describe('rest paramters', function() {
    'use strict';

    it('is like varages', function() {

        let doWork = function(name, ...numbers) {
            let result = 0;
            numbers.forEach(function(n) {
                result += n;
            });
            return result;
        };

        let result = doWork('liwen', 1, 2, 3, 4);

        expect(result).toBe(10);
        
    });
    
});
