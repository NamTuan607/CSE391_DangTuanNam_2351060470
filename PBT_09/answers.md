# PBT_09 - JavaScript DOM

## Phần A - Kiểm tra đọc hiểu

### Câu A1 - DOM Tree

**1) DOM tree**

```text
document
└── html
	└── body
		└── main / app container
			├── h1
			├── nav
			│   └── ul
			│       ├── li
			│       │   └── a
			│       ├── li
			│       │   └── a
			│       └── li
			│           └── a
			├── form
			│   ├── input
			│   └── button
			└── ul#todoList
				├── li.todo-item
				└── li.todo-item
```

**2) querySelector / querySelectorAll**

1. Chọn thẻ `form`

```js
document.querySelector("form")
```

2. Chọn input trong form

```js
document.querySelector("form input")
```

3. Chọn tất cả `.todo-item`

```js
document.querySelectorAll(".todo-item")
```

4. Chọn link đang active

```js
document.querySelector("a.active")
```

5. Chọn `li` đầu tiên trong `#todoList`

```js
document.querySelector("#todoList li:first-child")
```

6. Chọn tất cả `a` bên trong `nav`

```js
document.querySelectorAll("nav a")
```

### Câu A2 - innerHTML vs textContent

**Khác nhau**

- `innerHTML` đọc/ghi nội dung HTML bên trong phần tử, nên trình duyệt sẽ parse các thẻ HTML.
- `textContent` chỉ đọc/ghi văn bản thuần, không parse HTML.

**Khi nào dùng**

- Dùng `textContent` khi chỉ cần hiển thị text an toàn, ví dụ tên người dùng, điểm số, thông báo.
- Dùng `innerHTML` khi thật sự cần chèn markup HTML có kiểm soát, ví dụ render template cố định từ code.

**Vì sao `innerHTML` có thể gây XSS?**

Nếu chèn trực tiếp dữ liệu do user nhập vào bằng `innerHTML`, kẻ tấn công có thể đưa vào HTML hoặc script độc hại. Trình duyệt sẽ parse và thực thi nội dung đó trong một số trường hợp, làm lộ cookie, token hoặc thao tác trái phép trên trang.

**Ví dụ nguy hiểm**

```js
const userInput = document.querySelector("#search").value;
document.querySelector("#result").innerHTML = userInput;
```

Nếu user nhập:

```html
<img src="x" onerror="alert('XSS')">
```

thì đoạn này có thể được thực thi khi render.

**Sửa thế nào?**

```js
const userInput = document.querySelector("#search").value;
document.querySelector("#result").textContent = userInput;
```

Nếu bắt buộc dùng HTML, phải escape/sanitize dữ liệu đầu vào trước khi gán.

### Câu A3 - Event Bubbling

**Khi click vào button, output là:**

```js
BUTTON
INNER
OUTER
```

**Giải thích**

Sự kiện click đi từ phần tử được click (`button`) lên các phần tử cha theo cơ chế bubbling. Nên handler của button chạy trước, rồi đến `#inner`, rồi đến `#outer`.

**Nếu uncomment `e.stopPropagation()`**

```js
BUTTON
```

`stopPropagation()` chặn sự kiện tiếp tục bubbling lên cha, nên chỉ còn log ở button.
