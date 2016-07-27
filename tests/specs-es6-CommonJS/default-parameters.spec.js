describe('default parameters', function() {
    'use strict';
    
    it('provides default', function() {

        var doWork = function(name = 'liwen') {
            return name;
        };

        var result = doWork();

        expect(result).toBe('liwen');
    });

    it('will provide value for undefined', function() {

        var doWork = function(a = 1, b = 2, c = 3) {
            return [a, b, c];
        };

        let [a, b, c] = doWork(5, undefined);

        expect(a).toBe(5);
        expect(b).toBe(2);
        expect(c).toBe(3);
    });

    it('works with destructing', function() {

        var doWork = function(url, {
            data = 'test',
            cache = true }) {
            return data;
        };

        let result = doWork(
            'api/test',
            {
                cache: true
            });

        expect(result).toBe('test');
            
    });
});
