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

## Phần C - Suy luận

### Câu C1 - Debug JavaScript

**Các lỗi chính trong đoạn code**

1. Điều kiện `if (phanTramGiam  100)` bị thiếu toán tử so sánh.
   - Sửa thành `if (phanTramGiam < 0 || phanTramGiam > 100)`.
2. `giaBan` và `phanTramGiam` có thể nhận chuỗi, làm phép tính sai hoặc tạo kết quả không mong muốn.
   - Sửa bằng cách ép kiểu và kiểm tra `typeof`/`Number.isNaN` trước khi tính.
3. `if (giaSauGiam = 0)` dùng phép gán thay vì so sánh.
   - Sửa thành `if (giaSauGiam === 0)`.
4. `var` trong vòng lặp dễ gây lỗi do phạm vi hàm và hoisting.
   - Sửa bằng `let i` để mỗi vòng lặp có biến riêng.
5. `giaBan` trong test đầu vào là chuỗi `"100000"`, nên cần chuyển thành số trước khi tính.
   - Sửa bằng `Number(giaBan)` hoặc yêu cầu input số.
6. Thiếu xử lý trường hợp phần trăm giảm âm hoặc lớn hơn 100.
   - Sửa bằng kiểm tra biên hợp lệ trước khi tính.

**Code đã sửa**

```js
function tinhGiaGiamGia(giaBan, phanTramGiam) {
	if (typeof giaBan !== "number" || typeof phanTramGiam !== "number" || Number.isNaN(giaBan) || Number.isNaN(phanTramGiam)) {
		return "Dữ liệu không hợp lệ";
	}

	if (phanTramGiam < 0 || phanTramGiam > 100) {
		return "Phần trăm giảm không hợp lệ";
	}

	const giamGia = giaBan * phanTramGiam / 100;
	const giaSauGiam = giaBan - giamGia;

	if (giaSauGiam === 0) {
		console.log("Sản phẩm miễn phí!");
	}

	return giaSauGiam;
}

const gia = tinhGiaGiamGia(100000, 20);
console.log("Giá sau giảm: " + gia + "đ");

const gia2 = tinhGiaGiamGia(50000, 110);
console.log("Giá: " + gia2);

for (let i = 0; i < 5; i++) {
	setTimeout(function() {
		console.log("Item " + i);
	}, 1000);
}
```

**Giải thích lỗi `var` trong vòng lặp**

`var` có phạm vi hàm, không có phạm vi block. Khi `setTimeout` chạy sau 1 giây, vòng lặp đã kết thúc và `i` đã trở thành 5, nên in ra cùng một giá trị. Dùng `let` sẽ tạo một biến riêng cho từng vòng lặp, nên mỗi callback giữ đúng giá trị tại thời điểm được tạo.

### Câu C2 - Bài toán thực tế

**Cách xử lý**

- Tính tổng tiền món ăn từ danh sách `items`.
- Áp dụng giảm giá theo ngưỡng tổng: trên 1 triệu giảm 15%, trên 500k giảm 10%.
- Nếu là Wednesday thì cộng thêm 5% giảm giá.
- Tính VAT 8% trên số tiền sau giảm giá.
- Tip là tùy chọn, mặc định 5% trên số tiền sau giảm giá.

**Lưu ý**

- Em tính các khoản giảm theo kiểu cộng dồn phần trăm trên tổng trước giảm.
- VAT và tip được tính sau khi đã giảm giá.

**Ví dụ đầu ra**

```js
const items = [
	{ name: "Phở bò", price: 65000, quantity: 2 },
	{ name: "Trà đá", price: 5000, quantity: 3 },
	{ name: "Bún chả", price: 55000, quantity: 1 },
];

const bill = generateRestaurantBill(items, {
	isWednesday: false,
	tipPercent: 5,
});

console.log(bill);
```

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

