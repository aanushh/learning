class Shape {
  name;
  sides;
  sideLength;

  constructor(name, sides, sideLength) {
    this.name = name;
    this.sides = sides;
    this.sideLength = sideLength;
  }

  calcPerimeter() {
    return this.sides * this.sideLength;
  }
}

class Square extends Shape {
  constructor(sideLength) {
    super("square", 4, sideLength);
  }

  calcArea() {
    return this.sideLength * this.sideLength;
  }
}

const square = new Square(5);
const triangle = new Shape("triangle", 3, 3);

const squarePerimeter = square.calcPerimeter();
const squareArea = square.calcArea();
const trianglePerimeter = triangle.calcPerimeter();

console.table({
  square: { perimeter: squarePerimeter, area: squareArea },
  triangle: { perimeter: trianglePerimeter },
});
