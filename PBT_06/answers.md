# PHẦN A — ĐỌC HIỂU (20 điểm)

## Câu A1 (10đ) — Grid System

Với HTML:

```html
<div class="container">
    <div class="row">
        <div class="col-12 col-md-6 col-lg-3">Box 1</div>
        <div class="col-12 col-md-6 col-lg-3">Box 2</div>
        <div class="col-12 col-md-6 col-lg-3">Box 3</div>
        <div class="col-12 col-md-6 col-lg-3">Box 4</div>
    </div>
</div>
```

### Bảng layout theo kích thước

| Kích thước | Số cột | Box layout |
|---|---:|---|
| `< 768px` | 1 cột | Mỗi box chiếm 12/12, xếp dọc: Box 1, Box 2, Box 3, Box 4 |
| `768px - 991px` | 2 cột | Mỗi box chiếm 6/12, xếp 2 hàng: hàng 1 là Box 1 + Box 2, hàng 2 là Box 3 + Box 4 |
| `≥ 992px` | 4 cột | Mỗi box chiếm 3/12, xếp 1 hàng: Box 1, Box 2, Box 3, Box 4 |

### Minh họa nhanh

`< 768px`

```text
┌──────────────┐
│    Box 1     │
├──────────────┤
│    Box 2     │
├──────────────┤
│    Box 3     │
├──────────────┤
│    Box 4     │
└──────────────┘
```

`768px - 991px`

```text
┌──────────────┬──────────────┐
│    Box 1     │    Box 2     │
├──────────────┼──────────────┤
│    Box 3     │    Box 4     │
└──────────────┴──────────────┘
```

`≥ 992px`

```text
┌────────┬────────┬────────┬────────┐
│ Box 1  │ Box 2  │ Box 3  │ Box 4  │
└────────┴────────┴────────┴────────┘
```

### Câu hỏi thêm

`col-md-6` nghĩa là gì?
- Là cột có độ rộng `6/12` trong lưới Bootstrap khi màn hình từ breakpoint `md` trở lên, tức là từ `768px`.
- Nghĩa là trên tablet trở lên, mỗi box chiếm nửa hàng.

Tại sao không cần viết `col-sm-12`?
- Vì `col-12` đã là kiểu mặc định cho màn hình nhỏ hơn `md`.
- Bootstrap dùng mobile-first: lớp `col-md-6` chỉ áp dụng từ `md` trở lên, còn dưới `md` thì vẫn giữ `col-12`.
- Do đó không cần viết thêm `col-sm-12` vì nó không thay đổi kết quả so với `col-12`.

---

## Câu A2 (10đ) — Utilities & Components

### 1) Giải thích `d-none d-md-block`

- `d-none`: ẩn phần tử ở mọi kích thước màn hình.
- `d-md-block`: từ breakpoint `md` trở lên (`≥ 768px`) thì hiển thị phần tử dưới dạng `block`.

Kết luận:
- Ẩn khi màn hình `< 768px`.
- Hiện khi màn hình `≥ 768px`.

### 2) 5 spacing utilities và ý nghĩa

Bootstrap dùng cú pháp:
- `m` = margin
- `p` = padding
- hướng: `t` top, `b` bottom, `s` start, `e` end, `x` trục ngang, `y` trục dọc, không có hướng là cả 4 phía
- giá trị: thường từ `0` đến `5`, hoặc `auto`

Ví dụ:

1. `mt-3`
- margin-top ở mức 3.
- Tạo khoảng cách phía trên phần tử.

2. `mb-2`
- margin-bottom ở mức 2.
- Tạo khoảng cách phía dưới phần tử.

3. `ms-4`
- margin-start ở mức 4.
- Tạo khoảng cách bên trái trong LTR, hoặc bên phải trong RTL.

4. `px-4`
- padding trái và phải ở mức 4.
- Làm dày phần đệm ngang bên trong phần tử.

5. `py-2`
- padding trên và dưới ở mức 2.
- Làm dày phần đệm dọc bên trong phần tử.

