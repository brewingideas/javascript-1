jasmine.getFixtures().fixturesPath = 'base/tests/fixtures';

describe('Test AMD (requirejs) modules with Karma', function() {
    define(['src/es5-AMD/hello'], function(hello) {
        it('should run spec', function(done) {            
            expect(hello.greet('Liwen')).toBe('Hello Liwen!');
            expect(hello.greet()).toBe('Hello world!');
            done();
        });
        
        it('should be able to read fixtures', function(done) {
            var fixture = readFixtures('hello.html');
            expect($(fixture).html()).toBe('Hello world!');
            expect($(fixture).hasClass('fixture')).toBe(true);
            done();
        });
        
        it('should load fixture into DOM', function(done) {
            loadFixtures('hello.html');
            expect($('.fixture').html()).toBe('Hello world!');
            done();
        });
    });
});
