// A1 - var / let / const
console.log(x);
var x = 5;

try {
    console.log(y);
} catch (error) {
    console.log(error.name + ": " + error.message);
}
let y = 10;

try {
    const z = 15;
    z = 20;
    console.log(z);
} catch (error) {
    console.log(error.name + ": " + error.message);
}

const arr = [1, 2, 3];
arr.push(4);
console.log(arr);

let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);
}
console.log("Ngoài block:", a);