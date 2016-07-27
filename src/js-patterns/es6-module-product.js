export default class Product {

    constructor(sku) {
        this._sku = sku;
    }

    get sku() {
        return this._sku;
    }
    
    addToBag(bag, quantity) {
        let _quantity = Number.parseInt(quantity) || 1;
        bag.addProduct(this.sku, _quantity);
    }
}
