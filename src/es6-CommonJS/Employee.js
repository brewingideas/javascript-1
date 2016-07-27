var Person = require('./Person');

class Employee extends Person {

    constructor(title, name) {
        super(name);
        this._title = title;
    }

    get title() {
        return this._title;
    }
    
    doWork() {
        return `${this.name} is working.`;
    }
}

module.exports = Employee;
