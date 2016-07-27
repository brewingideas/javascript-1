import {Product} from './es6-module-product';

class Bag {

    constructor(id) {
        var _id = id;
        Object.defineProperty(this, id, {
            configurable: false,
            writable: false,
            get: function() { return _id; }
        });
    }
    
    addToBag(sku, quantity) {
        console.log('Product', sku, 'x', quantity, 'has been added to your bag.');
    }
    
}

var p = new Product('39391038');

p.addToBag(new Bag(92352355), 3);