Ví dụ thêm:
- `mb-auto`: margin-bottom tự động, thường dùng để đẩy phần tử xuống đáy trong layout flex.

### 3) Sự khác nhau giữa `.container`, `.container-fluid`, `.container-md`

- `.container`: container cố định theo breakpoint, có `max-width` thay đổi theo kích thước màn hình và được căn giữa.
- `.container-fluid`: luôn rộng 100% theo chiều ngang viewport ở mọi kích thước.
- `.container-md`: từ dưới `md` thì rộng 100%, từ `md` trở lên thì chuyển sang container có `max-width` cố định theo breakpoint.

Tóm tắt nhanh:
- `.container` = responsive cố định theo từng breakpoint.
- `.container-fluid` = full width mọi lúc.
- `.container-md` = full width trên mobile, boxed layout từ tablet trở lên.

---

# PHẦN C — PHÂN TÍCH (20 điểm)

## Câu C1 (10đ) — Tùy biến Bootstrap

### Yêu cầu: Đổi màu $primary từ xanh mặc định sang #E63946

**Quy trình:**

1. **Công cụ cần dùng:**
   - Node.js + npm (hoặc yarn)
   - Sass compiler (cài qua npm: `npm install sass`)
   - Text editor (VS Code)

2. **Các file cần modify:**
   - Tạo file `_custom-variables.scss` (tùy chỉnh biến)
   - Sửa file `style.scss` (import biến tùy chỉnh trước biến mặc định)
   - Biên dịch ra `style.css`

3. **Các bước cụ thể:**

```scss
// File: scss/_custom-variables.scss
$primary: #E63946;  // Đổi từ #0d6efd (xanh mặc định)

// File: scss/style.scss
@import '_custom-variables';     // Import tùy chỉnh TRƯỚC
@import 'bootstrap';              // Import Bootstrap
```

Rồi chạy lệnh:
```bash
sass scss/style.scss dist/style.css
```

### Tại sao KHÔNG nên override trực tiếp?

❌ **Sai - Override CSS trực tiếp:**
```css
.btn-primary { background: #E63946 !important; }
.badge-primary { background: #E63946 !important; }
.alert-primary { background: #E63946 !important; }
/* ... phải override hàng chục thành phần khác */
```

❌ Vấn đề:
- Phải override từng class riêng biệt (lặp lại, khó bảo trì)
- Sử dụng `!important` gây xung đột CSS
- Khi Bootstrap cập nhật, màu không được cập nhật
- Không giải quyết được gradient, hover states, disabled states của tất cả components

✅ **Đúng - Dùng SASS variables:**
```scss
$primary: #E63946;
@import 'bootstrap';  // Bootstrap tự động compile tất cả components với biến mới
```

✅ Lợi ích:
- Chỉ cần thay đổi 1 biến → tất cả components tự động đổi màu
- Không cần `!important`
- Bao gồm cả hover, focus, disabled, gradient states
- Dễ maintain, consistent trên toàn dự án
- Tuân theo DRY principle

---

## Câu C2 (10đ) — So sánh CSS thuần vs Bootstrap

### 1) Viết CSS thuần - Navbar Responsive + Product Card

**HTML:**
```html
<nav class="navbar">
    <div class="nav-brand">Logo</div>
    <button class="nav-toggle">☰</button>
    <ul class="nav-menu">
        <li><a href="#">Home</a></li>
        <li><a href="#">Product</a></li>
        <li><a href="#">Contact</a></li>
    </ul>
</nav>

<div class="product-card">
    <img src="product.jpg" alt="Product">
    <h3>Product Name</h3>
    <p class="price">$99.99</p>
    <button class="btn">Add to Cart</button>
</div>
```

