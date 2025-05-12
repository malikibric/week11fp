// ************ TASK DESCRIPTION ************
//? Safe Division with Either

/*
*   You are working with a scenario where division might fail (e.g., division by zero).
*
*   Your task is to implement:
*   - A function `safeDivide(a, b)` that:
*     - Returns Right(result) if `b` is not zero
*     - Returns Left("Cannot divide by zero") if `b` is zero
*
*   - The `Left` and `Right` classes, which form an Either monad:
*
*   `Right(x)` should:
*   - Hold a valid result
*   - Support `.map(fn)` to apply a transformation function to the value
*   - Implement `.toString()` to return: Right(value)
*
*   `Left(x)` should:
*   - Hold an error message or failed result
*   - Ignore `.map(fn)` and return itself
*   - Implement `.toString()` to return: Left(error)
*
*? Examples:
*? safeDivide(10, 2) → Right(5)
*? safeDivide(10, 0) → Left("Cannot divide by zero")
*? safeDivide(8, 4).map(x => x + 1) → Right(3)
*? safeDivide(5, 0).map(x => x + 1) → Left("Cannot divide by zero")
*/

// TODO: Implement Left, Right, and safeDivide

class Left {
  // ...
}

class Right {
  // ...
}

function safeDivide(a, b) {
  // ...
}













// Below this comment any modification is prohibited.
module.exports = { safeDivide };
