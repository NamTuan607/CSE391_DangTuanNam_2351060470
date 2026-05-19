# PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)

## Câu A1 (5đ) — Viewport & Mobile-First

### 1) Thẻ meta viewport chuẩn

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Giải thích thuộc tính:
- `width=device-width`: đặt chiều rộng viewport bằng đúng chiều rộng thiết bị (tính theo CSS pixels).
- `initial-scale=1.0`: mức zoom ban đầu là 100% (không tự thu/phóng lúc mới tải trang).

Nếu thiếu thẻ này trên iPhone:
- Trình duyệt sẽ dùng layout viewport mặc định lớn (thường khoảng 980px).
- Trang desktop bị thu nhỏ để vừa màn hình điện thoại.
- Chữ và nút nhìn nhỏ, người dùng phải pinch-zoom để đọc/nhấn.
- Media queries có thể chạy không đúng như mong muốn responsive.

### 2) Mobile-First vs Desktop-First

Khác nhau:
- **Mobile-First**: viết CSS cơ bản cho màn hình nhỏ trước, rồi mở rộng bằng `@media (min-width: ...)`.
- **Desktop-First**: viết CSS cơ bản cho màn hình lớn trước, rồi thu gọn bằng `@media (max-width: ...)`.

Ví dụ với breakpoint 768px:

Mobile-First:
```css
/* Base: mobile */
.product-grid {
	display: grid;
	grid-template-columns: 1fr;
	gap: 12px;
}

/* Tablet trở lên */
@media (min-width: 768px) {
	.product-grid {
		grid-template-columns: repeat(3, 1fr);
	}
}
```

Desktop-First:
```css
/* Base: desktop */
.product-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 16px;
}

/* Tablet/mobile */
@media (max-width: 767.98px) {
	.product-grid {
		grid-template-columns: 1fr;
	}
}
```

Vì sao Mobile-First được khuyên dùng:
- Phù hợp thực tế người dùng mobile rất lớn.
- Tối ưu hiệu năng: CSS base nhẹ hơn cho màn hình nhỏ.
- Dễ mở rộng tăng dần tính năng (progressive enhancement).
- Ít xung đột override hơn khi dự án responsive lớn.

---

## Câu A2 (5đ) — Breakpoints

Breakpoints phổ biến (theo hệ Bootstrap):

| Breakpoint | Kích thước | Thiết bị đại diện | Ví dụ lưới sản phẩm |
|---|---:|---|---|
| `xs` | `< 576px` | Điện thoại nhỏ | 1 cột |
| `sm` | `>= 576px` | Điện thoại lớn | 2 cột |
| `md` | `>= 768px` | Tablet dọc | 2-3 cột |
| `lg` | `>= 992px` | Laptop nhỏ | 3 cột |
| `xl` | `>= 1200px` | Desktop | 4 cột |
| `xxl` | `>= 1400px` | Màn hình lớn | 5 cột |

Ghi chú: số cột thực tế tùy loại card/sản phẩm, nhưng bảng trên là cấu hình thường dùng.

---

## Câu A3 (5đ) — Media Queries

CSS đề bài:

```css
.container { width: 100%; padding: 10px; }

@media (min-width: 576px) { .container { width: 540px; } }
@media (min-width: 768px) { .container { width: 720px; } }
@media (min-width: 992px) { .container { width: 960px; } }
@media (min-width: 1200px) { .container { width: 1140px; } }
```

Bảng kết quả:

| Chiều rộng màn hình | `.container width` |
|---|---|
| 375px (iPhone SE) | `100%` (tức 375px, chưa tính padding) |
| 600px | `540px` |
| 800px | `720px` |
| 1000px | `960px` |
| 1400px | `1140px` |

Lý do: các media query `min-width` chạy theo mốc tăng dần; mốc cao hơn sẽ ghi đè mốc thấp hơn khi điều kiện đúng.

---

## Câu A4 (5đ) — SCSS Basics

### 1) Variables
Lưu giá trị tái sử dụng.

```scss
$primary-color: #3498db;
$radius: 8px;

.btn {
	background: $primary-color;
	border-radius: $radius;
}
```

### 2) Nesting
Viết selector lồng nhau cho dễ đọc cấu trúc.

```scss
.nav {
	display: flex;

	a {
		color: #333;

		&:hover {
			color: #3498db;
		}
	}
}
```

### 3) Mixins (`@mixin`, `@include`)
Tạo "hàm style" tái sử dụng.

```scss
@mixin center-flex {
	display: flex;
	justify-content: center;
	align-items: center;
}

.hero {
	@include center-flex;
	min-height: 60vh;
}
```

### 4) `@extend` / Inheritance
Kế thừa style từ class khác.

```scss
.btn-base {
	padding: 10px 14px;
	border: none;
	border-radius: 6px;
}

.btn-primary {
	@extend .btn-base;
	background: #3498db;
	color: #fff;
}
```

Tại sao trình duyệt không đọc được `.scss`:
- `.scss` là ngôn ngữ tiền xử lý (preprocessor syntax), không phải CSS chuẩn mà browser parse trực tiếp.

Bước cần làm để SCSS -> CSS:
- Biên dịch bằng Sass compiler (CLI/tool/build step), ví dụ:
```bash
sass input.scss output.css
```
- Sau đó link file `.css` đã biên dịch vào HTML.