**CSS (CSS thuần):**
```css
/* Navbar */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #2c3e50;
    position: sticky;
    top: 0;
    z-index: 1000;
}

.nav-brand {
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
}

.nav-toggle {
    display: none;
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-menu a {
    color: white;
    text-decoration: none;
    transition: color 0.3s;
}

.nav-menu a:hover {
    color: #3498db;
}

/* Mobile */
@media (max-width: 768px) {
    .nav-toggle { display: block; }
    .nav-menu {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        flex-direction: column;
        background-color: #2c3e50;
        padding: 1rem;
        gap: 1rem;
    }
    .nav-menu.active { display: flex; }
}

/* Product Card */
.product-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: transform 0.3s, box-shadow 0.3s;
    max-width: 300px;
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.product-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.product-card h3 {
    padding: 1rem;
    margin: 0;
    font-size: 1.25rem;
}

.product-card .price {
    padding: 0 1rem;
    color: #e74c3c;
    font-weight: bold;
    font-size: 1.5rem;
    margin: 0.5rem 0;
}

.product-card .btn {
    width: 100%;
    padding: 0.75rem;
    background-color: #3498db;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
}

.product-card .btn:hover {
    background-color: #2980b9;
}
```

**Tổng cộng: ~100 dòng CSS**

---

### 2) Bootstrap Version

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div class="container">
        <a class="navbar-brand" href="#">Logo</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item"><a class="nav-link" href="#">Home</a></li>
                <li class="nav-item"><a class="nav-link" href="#">Product</a></li>
                <li class="nav-item"><a class="nav-link" href="#">Contact</a></li>
            </ul>
        </div>
    </div>
</nav>

<div class="card" style="max-width: 300px;">
    <img src="product.jpg" class="card-img-top" alt="Product">
    <div class="card-body">
        <h5 class="card-title">Product Name</h5>
        <p class="card-text text-danger fw-bold">$99.99</p>
        <button class="btn btn-primary w-100">Add to Cart</button>
    </div>
</div>
```

**Tổng cộng: ~0 dòng CSS (100% Bootstrap classes)**

---

### 3) Bảng so sánh

| Tiêu chí | CSS thuần | Bootstrap |
|---|---|---|
| **Số dòng CSS** | ~100 | 0 |
| **Thời gian phát triển** | 2-3 giờ | 15-30 phút |
| **Responsive** | Phải code media queries | Sẵn có |
| **Tùy biến** | Rất cao (100%) | Trung bình (có biến SASS) |
| **Kích thước file** | Nhỏ (~3KB) | Lớn (~150KB minified) |
| **Consistency** | Tùy developer | Đồng nhất trên toàn dự án |
| **Browser support** | Cần test kỹ | Hỗ trợ rộng |
| **Learning curve** | Vừa phải | Dễ (nhưng cần học Bootstrap) |
| **Bảo trì** | Khó (khi codebase lớn) | Dễ (sử dụng lại classes) |

---

### 4) Khi nào NÊN dùng Bootstrap?

✅ **Nên dùng Bootstrap khi:**
1. **Dự án web thương mại/landing page** — cần giao diện chuyên nghiệp nhanh
2. **Team nhỏ/startup** — tiết kiệm thời gian phát triển
3. **Responsive bắt buộc** — Bootstrap đã test trên mọi device
4. **Không có design riêng** — dùng design system mặc định của Bootstrap
5. **Cần nhiều components** — navbar, modal, dropdown, accordion, etc. có sẵn
6. **Maintenance dài hạn** — team mới join dễ hiểu Bootstrap classes
7. **Typography chuẩn** — font-sizes, line-heights đã cân bằng

---

### 5) Khi nào KHÔNG NÊN dùng Bootstrap?

❌ **Không nên dùng Bootstrap khi:**
1. **Có design custom riêng** — Bootstrap utilities sẽ bị override quá nhiều → vô ích
2. **Cần tối ưu kích thước file** — CSS 150KB quá lớn cho mobile
3. **Performance critical** — overhead của Bootstrap sẽ ảnh hưởng
4. **UI rất đơn giản** — navbar + 1-2 pages → CSS thuần nhanh hơn
5. **Cần styling độc quyền** — viết CSS custom tốt hơn
6. **App web nặng (SPA)** — dùng Tailwind CSS hoặc styled-components tốt hơn
7. **Học CSS từ đầu** — nên học CSS thuần trước, rồi mới dùng framework

---

### 6) Kết luận

- **Bootstrap tốt cho:**快速prototyping, landing pages, admin dashboards, MVP
- **CSS thuần tốt cho:** tối ưu hiệu năng, design độc quyền, dự án nhỏ
- **Ngon lành nhất:** dùng CSS thuần cho base, thêm Bootstrap utilities khi cần

---

# TRACK B — TAILWINDCSS

## PHẦN A — ĐỌC HIỂU (20 điểm)

### Câu A1 (10đ) — Utility Classes

Giải thích ý nghĩa từng class Tailwind trong đoạn HTML:

```html
<div class="flex items-center justify-between p-4 bg-white shadow-md rounded-lg 
            hover:shadow-xl transition-shadow duration-300">
    <img class="w-16 h-16 rounded-full object-cover" src="avatar.jpg" alt="User">
    <div class="ml-4 flex-1">
        <h3 class="text-lg font-semibold text-gray-800 truncate">Nguyễn Văn A</h3>
        <p class="text-sm text-gray-500">Frontend Developer</p>
    </div>
    <button class="px-4 py-2 bg-blue-500 text-white rounded-md 
                   hover:bg-blue-600 focus:ring-2 focus:ring-blue-300">
        Follow
    </button>
