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

---

## Bài B3 (20đ) — SCSS Refactor

### Cấu trúc file partial

```text
PBT_05/
├── scss/
│   ├── _variables.scss
│   ├── _mixins.scss
│   ├── _components.scss
│   └── style.scss
├── style.css
└── style.css.map
```

### Đáp ứng yêu cầu

- Variables: đã khai báo và dùng nhất quán (>= 8 biến), gồm:
	- `$primary-color`, `$secondary-color`, `$font-primary`
	- `$breakpoint-tablet`, `$breakpoint-desktop`
	- `$spacing-sm`, `$spacing-md`, `$spacing-lg`
	- thêm các biến hỗ trợ như `$bg-color`, `$line-color`, `$radius-md`.
- Nesting: có nhiều block nested, ví dụ trong `.site-header`, `.card`, `.sidebar` với parent selector `&:hover`, `&.featured`.
- Mixins: đã tạo và sử dụng 3 mixins:
	- `@mixin respond-to($breakpoint)`
	- `@mixin flex-center`
	- `@mixin card-shadow($hover: false)`
- Partial & Import: `style.scss` import 3 partial theo đúng yêu cầu.

### Lệnh compile SCSS -> CSS đã dùng

```bash
npx sass scss/style.scss style.css
```

Kết quả: compile thành công, tạo `style.css` và `style.css.map` trong thư mục `PBT_05`.

---

## PHẦN C — PHÂN TÍCH (20 điểm)

## Câu C1 (10đ) — Phân tích trang web thực (YouTube)

Trang được chọn: **YouTube** (`https://www.youtube.com`).

Screenshot 3 kích thước đã lưu:
- [PBT_05/screenshots/c1_youtube_375.png](screenshots/c1_youtube_375.png)
- [PBT_05/screenshots/c1_youtube_768.png](screenshots/c1_youtube_768.png)
- [PBT_05/screenshots/c1_youtube_1440.png](screenshots/c1_youtube_1440.png)

Phân tích:

1) Navigation thay đổi thế nào?
- Mobile (375px): top bar rất gọn, có nút menu/guide icon, phần điều hướng chính chuyển xuống bottom navigation kiểu app (Home, Shorts, Subscriptions, You).
- Tablet (768px): top bar vẫn giữ icon-based compact navigation, không hiển thị đầy đủ sidebar rộng như desktop.
- Desktop (1440px): header đầy đủ hơn, vùng trái có guide button + brand; điều hướng/phần chức năng mở rộng hơn và không dùng bottom nav.

2) Lưới content thay đổi mấy cột?
- Mobile: layout feed ưu tiên 1 cột lớn.
- Tablet: thường tăng lên 2 cột (tùy vùng nội dung).
- Desktop: nhiều cột hơn (thường 4+ cột với khung rộng).

3) Elements nào bị ẩn trên mobile?
- Nhiều thành phần phụ của desktop như sidebar rộng, một số nhãn chữ dài và nhóm action phụ.
- Những vùng ưu tiên thấp (gợi ý phụ, panel mở rộng) được rút gọn hoặc ẩn.

4) Font size có thay đổi không?
- Có. Mobile dùng chữ nhỏ/gọn hơn để tối ưu mật độ thông tin.
- Desktop tăng nhẹ cỡ chữ ở một số heading/label để dễ đọc trên màn hình lớn.

5) Media query evidence (lấy từ stylesheet runtime)
- Môi trường tự động không mở được panel DevTools Styles để chụp trực tiếp panel, nhưng đã trích được các điều kiện `@media` mà trang dùng, ví dụ:
	- `@media (min-width: 792px)`
	- `@media only screen and (max-width: 600px)`
	- `@media (min-width: 1024px)`
	- `@media (min-width: 600px)`
- Khi nộp bài, bạn có thể chụp thêm 2 ảnh trong DevTools Styles theo đúng yêu cầu chấm điểm.

---

## Câu C2 (10đ) — Thiết kế Responsive Strategy (Trang Đặt bàn nhà hàng)

### Wireframe 3 kích thước

Mobile (<768px)

```text
┌──────────────────────────────┐
│ Header: Logo + Call Button   │
├──────────────────────────────┤
│ Hero Image                   │
├──────────────────────────────┤
│ Form Đặt Bàn                 │
│ (ngày, giờ, số người, note)  │
├──────────────────────────────┤
│ Grid ảnh món (1 cột)         │
├──────────────────────────────┤
│ Google Map                   │
├──────────────────────────────┤
│ Footer                        │
└──────────────────────────────┘
```

Mobile ẩn gì?
- Không cần sidebar riêng.
- Rút gọn menu phụ; ưu tiên CTA gọi điện + form đặt bàn.
- Form đặt bàn đặt ngay sau hero để tăng conversion.

Tablet (768px - 1023px)

```text
┌──────────────────────────────────────┐
│ Header: Logo + Phone + Nav compact   │
├──────────────────────────────────────┤
│ Hero Image                            │
├──────────────────────────────────────┤
│ Form Đặt Bàn                          │
├──────────────────────────────────────┤
│ Grid ảnh món (2-3 cột)               │
├──────────────────────────────────────┤
│ Google Map (full width dưới grid)     │
├──────────────────────────────────────┤
│ Footer                                │
└──────────────────────────────────────┘
```

Tablet:
- Grid ảnh nên để 2 cột (hoặc 3 cột nếu card nhỏ).
- Bản đồ đặt dưới grid để tránh layout quá dày theo chiều ngang.

Desktop (>=1024px)

```text
┌──────────────────────────────────────────────────────────┐
│ Header: Logo | Nav | Phone CTA                           │
├──────────────────────────────────────────────────────────┤
│ Hero full width                                           │
├──────────────────────────────┬───────────────────────────┤
│ Form Đặt Bàn                 │ Google Map                │
├──────────────────────────────┴───────────────────────────┤
│ Grid ảnh món (3 cột)                                      │
├──────────────────────────────────────────────────────────┤
│ Footer                                                     │
└──────────────────────────────────────────────────────────┘
```

Desktop:
- Layout chính 2 cột cho khu vực form + map.
- Không cần sidebar riêng; thay vào đó ưu tiên nội dung và CTA rõ ràng.

### CSS skeleton (Grid + Media Queries Mobile-First)

```css
/* Mobile-first */
.page {
	display: grid;
	grid-template-areas:
		"header"
		"hero"
		"booking"
		"gallery"
		"map"
		"footer";
	gap: 16px;
}

.header  { grid-area: header; }
.hero    { grid-area: hero; }
.booking { grid-area: booking; }
.gallery { grid-area: gallery; }
.map     { grid-area: map; }
.footer  { grid-area: footer; }

.gallery-grid {
	display: grid;
	grid-template-columns: 1fr;
	gap: 12px;
}

/* Tablet */
@media (min-width: 768px) {
	.page {
		gap: 20px;
	}

	.gallery-grid {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
}

/* Desktop */
@media (min-width: 1024px) {
	.page {
		grid-template-areas:
			"header header"
			"hero hero"
			"booking map"
			"gallery gallery"
			"footer footer";
		grid-template-columns: 1fr 1fr;
		gap: 24px;
	}

	.gallery-grid {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}
}
```
