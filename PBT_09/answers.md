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

## Phần C - Debug & Phân tích

### Câu C1 - Debug DOM Code

**Các lỗi và cách sửa**

1. `document.querySelector("#decrementBtn").addEventListener("onclick", ...)` sai loại event.
   - Sửa thành `addEventListener("click", ...)`.
2. `countDisplay = count;` đang gán lại biến DOM thay vì cập nhật nội dung hiển thị.
   - Sửa thành `countDisplay.textContent = count;`.
3. `historyList.innerHTML = null;` không phải cách xóa chuẩn cho danh sách.
   - Sửa thành `historyList.textContent = "";` hoặc `historyList.innerHTML = "";`.
4. Trong `clearHistory`, `item.remove;` chỉ tham chiếu hàm chứ không gọi hàm.
   - Sửa thành `item.remove();`.
5. Khi lưu `count` vào `localStorage`, đọc lại bằng `localStorage.getItem("count")` trả về chuỗi.
   - Cần ép kiểu về số khi load, ví dụ `count = Number(localStorage.getItem("count")) || 0;`.
6. Dùng `innerHTML` để hiển thị count là không cần thiết và dễ mở rộng thành thói quen xấu.
   - Sửa thành `textContent`.
7. Hàm `deleteHistory(element)` nên xóa đúng phần tử `li`, và có thể gọi trực tiếp `element.remove()`.
   - Cách hiện tại cũng chạy, nhưng viết gọn hơn là `element.remove()`.
8. Khi load dữ liệu từ `localStorage`, `historyList.innerHTML = localStorage.getItem("history")` bị bỏ qua hoàn toàn trong code gốc.
   - Cần khôi phục cả count lẫn history.

**Code đã sửa**

```js
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");

let count = Number(localStorage.getItem("count")) || 0;

function renderCount() {
	countDisplay.textContent = count;
}

document.querySelector("#incrementBtn").addEventListener("click", function () {
	count++;
	renderCount();

	const li = document.createElement("li");
	li.textContent = "Count changed to " + count;
	li.addEventListener("click", function () {
		deleteHistory(this);
	});
	historyList.appendChild(li);
});

document.querySelector("#decrementBtn").addEventListener("click", function () {
	count--;
	renderCount();
});

document.querySelector("#resetBtn").addEventListener("click", () => {
	count = 0;
	renderCount();
	historyList.textContent = "";
});

function deleteHistory(element) {
	element.remove();
}

document.querySelector("#clearHistory").addEventListener("click", () => {
	const items = historyList.querySelectorAll("li");
	items.forEach(item => item.remove());
});

window.addEventListener("beforeunload", () => {
	localStorage.setItem("count", String(count));
	localStorage.setItem("history", historyList.innerHTML);
});

window.addEventListener("load", () => {
	renderCount();
	historyList.innerHTML = localStorage.getItem("history") || "";
});
```

### Câu C2 - Performance

**1) Vì sao bind event lên 1000 elements riêng lẻ là bad practice?**

- Tốn bộ nhớ hơn vì mỗi element giữ một listener riêng.
- Tốn thời gian khởi tạo vì phải attach 1000 handlers.
- Khó bảo trì khi elements được tạo/xóa động.
- Nếu render lại list, phải bind lại toàn bộ listeners.

**Event Delegation giải quyết thế nào?**

- Chỉ bind 1 listener lên phần tử cha, ví dụ container list.
- Khi user click, dùng `event.target` hoặc `closest()` để xác định item thật sự được thao tác.
- Ít listener hơn, dễ quản lý với DOM động, phù hợp cho list lớn.

**2) Refactor bằng `DocumentFragment`**

```js
const list = document.querySelector("#list");
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
	const item = document.createElement("li");
	item.textContent = `Item ${i + 1}`;
	fragment.appendChild(item);
}

list.appendChild(fragment);
```

**Vì sao nhanh hơn?**

- `DocumentFragment` là vùng chứa tạm trong bộ nhớ, chưa gắn trực tiếp vào DOM.
- Ta tạo 1000 node trong fragment trước, rồi append một lần duy nhất vào DOM.
- Nhờ đó trình duyệt giảm số lần reflow/repaint so với việc append từng phần tử một.
- Kết quả là render nhanh hơn và mượt hơn, đặc biệt với danh sách lớn.