</div>
```

**Danh sách Utility Classes:**

| Class | CSS tương đương | Ý nghĩa |
|---|---|---|
| `flex` | `display: flex;` | Sử dụng flexbox layout |
| `items-center` | `align-items: center;` | Căn giữa các item theo trục dọc |
| `justify-between` | `justify-content: space-between;` | Phân bố item: đầu, cuối, cách đều |
| `p-4` | `padding: 1rem;` | Padding 4 phía = 16px |
| `bg-white` | `background-color: white;` | Nền màu trắng |
| `shadow-md` | `box-shadow: 0 4px 6px rgba(0,0,0,0.1);` | Bóng đổ vừa phải |
| `hover:shadow-xl` | `&:hover { box-shadow: 0 20px 25px rgba(0,0,0,0.15); }` | Bóng đổ lớn khi hover |
| `rounded-lg` | `border-radius: 0.5rem;` | Bo góc 8px |
| `transition-shadow` | `transition-property: box-shadow;` | Hiệu ứng chuyển động cho shadow |
| `duration-300` | `transition-duration: 300ms;` | Thời gian chuyển động 300ms |
| `w-16` | `width: 4rem;` | Chiều rộng 64px (16 × 4px) |
| `h-16` | `height: 4rem;` | Chiều cao 64px |
| `rounded-full` | `border-radius: 9999px;` | Bo tròn 100% (tạo hình tròn) |
| `object-cover` | `object-fit: cover;` | Hình ảnh lấp đầy container, có crop |
| `ml-4` | `margin-left: 1rem;` | Margin trái 16px |
| `flex-1` | `flex: 1 1 0%;` | Chiếm phần còn lại của flex container |
| `text-lg` | `font-size: 1.125rem;` | Kích thước chữ lớn (18px) |
| `font-semibold` | `font-weight: 600;` | Độ dày chữ vừa đậm |
| `text-gray-800` | `color: rgb(31, 41, 55);` | Màu chữ xám tối |
| `truncate` | `overflow: hidden; text-overflow: ellipsis; white-space: nowrap;` | Cắt text, thêm `...` nếu quá dài |
| `text-sm` | `font-size: 0.875rem;` | Kích thước chữ nhỏ (14px) |
| `text-gray-500` | `color: rgb(107, 114, 128);` | Màu chữ xám nhạt |
| `px-4` | `padding-left: 1rem; padding-right: 1rem;` | Padding ngang 16px |
| `py-2` | `padding-top: 0.5rem; padding-bottom: 0.5rem;` | Padding dọc 8px |
| `bg-blue-500` | `background-color: rgb(59, 130, 246);` | Nền màu xanh |
| `text-white` | `color: white;` | Màu chữ trắng |
| `rounded-md` | `border-radius: 0.375rem;` | Bo góc 6px |
| `hover:bg-blue-600` | `&:hover { background-color: rgb(37, 99, 235); }` | Màu xanh đậm hơn khi hover |
| `focus:ring-2` | `&:focus { outline: none; box-shadow: 0 0 0 2px rgba(...); }` | Vòng focus khi được focus |
| `focus:ring-blue-300` | Màu vòng focus là xanh nhạt | Màu ring/focus indicator |

---

### Câu A2 (10đ) — Responsive & States

#### 1) Responsive Prefixes: `md:`, `lg:`, `xl:`

**Breakpoints mặc định của Tailwind:**

| Prefix | Breakpoint | Màn hình |
|---|---|---|
| (không) | `< 640px` | Mobile (mặc định) |
| `sm:` | `≥ 640px` | Small (điện thoại lớn) |
| `md:` | `≥ 768px` | Medium (tablet dọc) |
| `lg:` | `≥ 1024px` | Large (tablet ngang/laptop nhỏ) |
| `xl:` | `≥ 1280px` | Extra Large (laptop) |
| `2xl:` | `≥ 1536px` | 2x Extra Large (desktop) |

**Ví dụ: `md:grid-cols-2 lg:grid-cols-4`**

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
    <div>Item 4</div>
</div>
```

