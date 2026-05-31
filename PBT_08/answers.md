# PBT_08 - JavaScript Functions & Arrays

## Phần A - Kiểm tra đọc hiểu

### Câu A1 - Function Declaration vs Expression vs Arrow

**1) Function Declaration**

```js
function tinhThueBaoHiem(luong) {
	const thue = luong > 11000000 ? luong * 0.1 : 0;
	return {
		thuong: thue,
		thuc_nhan: luong - thue,
	};
}

console.log(tinhThueBaoHiem(12000000));
```

**2) Function Expression**

```js
const tinhThueBaoHiem = function (luong) {
	const thue = luong > 11000000 ? luong * 0.1 : 0;
	return {
		thuong: thue,
		thuc_nhan: luong - thue,
	};
};

console.log(tinhThueBaoHiem(12000000));
```

**3) Arrow Function**

```js
const tinhThueBaoHiem = (luong) => {
	const thue = luong > 11000000 ? luong * 0.1 : 0;
	return {
		thuong: thue,
		thuc_nhan: luong - thue,
	};
};

console.log(tinhThueBaoHiem(12000000));
```

**Hoisting có khác nhau không?**

Có. Ba cách này khác nhau rõ ở hoisting:

- `function declaration` được hoist cả phần khai báo lẫn thân hàm, nên có thể gọi trước khi xuất hiện trong code.
- `function expression` gán cho `const` hoặc `let` thì biến được hoist nhưng nằm trong temporal dead zone, nên gọi trước khi khai báo sẽ lỗi `ReferenceError`.
- `arrow function` cũng là một dạng function expression, nên hành vi hoisting giống function expression khi gán cho `const` hoặc `let`.

**Ví dụ cụ thể**

```js
console.log(foo(12));
function foo(luong) {
	return luong;
}

console.log(bar(12));
const bar = function (luong) {
	return luong;
};

console.log(baz(12));
const baz = (luong) => luong;
```

- `foo(12)` chạy được vì function declaration được hoist đầy đủ.
- `bar(12)` và `baz(12)` lỗi vì biến chưa được khởi tạo tại thời điểm gọi.

### Câu A2 - Scope & Closure

**Đoạn 1**

```js
function counter() {
	let count = 0;
	return {
		increment: () => ++count,
		decrement: () => --count,
		getCount: () => count
	};
}
const c = counter();
console.log(c.increment());  // 1
console.log(c.increment());  // 2
console.log(c.increment());  // 3
console.log(c.decrement());  // 2
console.log(c.getCount());   // 2
```

**Giải thích**

Ba hàm `increment`, `decrement`, `getCount` đều đóng gói và dùng chung biến `count` ở scope bên ngoài. Đây là closure, nên giá trị `count` được giữ lại giữa các lần gọi.

**Đoạn 2**

```js
for (var i = 0; i < 3; i++) {
	setTimeout(() => console.log("var:", i), 100);
}

for (let j = 0; j < 3; j++) {
	setTimeout(() => console.log("let:", j), 200);
}
```

**Output sau 200ms**

```js
var: 3
var: 3
var: 3
let: 0
let: 1
let: 2
```

**Giải thích chi tiết**

- Với `var`, chỉ có một biến `i` dùng chung cho cả vòng lặp. Đến lúc `setTimeout` chạy, vòng lặp đã kết thúc và `i` đã là `3`.
- Với `let`, mỗi vòng lặp tạo một binding riêng cho `j`, nên mỗi callback giữ đúng giá trị tại thời điểm nó được tạo.

### Câu A3 - Array Methods

```js
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1
const evenNums = nums.filter(n => n % 2 === 0);

// 2
const tripleNums = nums.map(n => n * 3);

// 3
const total = nums.reduce((sum, n) => sum + n, 0);

// 4
const firstGreaterThan7 = nums.find(n => n > 7);

// 5
const hasGreaterThan10 = nums.some(n => n > 10);

// 6
const allGreaterThan0 = nums.every(n => n > 0);

// 7
const parityLabels = nums.map(n => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);

// 8
const reversedNums = [...nums].reverse();
```

### Câu A4 - Object Destructuring & Spread

```js
const product = {
	name: "iPhone 16",
	price: 25990000,
	specs: { ram: 8, storage: 256, color: "Titan" }
};

const { name, price, specs: { ram, color } } = product;
console.log(name, price, ram, color);  // iPhone 16 25990000 8 Titan
console.log(specs);                     // ReferenceError: specs is not defined

const updated = { ...product, price: 23990000, sale: true };
console.log(updated.price);             // 23990000
console.log(updated.sale);              // true
console.log(product.price);             // 25990000

const copy = { ...product };
copy.specs.ram = 16;
console.log(product.specs.ram);         // 16
```

**Giải thích**

- Dòng `const { name, price, specs: { ram, color } } = product;` chỉ lấy các thuộc tính được chỉ định, nhưng không tạo biến tên `specs` ở scope ngoài.
- Toán tử spread ở mức object tạo bản sao nông (shallow copy), nên `updated` là object mới và `product.price` không đổi.
- `copy = { ...product }` chỉ sao chép tầng đầu. `copy.specs` và `product.specs` vẫn trỏ tới cùng một object con, nên sửa `copy.specs.ram` sẽ làm `product.specs.ram` thay đổi theo.

## Phần C - Suy luận

### Câu C1 - Refactor Code

```js
const processOrders = (orders) =>
	orders
		.filter(({ status, total }) => status === "completed" && total > 100000)
		.map(({ id, customer, total }) => ({ id, customer, total, discount: total * 0.1, finalTotal: total * 0.9 }))
		.sort((a, b) => b.finalTotal - a.finalTotal);
```

**Giải thích**

- `filter` lấy đúng các đơn hoàn thành và có giá trị lớn hơn 100000.
- `map` tạo object mới bằng destructuring và tính luôn `discount`, `finalTotal`.
- `sort` sắp xếp giảm dần theo `finalTotal`.
- Viết lại như trên giúp code ngắn hơn, ít biến trung gian hơn và dễ đọc hơn.

### Câu C2 - Thiết kế API

```js
const miniArray = {
	map(arr, fn) {
		const result = [];
		for (let i = 0; i < arr.length; i++) {
			result.push(fn(arr[i], i, arr));
		}
		return result;
	},

	filter(arr, fn) {
		const result = [];
		for (let i = 0; i < arr.length; i++) {
			if (fn(arr[i], i, arr)) {
				result.push(arr[i]);
			}
		}
		return result;
	},

	reduce(arr, fn, initialValue) {
		let accumulator = initialValue;
		let startIndex = 0;

		if (accumulator === undefined) {
			if (arr.length === 0) {
				throw new TypeError("Reduce of empty array with no initial value");
			}
			accumulator = arr[0];
			startIndex = 1;
		}

		for (let i = startIndex; i < arr.length; i++) {
			accumulator = fn(accumulator, arr[i], i, arr);
		}

		return accumulator;
	}
};

console.log(miniArray.map([1, 2, 3], x => x * 2));
console.log(miniArray.filter([1, 2, 3, 4], x => x > 2));
console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b, 0));
```

**Giải thích**

- `map` tạo mảng mới có cùng độ dài, mỗi phần tử là kết quả của callback.
- `filter` chỉ giữ lại phần tử thỏa điều kiện callback.
- `reduce` dùng một accumulator để gộp từng phần tử thành một kết quả duy nhất.
- `reduce` ở trên xử lý cả trường hợp có và không có `initialValue`, giống tinh thần của `Array.prototype.reduce`.
