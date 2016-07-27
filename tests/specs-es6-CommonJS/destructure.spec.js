describe('destructing', function() {
    'use strict';

    it('can destructure arrays', function() {

        var doWork = function() {
            return [1, 3, 2];
        };

        let [, x, y, z] = doWork();

        expect(x).toBe(3);
        expect(y).toBe(2);
        expect(z).toBeUndefined();
    });

    it('can destructure objects', function() {

        let doWork = function() {
            return {
                firstName: 'Liwen',
                lastName: 'Zhang',
                handles: {
                    twitter: '@liwenzhang',
                    facebook: 'elfoak'
                }
            };
        };

        let {
            firstName: name,
            lastName, // shorthand when object property and variable has the same name
            handles: { twitter: twitter },
            handles: { facebook } // shorthand assignment works for nested properties too
        } = doWork();

        expect(name).toBe('Liwen');
        expect(twitter).toBe('@liwenzhang');
        expect(facebook).toBe('elfoak');
    });

    it('works with parameters', function() {

        var doWork = function(url, {data, cache, headers}) {
            return data;
        };
        
        let result = doWork(
            'api/test', {
                cache: false,
                data: 'test'
            });

        expect(result).toBe('test');
    });
});