**Giải thích:**
- `grid-cols-1`: **Mặc định (< 768px)** → 1 cột, item xếp dọc (mobile)
- `md:grid-cols-2`: **Từ 768px trở lên** → 2 cột (tablet)
- `lg:grid-cols-4`: **Từ 1024px trở lên** → 4 cột (desktop)

**Kết quả layout:**
```
Mobile (< 768px):        Tablet (768-1023px):     Desktop (≥ 1024px):
┌──────────┐              ┌────────┬────────┐     ┌──┬──┬──┬──┐
│ Item 1   │              │ Item 1 │ Item 2 │     │I1│I2│I3│I4│
├──────────┤              ├────────┼────────┤     └──┴──┴──┴──┘
│ Item 2   │              │ Item 3 │ Item 4 │
├──────────┤              └────────┴────────┘
│ Item 3   │
├──────────┤
│ Item 4   │
└──────────┘
```

---

#### 2) State Modifiers: `hover:`, `focus:`, `active:`, `group-hover:`

**Ví dụ thực tế:**

```html
<!-- 1. hover: - Khi di chuột vào -->
<button class="bg-blue-500 hover:bg-blue-600 hover:scale-105 transition">
    Hover me
</button>

<!-- 2. focus: - Khi được focus (click/tab vào) -->
<input class="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300">

<!-- 3. active: - Khi click/giữ (button đang được press) -->
<button class="bg-blue-500 active:bg-blue-700 active:scale-95">
    Press me
</button>

<!-- 4. group-hover: - Khi hover group parent -->
<div class="group border p-4 hover:bg-gray-100">
    <h3 class="text-gray-800 group-hover:text-blue-500">Title</h3>
    <p class="text-gray-500 group-hover:text-gray-700">Description</p>
    <a href="#" class="text-blue-500 opacity-0 group-hover:opacity-100">
        Learn more
    </a>
</div>
```

**Giải thích từng state:**

| State | CSS tương đương | Khi nào được trigger | Ví dụ |
|---|---|---|---|
| `hover:` | `:hover` | Di chuột vào element | `hover:bg-blue-600` → đổi màu khi hover |
| `focus:` | `:focus` | Click vào input hoặc Tab | `focus:ring-2 focus:ring-blue-300` → vòng xung quanh khi focus |
| `active:` | `:active` | Đang click/giữ chuột | `active:scale-95` → nhỏ lại khi click |
| `group-hover:` | `.group:hover .element` | Hover vào parent (`.group`) | `group-hover:text-blue-500` → đổi màu khi hover parent |
| `disabled:` | `:disabled` | Button/input bị disabled | `disabled:opacity-50` → mờ lại khi disabled |
| `focus-within:` | `:focus-within` | Input bên trong được focus | `focus-within:ring-2` → vòng xung quanh form khi input focus |

