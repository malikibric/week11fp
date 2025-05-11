// Task 1: Create a Container class in JavaScript that:
// Stores a value
// Has a map(fn) method that applies the function to the stored value
// Has valueOf() and toString() methods
class Container {
    constructor(value) {
      this.value = value;
    }
  
    // Applies a function to the stored value and returns a new Container
    map(fn) {
      return new Container(fn(this.value));
    }
  
    // Returns the raw value
    valueOf() {
      return this.value;
    }
  
    // Returns a string representation
    toString() {
      return `Container(${this.value})`;
    }
  }
  
  const c = new Container(10);
  const c2 = c.map(x => x * 2);
  
  console.log(c.toString());   // Container(10)
  console.log(c2.toString());  // Container(20)
  console.log(c2.valueOf());   // 20
  
  
  // Task 2: Write the Hindley–Milner-style type signature for each of the following:
  // A function that reverses a string
  // A function that adds three curried arguments
  // A function that checks if a number is positive
  
  // reverseString :: String → String
  const reverseString = (str) => str.split('').reverse().join('');
  
  // addThree :: Number → Number → Number → Number
  const addThree = x => y => z => x + y + z;
  
  // isPositive :: Number → Boolean
  const isPositive = num => num > 0;
  
  
  // Task 3: Implement a functor by extending your Container so that:
  // map(fn) returns a new functor instance
  // It satisfies the two functor laws (identity and composition)
  class Functor {
    constructor(value) {
      this.value = value;
    }
  
    // Functor law: map returns a new functor
    map(fn) {
      return new Functor(fn(this.value));
    }
  
    valueOf() {
      return this.value;
    }
  
    toString() {
      return `Functor(${this.value})`;
    }
  }
  
  const id = x => x;
  
  const f1 = new Functor(10);
  const f2 = f1.map(id);
  
  console.log(f1.valueOf() === f2.valueOf()); // true
  const double = x => x * 2;
  const addOne = x => x + 1;
  const composed = x => double(addOne(x));
  
  const f = new Functor(5);
  const left = f.map(addOne).map(double);     // map(f).map(g)
  const right = f.map(composed);              // map(g ∘ f)
  
  console.log(left.valueOf() === right.valueOf()); // true
  
  
  // Task 4: Implement the Maybe abstract class and its two subclasses:
  // Just(x) holds a non-null value
  // Nothing() represents the absence of a value
  // map(fn) applies the function in Just, skips it in Nothing
  class Maybe {
    static of(value) {
      return value === null || value === undefined
        ? new Nothing()
        : new Just(value);
    }
  
    map(fn) {
      throw new Error("map() must be implemented in subclasses");
    }
  
    isNothing() {
      throw new Error("isNothing() must be implemented in subclasses");
    }
  
    toString() {
      return `${this.constructor.name}(${this.value})`;
    }
  
    valueOf() {
      return this.value;
    }
  }
  
  class Just extends Maybe {
    constructor(value) {
      super();
      this.value = value;
    }
  
    map(fn) {
      return Maybe.of(fn(this.value));
    }
  
    isNothing() {
      return false;
    }
  }
  
  class Nothing extends Maybe {
    constructor() {
      super();
      this.value = null;
    }
  
    map(_) {
      return this;
    }
  
    isNothing() {
      return true;
    }
  }
  
  const maybe1 = Maybe.of(10).map(x => x + 5);
  console.log(maybe1.toString()); // Just(15)
  
  const maybe2 = Maybe.of(null).map(x => x + 5);
  console.log(maybe2.toString()); // Nothing()
  
  
  // Task 5: Write a function getField(attr) that uses Maybe to safely access object properties, avoiding runtime errors.
  const getField = (attr) => (obj) =>
    Maybe.of(obj).map(o => o[attr]);
  
  const user = { name: "Alice", age: 30 };
  const noUser = null;
  
  const nameField = getField("name");
  
  console.log(nameField(user).toString());    // Just("Alice")
  console.log(nameField(noUser).toString());  // Nothing()
  
  
  // Task 6: Demonstrate functor law compliance for your Maybe class using concrete values and transformations.
  const m1 = Maybe.of(10);
  const m1Mapped = m1.map(id);
  
  console.log(m1.toString());      // Just(10)
  console.log(m1Mapped.toString()); // Just(10)
  console.log(m1Mapped.valueOf() === m1.valueOf()); // true
  
  const f2 = addOne;
  const g2 = double;
  
  const m2 = Maybe.of(10);
  const left2 = m2.map(f2).map(g2);
  const right2 = m2.map(x => g2(f2(x)));
  
  console.log(left2.toString());  // Just(22)
  console.log(right2.toString()); // Just(22)
  console.log(left2.valueOf() === right2.valueOf()); // true
  
  
  // Task 7: Create a composed function using Maybe:
  // Look up a user from a list
  // Safely get their address field
  // Chain calls to extract the city name
  const users = [
    { id: 1, name: "Alice", address: { city: "London" } },
    { id: 2, name: "Bob" },
    { id: 3, name: "Carol", address: { city: null } },
  ];
  
  const findUserById = (id) =>
    Maybe.of(users.find(user => user.id === id));
  
  const getUserCity = (id) =>
    findUserById(id)
      .map(getField("address"))
      .map(maybeAddr => maybeAddr?.valueOf())
      .map(getField("city"))
      .map(maybeCity => maybeCity?.valueOf());
  
  console.log(getUserCity(1).toString()); // Just("London")
  console.log(getUserCity(2).toString()); // Nothing()
  console.log(getUserCity(99).toString()); // Nothing()
  
  
  // Task 8: Extend your functor into a Monad:
  // Implement chain(fn) to flatten nested monads
  // Add unwrap() to get the raw inner value
  class Monad {
    constructor(value) {
      this.value = value;
    }
  
    map(fn) {
      return new Monad(fn(this.value));
    }
  
    chain(fn) {
      const result = fn(this.value);
      return result instanceof Monad ? result : new Monad(result);
    }
  
    unwrap() {
      let current = this;
      while (current instanceof Monad) {
        if (!(current.value instanceof Monad)) break;
        current = current.value;
      }
      return current.value;
    }
  
    valueOf() {
      return this.value;
    }
  
    toString() {
      return `Monad(${this.value})`;
    }
  
    static of(x) {
      return new Monad(x);
    }
  }
  
  const m = Monad.of(5)
    .map(x => x + 2)
    .chain(x => Monad.of(x * 3));
  
  console.log(m.toString());      // Monad(21)
  console.log(m.unwrap());        // 21
  
  const nested = Monad.of(Monad.of(42));
  console.log(nested.unwrap());   // 42
  
  
  // Task 9: Refactor the following to use monads:
  const resultRefactored = Maybe.of("x")
    .map(fn1)
    .map(fn2)
    .map(fn3)
    .valueOf();
  
  
  // Task 10: Add an ap() method to your Monad class and use it to apply a wrapped function to a wrapped value:
  Monad.prototype.ap = function (m) {
    if (typeof this.value !== 'function') {
      throw new Error("ap() expects a monad containing a function");
    }
    return m.map(this.value);
  };
  
  const fnMonad = Monad.of(x => x + 1);
  const valMonad = Monad.of(5);
  
  const result = fnMonad.ap(valMonad);
  
  console.log(result.toString()); // Monad(6)
  console.log(result.valueOf());  // 6
  
  
  // Task 11: Implement the Either monad with Left(error) and Right(value).
  // map(fn) runs only on Right
  // Left skips mapping
  class Either {
    static of(left, right) {
      return right === null || right === undefined
        ? new Left(left)
        : new Right(right);
    }
  
    map(_) {
      throw new Error("map() must be implemented in Left or Right");
    }
  
    isLeft() {
      throw new Error("isLeft() must be implemented in Left or Right");
    }
  
    toString() {
      return `${this.constructor.name}(${this.value})`;
    }
  
    valueOf() {
      return this.value;
    }
  }
  
  class Left extends Either {
    constructor(error) {
      super();
      this.value = error;
    }
  
    map(_) {
      return this;
    }
  
    isLeft() {
      return true;
    }
  }
  
  class Right extends Either {
    constructor(value) {
      super();
      this.value = value;
    }
  
    map(fn) {
      return Either.of(null, fn(this.value));
    }
  
    isLeft() {
      return false;
    }
  }
  
  const success = Either.of(null, 10)
    .map(x => x + 1)
    .map(x => x * 2);
  
  console.log(success.toString()); // Right(22)
  
  const failure = Either.of("Something went wrong")
    .map(x => x + 1);
  
  console.log(failure.toString()); // Left(Something went wrong)
  
  
  // Task 12: Write safeDivide(a, b) using Either:
  // Return Right(result) or Left("Division by zero")
  const safeDivide = (a, b) => {
    return b === 0
      ? new Left("Division by zero")
      : new Right(a / b);
  };
  
  const result1 = safeDivide(10, 2).map(x => x + 1);
  console.log(result1.toString()); // Right(6)
  
  const result2 = safeDivide(10, 0).map(x => x + 1);
  console.log(result2.toString()); // Left(Division by zero)
  
  
  // Task 13: Implement Try.of(() => riskyOperation(), msg):
  // Catch errors and wrap them in Left
  // On success, return Right
  class Try {
    static of(fn, msg) {
      try {
        const result = fn();
        return new Right(result);
      } catch (e) {
        return new Left(msg || e.message);
      }
    }
  }
  
  const riskyOperation = () => {
    if (Math.random() < 0.5) {
      throw new Error("Random failure");
    }
    return "It worked!";
  };
  
  const tryResult = Try.of(riskyOperation, "Default failure message");
  
  console.log(tryResult.toString()); // Either Left(...) or Right("It worked!")
  
  
  // Task 14: Write treeIsEmpty(tree) and treeRoot(tree) to:
  // Return true/false based on tree contents
  // Return the root value or null
  const EmptyTree = () => (nonEmpty, empty) => empty();
  
  const NewTree = (value, left, right) =>
    (nonEmpty, empty) => nonEmpty(value, left, right);
  
  // treeIsEmpty :: Tree → Boolean
  const treeIsEmpty = (tree) =>
    tree(
      () => false,
      () => true
    );
  
  // treeRoot :: Tree → a | null
  const treeRoot = (tree) =>
    tree(
      (value, _left, _right) => value,
      () => null
    );
  
  const myTree = NewTree(10, EmptyTree(), EmptyTree());
  const empty = EmptyTree();
  
  console.log("Is tree empty?", treeIsEmpty(myTree));      // false
  console.log("Root of tree:", treeRoot(myTree));          // 10
  
  console.log("Is empty tree empty?", treeIsEmpty(empty)); // true
  console.log("Root of empty tree:", treeRoot(empty));     // null
  