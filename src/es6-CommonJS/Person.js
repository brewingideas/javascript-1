// Equivalent to class Person extends Object {
class Person {

    constructor(name) {
        this.name = name;
    }
    
    get name() {
        return this._nmae;
    }

    set name(newVal) {
        if(newVal) { // Basic validation
            this._nmae = newVal;
        }
    }
    
    doWork() {
        return `${this.name} is free.`;
    }

    toString() {
        return this.name;
    }
}

module.exports = Person;