---

#### 3) Ẩn trên mobile, hiện dạng flex trên tablet trở lên

**Yêu cầu: Tương đương `d-none d-md-flex` của Bootstrap**

**Bootstrap:**
```html
<div class="d-none d-md-flex">
    <!-- Ẩn trên mobile, hiện flex từ md trở lên -->
</div>
```

**Tailwind:**
```html
<div class="hidden md:flex">
    <!-- Ẩn trên mobile, hiện flex từ md (768px) trở lên -->
</div>
```

**Giải thích:**
- `hidden` → `display: none` (ẩn trên mọi breakpoint mặc định, tức là mobile)
- `md:flex` → từ `768px` trở lên: `display: flex` (hiện dạng flex)

**Ví dụ sử dụng:**

```html
<!-- Desktop menu ẩn trên mobile -->
<nav class="hidden md:flex gap-4">
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Contact</a>
</nav>

<!-- Mobile hamburger menu ẩn trên tablet+ -->
<button class="md:hidden">
    <i class="fas fa-bars"></i>
</button>

<!-- Sidebar dạng block trên desktop, ẩn trên mobile -->
<aside class="hidden lg:block w-64">
    <!-- Sidebar content -->
</aside>
```

**Các cách khác tương tự:**

| Nhu cầu | Bootstrap | Tailwind |
|---|---|---|
| Ẩn mobile, hiện flex từ md | `d-none d-md-flex` | `hidden md:flex` |
| Ẩn mobile, hiện block từ lg | `d-none d-lg-block` | `hidden lg:block` |
| Hiện mobile, ẩn từ md | `d-md-none` | `md:hidden` |
| Grid mobile 1 col, desktop 3 col | `grid-cols-1 lg:grid-cols-3` | `grid-cols-1 lg:grid-cols-3` |
| Text size nhỏ mobile, lớn desktop | `text-sm lg:text-lg` | `text-sm lg:text-lg` |

**Tóm tắt Tailwind responsive:**
- Mobile-first: mặc định là mobile (< 640px)
- Thêm prefix `md:`, `lg:`, `xl:` để đặt quy tắc cho breakpoint lớn hơn
- Không cần viết media query, Tailwind tự generate

---

## PHẦN C — PHÂN TÍCH (20 điểm)

### Câu C1 (10đ) — Tailwind vs CSS thuần

**Lấy ví dụ từ PBT_04: Product Card (CSS thuần)**

Giả sử từ PBT_04, bạn viết CSS thuần cho product card:

**HTML (CSS thuần):**
```html
<div class="product-card">
    <img src="product.jpg" alt="Product">
    <div class="product-info">
        <h3>Product Name</h3>
        <p class="price">$99.99</p>
        <button class="btn-primary">Thêm vào giỏ</button>
    </div>
</div>
```

**CSS (CSS thuần):**
```css
.product-card {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s;
    max-width: 250px;
}

.product-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.15);
}

.product-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.product-info {
    padding: 16px;
}

.product-card h3 {
    font-size: 1.1rem;
    margin: 0 0 8px 0;
    color: #333;
    font-weight: 600;
}

.product-card .price {
    font-size: 1.25rem;
    color: #e74c3c;
    font-weight: bold;
    margin: 8px 0 12px 0;
}

.btn-primary {
    width: 100%;
    padding: 10px 16px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.3s;
}

.btn-primary:hover {
    background-color: #2980b9;
}

.btn-primary:active {
    background-color: #1c5aa0;
}
```

**File size: CSS file = ~1.2KB, HTML file = ~0.3KB**

---

**HTML (Tailwind):**
```html
<div class="bg-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-2 transition-all overflow-hidden max-w-xs">
    <img src="product.jpg" alt="Product" class="w-full h-52 object-cover">
    <div class="p-4">
        <h3 class="text-lg font-semibold mb-2 text-gray-800">Product Name</h3>
        <p class="text-xl font-bold text-red-600 mb-3">$99.99</p>
        <button class="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 active:scale-95 transition">
            Thêm vào giỏ
        </button>
    </div>
</div>
```

