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