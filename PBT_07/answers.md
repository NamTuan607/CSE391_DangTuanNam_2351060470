# PBT_07 - JavaScript Basics

## Phần A - Kiểm tra đọc hiểu

### Câu A1 - var / let / const

**Dự đoán output**

```js
// Đoạn 1
console.log(x);
var x = 5;
// undefined

// Đoạn 2
console.log(y);
let y = 10;
// ReferenceError: Cannot access 'y' before initialization

// Đoạn 3
const z = 15;
z = 20;
console.log(z);
// TypeError: Assignment to constant variable.

// Đoạn 4
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);
// [1, 2, 3, 4]

// Đoạn 5
let a = 1;
{
	let a = 2;
	console.log("Trong block:", a);
}
console.log("Ngoài block:", a);
// Trong block: 2
// Ngoài block: 1
```

**Giải thích ngắn**

- `var` bị hoist và được khởi tạo mặc định là `undefined`, nên `console.log(x)` in ra `undefined`.
- `let` cũng được hoist nhưng nằm trong temporal dead zone, nên truy cập trước khi khai báo sẽ lỗi.
- `const` không cho gán lại biến, nên `z = 20` gây `TypeError`.
- `const` chỉ cố định tham chiếu, không làm mảng trở thành bất biến; `push` vẫn đổi được nội dung mảng.
- Biến `a` trong block là biến khác với `a` bên ngoài do phạm vi block.

**File kiểm tra**

File: [var_let_const.js](var_let_const.js)

Kết quả chạy thực tế khớp với dự đoán trên.

### Câu A2 - Data Types & Coercion

**Dự đoán kết quả**

```js
console.log(typeof null);      // object
console.log(typeof undefined); // undefined
console.log(typeof NaN);       // number
console.log("5" + 3);          // "53"
console.log("5" - 3);          // 2
console.log("5" * "3");       // 15
console.log(true + true);      // 2
console.log([] + []);          // ""
console.log([] + {});          // "[object Object]"
console.log({} + []);          // "[object Object]"
```

**Giải thích**

- `+` ưu tiên nối chuỗi nếu có một toán hạng là string, nên `"5" + 3` thành `"53"`.
- `-`, `*`, `/` buộc ép kiểu về number, nên `"5" - 3` thành `2`.
- `[] + []` là hai mảng rỗng, cả hai đổi về chuỗi rỗng nên kết quả là `""`.
- `[] + {}` và `{}` + `[]` trong ngữ cảnh này đều được ép kiểu qua chuỗi, nên cho `"[object Object]"`.

### Câu A3 - So sánh `==` vs `===`

```js
console.log(5 == "5");          // true
console.log(5 === "5");         // false
console.log(null == undefined);   // true
console.log(null === undefined);  // false
console.log(NaN == NaN);          // false
console.log(0 == false);          // true
console.log(0 === false);         // false
console.log("" == false);        // true
```

**Quy tắc nên dùng**

Nên dùng `===` vì so sánh cả giá trị lẫn kiểu dữ liệu, tránh ép kiểu ngầm và giảm lỗi khó đoán. Chỉ dùng `==` khi thật sự muốn chấp nhận ép kiểu theo quy tắc cụ thể của JavaScript.

### Câu A4 - Truthy & Falsy

**Tất cả giá trị falsy trong JavaScript**

- `false`
- `0`
- `-0`
- `0n`
- `""`
- `null`
- `undefined`
- `NaN`

**Dự đoán**

```js
if ("0") console.log("A");   // In
if ("") console.log("B");    // Không in
if ([]) console.log("C");     // In
if ({}) console.log("D");     // In
if (null) console.log("E");   // Không in
if (0) console.log("F");      // Không in
if (-1) console.log("G");     // In
if (" ") console.log("H");   // In
```

**Lý do**

- Chuỗi `"0"` vẫn là truthy vì không rỗng.
- Mảng và object luôn truthy, kể cả khi rỗng.
- Khoảng trắng trong chuỗi `" "` vẫn là một chuỗi không rỗng nên truthy.

### Câu A5 - Template Literals

```js
// Cách 1
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

// Cách 2
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;

// Cách 3
var html = `${title}${description}

Giá: ${price}đ
`;
```

