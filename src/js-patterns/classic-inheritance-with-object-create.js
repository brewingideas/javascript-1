// Shape - superclass
function Shape() {
    this.x = 0;
    this.y = 0;
}

// superclass methods
Shape.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
    console.info('Shape moved');
};


// Rectangular - subclass
function Rectangular() {
    Shape.call(this);    // call super constructor
}

// subclass extends superclass
Rectangular.prototype = Object.create( Shape.prototype );
Rectangular.prototype.constructor = Rectangular;

var rect = new Rectangular();

console.log('Is rect an instance of Rectangular? ' + (rect instanceof Rectangular));
console.log('Is rect an instance of Shape? ' + (rect instanceof Shape));
rect.move(1, 1);     // Outputs: 'Shape moved'
