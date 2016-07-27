describe('comprehensions', function() {

    it('can be used with yield', function() {
        class Team {
            constructor() {
                this.members = [];
            }

            addMember(...names) {
                this.members= this.members.concat(names);
            }

            *[Symbol.iterator]() {
                for(let m of this.members) {
                    yield m;
                }
            }
        }

        let filter = function*(items, predicate) {
            // yield* [for (item of items) if(predicate(item)) item];
            for(let item of items) {
                if(predicate(item)) {
                    yield item;
                }
            }
        };

        let take = function*(items, number) {
            let count = 0;
            if(number < 1) {
                return;
            }

            for(let item of items) {
                yield item;
                count += 1;
                if(count >= number) {
                    return;
                }
            }
        };
        
        let count = 0;
        let cd = new Team();

        cd.addMember('Liwen', 'Jason', 'Alex', 'John');

        for(let member of take(filter(cd, m => m[0] === 'J'), 1)) {
            count += 1;
        }

        expect(count).toBe(1);
        
    });
    
});