**File size: HTML file = ~0.45KB (classes dài nhưng gzip nén tốt)**

---

### So sánh 3 tiêu chí:

| Tiêu chí | CSS thuần | Tailwind |
|---|---|---|
| **HTML file size** | ~0.3KB | ~0.45KB (+50%) |
| **CSS file size** | ~1.2KB | 0 (dùng CDN hoặc đã được bundle) |
| **Tổng size ban đầu** | 1.5KB | 0.45KB (với Tailwind CDN, CSS được cache) |
| **Maintainability** | Phải sửa 2 file (HTML + CSS); dễ quên style | Chỉ sửa HTML; styles ngay trong class |
| **Dễ đọc** | Tương đối dễ (cần biết CSS) | Khó đọc lúc đầu (quá nhiều classes) |
| **Dễ sửa** | Dễ sửa CSS riêng | Dễ sửa (không cần mở file CSS) |
| **Reusability (@apply)** | CSS có thể tái sử dụng qua class | Dùng `@apply` trong CSS tùy chỉnh hoặc component template |

**Ví dụ @apply (Tailwind):**
```css
/* Tạo utility custom */
@layer components {
    .btn-primary {
        @apply px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 transition;
    }
}
```

Rồi dùng: `<button class="btn-primary">Nút</button>`

---

### Kết luận Câu C1:

**HTML file size:** Tailwind HTML dài hơn (~50%) do class attributes dài, nhưng CSS file bị loại bỏ hoàn toàn  
**Maintainability:** Tailwind tốt hơn vì chỉ sửa 1 file HTML, không cần tìm CSS  
**Reusability:** CSS thuần dùng `.class-name`, Tailwind dùng `@apply` hoặc component templates

---

### Câu C2 (10đ) — Performance

#### 1) Tại sao Tailwind CSS file NHỎ HƠN Bootstrap CSS?

**Bootstrap CSS minified: ~150KB**  
**Tailwind CSS (với PurgeCSS): ~5-10KB**

**Lý do:**

**Bootstrap (Pre-generated CSS):**
- Bootstrap là **pre-generated** framework
- Tất cả CSS rules được viết sẵn cho tất cả components
- Navbar, buttons, cards, tables, forms, alerts, modals, etc. — tất cả đều có CSS
- File CSS chứa styles cho những components bạn **có thể không dùng**
- Phải include file 150KB ngay cả khi chỉ dùng 20% features

```
Bootstrap CSS = Navbar + Buttons + Cards + Tables + Forms + Alerts + 
                Modals + Dropdowns + Tooltips + Popovers + Spinners + 
                Progress bars + Pagination + Breadcrumbs + ... (tất cả)
```

**Tailwind CSS (On-demand generation):**
- Tailwind là **utility-first**, generate CSS **khi nào cần**
- Chỉ generate CSS cho các classes bạn **thực sự dùng** trong HTML
- Dùng PurgeCSS/JIT: scan tất cả HTML files → tìm classes sử dụng → chỉ generate CSS cho những classes đó
- Loại bỏ CSS **không dùng đến**

```
Tailwind CSS = Chỉ CSS cho: flex, p-4, text-lg, bg-blue-500, ... 
               (những gì bạn dùng trong HTML)
```

**Ví dụ cụ thể:**
- Nếu dùng Bootstrap nhưng không dùng modal → CSS modal vẫn được include (~2KB lãng phí)
- Nếu dùng Tailwind mà không dùng modal → CSS modal không được generate (~0KB)

---

#### 2) Giải thích Tailwind PurgeCSS / JIT (Just-In-Time)

**PurgeCSS (Tailwind v2 và trước):**
```bash
# File: tailwind.config.js
module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.jsx'
  ],
  // ...
}
```

