describe('how let works', function() {
    'use strict';
    
    it('will provide block scoping, unlike var', function() {
        var doWork = function(flag) {
            if(flag) {
                let x = 3;
                return x;
            }
            return false; 
        };
        
        var result = doWork(true);
        expect(result).toBeTruthy();
    });
    
    it('will provide block scoping with for', function() {
        let i = 0;
        
        for(let i = 0; i < 10; i++) {
            // i is redefined in the scope
        }
        expect(i).toBe(0);
    });    
});
