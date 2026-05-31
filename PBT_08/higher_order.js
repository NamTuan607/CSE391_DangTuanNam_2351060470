function pipe(...fns) {
    return (initialValue) => fns.reduce((value, fn) => fn(value), initialValue);
}

function memoize(fn) {
    const cache = new Map();

    return function (...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }

        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

function debounce(fn, delay) {
    let timeoutId;

    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
}

async function retry(fn, maxAttempts = 3) {
    let lastError;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
        }
    }

    throw lastError;
}

const process = pipe(
    x => x * 2,
    x => x + 10,
    x => x.toString(),
    x => "Kết quả: " + x
);
console.log(process(5));

const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) {
        result += i;
    }
    return result;
});
console.log(expensiveCalc(1000000));
console.log(expensiveCalc(1000000));

const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);

search("J");
search("Ja");
search("Jav");

async function demoRetry() {
    let attempts = 0;
    const result = await retry(async () => {
        attempts++;
        if (attempts < 2) {
            throw new Error("Tạm lỗi");
        }
        return "Retry OK";
    }, 3);
    console.log(result);
}

demoRetry();

if (typeof module !== "undefined") {
    module.exports = { pipe, memoize, debounce, retry };
}