**Quy trình PurgeCSS:**
1. Scan tất cả files trong `./src/**/*.html` và `./src/**/*.js`
2. Tìm tất cả strings giống Tailwind class names (regex pattern matching)
3. Ví dụ: tìm `flex`, `p-4`, `bg-blue-500`, `hover:scale-105`, etc.
4. Build CSS chỉ bao gồm những classes tìm được
5. Loại bỏ CSS cho tất cả classes **không được sử dụng**

**JIT Mode (Tailwind v3+):**
- JIT = Just-In-Time compilation
- Thay vì generate tất cả possibilities, chỉ compile CSS **khi bạn viết class**
- Development mode: nhanh hơn, không cần rebuild
- Production mode: tự động purge khi build

**Ví dụ loại bỏ:**
```html
<!-- Sử dụng -->
<div class="p-4 flex bg-blue-500">...</div>

<!-- Tailwind sẽ generate CSS cho: p-4, flex, bg-blue-500 -->
```

```html
<!-- KHÔNG sử dụng -->
<div class="p-8 grid bg-red-500">...</div>

<!-- Nếu chỉ dùng p-4 và bg-blue-500 ở nơi khác, 
     p-8, grid, bg-red-500 sẽ bị purge/xóa -->
```

**Kết quả:**
- Bootstrap: 150KB → Tailwind: 5-10KB (giảm 93-95%)

---

#### 3) Khi nào KHÔNG NÊN dùng TailwindCSS?

**Tình huống 1: Dự án cần design custom rất khác Bootstrap/Tailwind**

❌ **Vấn đề:**
- Design riêng không khớp với spacing scale của Tailwind (16px, 32px, ...)
- Cần khoảng cách như 13px, 27px, 45px (không có trong Tailwind mặc định)
- Màu sắc custom: #A7B5C4, #D9E5F2 (không trong palette mặc định)
- Animations riêng: morph, flip, shatter (Tailwind chỉ có basic transitions)
- Animation duration: 250ms, 450ms (Tailwind mặc định: 150ms, 300ms, 500ms)

```html
<!-- Tailwind mặc định không có -->
<div class="h-[13px] bg-[#A7B5C4] duration-[250ms]">...</div>
<!-- Phải dùng arbitrary values, vô ích -->
```

✅ **Nên dùng:** CSS-in-JS (Styled Components, Emotion), SASS thuần

---

**Tình huống 2: App là Single Page Application (SPA) nặng với webpack bundling**

❌ **Vấn đề:**
- SPA như React, Vue, Angular có **custom build process** (webpack, Vite, etc.)
- Tailwind CDN (script tag) chạy ở runtime → overhead
- Tailwind JIT cần file watch → phức tạp khi integrate với webpack
- HTML classes được generate động (không static trong file) → PurgeCSS không tìm thấy
- Tailwind CSS file **vẫn được include dù không dùng**

```javascript
// React component với classes dynamic
const [color, setColor] = useState('blue');

export default function Button() {
  return <button className={`bg-${color}-500`}>Click</button>;
}
// PurgeCSS không tìm thấy `bg-${color}-500` vì nó động
// Phải dùng arbitrary values: `bg-[#...]` → không được purge
```

✅ **Nên dùng:** 
- Styled Components / Emotion (CSS-in-JS)
- PostCSS + SASS thuần + custom utilities
- Tailwind nhưng cấu hình properly với webpack

---

### Tóm tắt:

| Khi nào | Dùng gì |
|---|---|
| **Landing page, dashboard, MVP nhanh** | ✅ Tailwind |
| **Design custom hoàn toàn khác** | ❌ Tailwind → ✅ SASS/CSS-in-JS |
| **SPA với webpack + dynamic classes** | ⚠️ Tailwind (phức tạp) → ✅ CSS-in-JS |
| **Project team lớn, cần consistency** | ✅ Tailwind (dễ maintain) |
| **Performance critical, file size quan trọng** | ✅ Tailwind (5-10KB vs Bootstrap 150KB) |
| **Học CSS từ đầu** | ❌ Tailwind → ✅ CSS thuần |