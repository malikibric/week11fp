// ************ TASK DESCRIPTION ************
//? Safe Property Access with Maybe

/*
*   You are working with unreliable objects where some properties might be missing.
*
*   Write a function `getSafeProperty(attr)` that:
*   - Accepts a key name
*   - Returns a function that:
*     - Accepts an object
*     - Returns a Maybe monad (Just or Nothing)
*       depending on whether the key exists and is not null/undefined
*
*   This avoids runtime errors when accessing optional fields.
*
*? Example:
*? const getEmail = getSafeProperty("email");
*? getEmail({ email: "a@b.com" }) → Just("a@b.com")
*? getEmail({}) → Nothing()
*/

// TODO: Implement getSafeProperty and the Maybe classes


class Maybe {
    // TODO create the "of" method to match the expected behaviour needed in getSafeProperty function
    static of(){
        
    }
}

// TODO Implement the getSafeProperty
function getSafeProperty() {
}











// Below this comment any modification is prohibited.

class Just {
    constructor(value) {
    this.value = value;
    }

    map(fn) {
        return Maybe.of(fn(this.value));
    }

    toString() {
        return `Just(${this.value})`;
    }
}

class Nothing {
    map(_) {
        return this;
    }

    toString() {
        return "Nothing()";
    }
}

module.exports = { getSafeProperty, Maybe };
