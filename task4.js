// ************ TASK DESCRIPTION ************
//? Try Monad

/*
*   You are working with risky code that may throw errors during execution.
*
*   Implement a `Try.of(() => expr, errorMsg)` function that:
*   - Executes the expression passed as a function
*   - Returns Right(value) if successful
*   - Returns Left(errorMsg) if an error is thrown
*
*   In addition to `Try`, you must implement the `Left` and `Right` classes to wrap
*   the result or error. These classes are part of the Either monad pattern.
*
*   `Right(x)` should:
*   - Hold a successful value
*   - Implement `.map(fn)` to transform the value using the provided function
*   - Implement `.toString()` that returns: Right(value)
*
*   `Left(x)` should:
*   - Hold an error message or failed value
*   - Ignore `.map(fn)` and return itself
*   - Implement `.toString()` that returns: Left(error)
*
*? Examples:
*? Try.of(() => JSON.parse('{"x":1}'), "Invalid JSON") → Right({ x: 1 })
*? Try.of(() => JSON.parse('{x:1}'), "Invalid JSON") → Left("Invalid JSON")
*/

// TODO: Implement Left and Right

// Left represents a failed computation
class Left {

}

// Right represents a successful computation
class Right {

}

const Try = {
  of: (fn, errorMsg) => {
    try {
    } catch (_) {
    }
  }
};

// Below this comment any modification is prohibited.
module.exports = { Try };
