describe('es6 object', function() {

    describe('is function', function() {

        // triple equals === considers positive and negative zero to be equal 
        it('should consider positive and negative zero to be different', function() {
            expect(-0 === 0).toBe(true);
            expect(Object.is(0, -0)).toBe(false);
        });

        it('should consider NaN to be NaN', function() {
            // expect(NaN === NaN).toBe(false);
            expect(Object.is(NaN, NaN)).toBe(true);
        });
    });
    
    describe('assign function', function() {

        it('should apply mixins to object', function() {
            var asos = {
                sell: function(product) {
                    product.owned = true;
                }
            };

            var shoe = {};

            var tailor = {
                alternate: function(product) {
                    product.alternateed = true;
                }
            };

            Object.assign(asos, tailor);

            asos.alternate(shoe);
            expect(shoe.alternateed).toBe(true);
            
        });
        
    });

    describe('property assign shorthand', function() {

        it('should create property from local variable', function() {

            let x = 1;
            let y = 2;

            let obj = {
                x,
                y
            };

            expect(obj.x).toBe(1);
            expect(obj.y).toBe(2);
        });
    });

    describe('method initialise shorthand', function() {

        it('should create method using shorthand', function() {

            let obj = {
                getProduct() {
                    return {
                        productId: 1396923,
                        price: 32.35,
                        currency: 'GBP'
                    };
                }
            };

            expect(obj.getProduct().price).toBe(32.35);
            
        });
    });

    describe('computed property names', function() {

        it('should support variables for propery names', function() {
            function createSimpleObject(propName, propVal) {
                return {
                    [propName]: propVal
                };
            }

            let obj = createSimpleObject('colour', 'red');
            expect(obj.colour).toBe('red');
        });

        it('should support concatenation', function() {
            function createTriumvariate(first, second, third) {
                return {
                    ['member_' + first.name]: first,
                    ['member_' + second.name]: second,
                    ['member_' + third.name]: third
                };
            }

            let prod1 = { 'name': 'Hudson_London_Talbot_Brogues', price: 85 },
                prod2 = { 'name': 'Super_Skinny_Cropped_Trousers_In_Black', price: 30 },
                prod3 = { 'name': 'ASOS_Skinny_Trouser_With_Seams_And_Zips', price: 14 };

            let obj = createTriumvariate(prod1, prod2, prod3);
            expect(obj.member_Hudson_London_Talbot_Brogues).toBeDefined();
            expect(obj.member_Hudson_London_Talbot_Brogues.price).toBe(85);
            
        });
        
    });

    
});
