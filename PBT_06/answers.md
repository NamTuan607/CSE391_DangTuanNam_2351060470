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