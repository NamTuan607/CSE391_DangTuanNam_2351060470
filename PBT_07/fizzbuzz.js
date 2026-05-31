function customFizzBuzz(n, rules) {
    for (let number = 1; number <= n; number++) {
        let output = "";

        for (let i = 0; i < rules.length; i++) {
            const rule = rules[i];
            if (number % rule.divisor === 0) {
                output += rule.word;
            }
        }

        if (output === "") {
            output = String(number);
        }

        console.log(output);
    }
}

function classicFizzBuzz() {
    for (let number = 1; number <= 100; number++) {
        let output = "";

        if (number % 3 === 0) {
            output += "Fizz";
        }

        if (number % 5 === 0) {
            output += "Buzz";
        }

        if (output === "") {
            output = String(number);
        }

        console.log(output);
    }
}

classicFizzBuzz();

console.log("\n--- Custom FizzBuzz ---");
customFizzBuzz(30, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" },
]);

if (typeof module !== "undefined") {
    module.exports = { customFizzBuzz, classicFizzBuzz };
}