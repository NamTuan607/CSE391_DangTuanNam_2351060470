# PHẦN A — KIỂM TRA ĐỌC HIỂU

## Câu A1 (10đ) — 5 Loại Positioning

### Bảng Positioning

| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
|----------|--------------------------|------------------|------------------|----------|
| **static** | Có | Không áp dụng (mặc định) | Có | Vị trí mặc định của tất cả elements; positioning không hoạt động |
| **relative** | Có | Tham chiếu chính nó (offset từ vị trí bình thường) | Có | Điều chỉnh vị trí nhỏ mà không tách khỏi flow |
| **absolute** | Không | Nearest positioned ancestor (hoặc body) | Không (nếu ancestor fixed); Có (nếu ancestor relative/absolute) | Overlays, modals, tooltips, positioned above/outside flow |
| **fixed** | Không | Viewport (cửa sổ trình duyệt) | Không | Headers, footers, sticky navigation, floating buttons |
| **sticky** | Có | Kết hợp: relative cho đến khi scroll đạt trigger point, sau đó fixed | Có (nhưng có thể "dính" vào viewport khi scroll) | Sticky headers, section dividers, table headers |

### Câu hỏi thêm: Absolute tham chiếu khi nào?

**Absolute tham chiếu Parent:**
- Khi **parent element có position property khác static** (relative, absolute, fixed, sticky)
- Absolute sẽ tìm ancestor gần nhất có positioning và tham chiếu vị trí đó

**Absolute tham chiếu Body:**
- Khi **không có ancestor nào có position property** (hoặc tất cả đều là static, là giá trị mặc định)
- Lúc đó absolute sẽ tham chiếu body element (hoặc html element)

**Khái niệm "Nearest Positioned Ancestor":**
- Là ancestor element gần nhất mà có `position` property khác `static`
- absolute element sẽ định vị dựa trên ancestor này
- Tìm từ parent trực tiếp, sau đó lên các level cao hơn cho đến khi tìm thấy

---

## Câu A2 (10đ) — Flexbox vs Grid

### Trường hợp 1: Flex với flex: 1
```css
.container { display: flex; }
.item { flex: 1; }
/* 4 items → Bố cục */
```

**Dự đoán:**
- Mỗi item nhận `flex: 1` (flex-grow: 1, flex-shrink: 1, flex-basis: 0%)
- 4 items chia đều chiều rộng container → **Mỗi item = 25% chiều rộng**
- **Bố cục: 1 hàng, 4 cột (items xếp ngang)**

```
┌─────────────────────────────────────┐
│   Item1   │   Item2   │   Item3   │   Item4   │
└─────────────────────────────────────┘
```

---

### Trường hợp 2: Flex với wrap và width 45%
```css
.container { display: flex; flex-wrap: wrap; }
.item { width: 45%; margin: 2.5%; }
/* 6 items → Bố cục */
```

**Tính toán:**
- Mỗi item: 45% + 2.5% (left) + 2.5% (right) = **50% chiều rộng**
- 1 hàng chỉ chứa được: 100% ÷ 50% = **2 items**
- 6 items ÷ 2 = **3 hàng**

**Bố cục: 3 hàng, 2 cột**

```
┌─────────────────────────────────┐
│  Item1  │  Item2  │
├─────────────────────────────────┤
│  Item3  │  Item4  │
├─────────────────────────────────┤
│  Item5  │  Item6  │
└─────────────────────────────────┘
```

---

### Trường hợp 3: Flex với justify-content: space-between & align-items: center
```css
.container { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
}
/* 3 items → Bố cục */
```

**Dự đoán:**
- `justify-content: space-between` → items cách đều nhau theo trục chính (horizontal)
- `align-items: center` → items căn giữa theo trục phụ (vertical)
- 3 items: item đầu, item cuối ở 2 đầu container; item giữa ở giữa

**Bố cục: 1 hàng, 3 cột (phân bố đều)**

```
┌──────────────────────────────────┐
│ Item1                Item2  Item3 │
└──────────────────────────────────┘
```

---

### Trường hợp 4: Grid với 3 cột cụ thể
```css
.container { 
  display: grid; 
  grid-template-columns: 200px 1fr 200px; 
  gap: 20px; 
}
/* 3 items → Bố cục */
```

**Dự đoán:**
- 3 cột: 200px + 1fr + 200px
- Cột 1 & 3: cố định 200px
- Cột 2: chiếm phần còn lại (1fr)
- 3 items vừa đúng 3 cột → **1 hàng, 3 cột**

```
┌──────────────────────────────────────────────┐
│  200px  │       1fr       │      200px       │
├─────────┼─────────────────┼──────────────────┤
│ Item1   │     Item2       │      Item3       │
└─────────┴─────────────────┴──────────────────┘
```

---

### Trường hợp 5: Grid với repeat(3, 1fr) & 7 items
```css
.container { 
  display: grid; 
  grid-template-columns: repeat(3, 1fr); 
  gap: 10px; 
}
/* 7 items → Bố cục */
```

**Tính toán:**
- 3 cột bằng nhau (repeat(3, 1fr))
- 7 items ÷ 3 cột = 2 hàng đầy đủ + 1 item lẻ
- Item cuối (Item7) ở hàng 3, cột 1

**Bố cục: 3 hàng, 3 cột (hàng 3 chỉ có 1 item ở cột 1)**

```
┌──────────────┬──────────────┬──────────────┐
│   Item1      │   Item2      │   Item3      │
├──────────────┼──────────────┼──────────────┤
│   Item4      │   Item5      │   Item6      │
├──────────────┼──────────────┼──────────────┤
│   Item7      │              │              │
└──────────────┴──────────────┴──────────────┘
```

---

## Tóm tắt

- **Positioning**: Static (mặc định), Relative (điều chỉnh nhỏ), Absolute (xóa khỏi flow, tham chiếu nearest positioned ancestor), Fixed (tham chiếu viewport), Sticky (kết hợp cả hai)
- **Flexbox**: Tốt cho layout 1 chiều (hàng hoặc cột), dễ sử dụng với items động
- **Grid**: Tốt cho layout 2 chiều (hàng + cột), kiểm soát chặt chẽ kích thước ô

---

## PHẦN C — SUY LUẬN (20 điểm)

### Câu C1 (10đ) — Flexbox vs Grid: Khi nào dùng gì?

1) Navigation bar ngang (logo + menu + buttons)
- Chọn: **Flexbox**. Lý do: thanh nav là layout 1 chiều (ngang). Flex giúp căn giữa dọc (`align-items: center`) và phân phối không gian (`justify-content`) dễ dàng, đồng thời phần tử trái/giữa/phải có thể đặt bằng `flex`/`margin-left: auto`.

2) Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước)
- Chọn: **CSS Grid** (hoặc Grid kết hợp `auto-fill/auto-fit`). Lý do: Grid cung cấp cách xác định chính xác số cột bằng `repeat(3, 1fr)` và xử lý hàng/ô đều nhau dễ dàng; nếu cần responsive, dùng `repeat(auto-fill, minmax(...))`.

3) Layout blog: main content + sidebar
- Chọn: **Grid** cho layout chính (2 cột) hoặc **kết hợp Grid + Flexbox**. Lý do: Grid cho phép xác định rõ tỉ lệ 2 cột (`200px 1fr`), còn Flexbox tốt để căn chỉnh nội dung bên trong từng cột.

4) Footer với 4 cột thông tin
- Chọn: **Grid**. Lý do: footer là layout hàng 1 với 4 cột cố định/equal — Grid dễ tạo 4 cột đều nhau và xử lý wrap/responsive.

5) Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy)
- Chọn: **Flexbox (column)**. Lý do: bên trong card là 1 chiều theo hàng dọc; dùng `display:flex; flex-direction:column;` và `margin-top:auto` cho nút để đẩy nút xuống đáy card.

---

### Câu C2 (10đ) — Debug Flexbox

Lỗi 1: Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống
- Nguyên nhân: `.card` chưa là flex container theo chiều dọc, nên nội dung có chiều cao khác nhau; nút không được đẩy xuống đáy. Ngoài ra `.card-container` cần `align-items: stretch` để đồng bộ chiều cao các card.
- Sửa (thêm/đổi CSS):
```css
.card-container { display: flex; flex-wrap: wrap; align-items: stretch; }
.card {
  width: 30%;
  margin: 1.5%;
  display: flex;           /* make card a flex column */
  flex-direction: column;  /* stack content vertically */
}
.card img { width: 100%; display:block }
.card .btn { margin-top: auto; }
```
- Hướng kiểm tra: trước khi sửa, cao card khác nhau; sau khi sửa, tất cả card cùng chiều cao trong hàng, nút luôn ở đáy.

Lỗi 2: Muốn items nằm giữa cả ngang lẫn dọc trong container 100vh, nhưng item vẫn dính góc trái trên
- Nguyên nhân: `.hero` chỉ `display:flex` nhưng thiếu `justify-content` và `align-items`. Mặc định flex items nằm ở đầu trục (flex-start).
- Sửa:
```css
.hero {
  height: 100vh;
  display: flex;
  justify-content: center; /* center horizontally */
  align-items: center;     /* center vertically */
}
.hero-content { text-align: center }
```
- Hướng kiểm tra: trước khi sửa, content dính góc; sau khi sửa content ở giữa 100vh.

Lỗi 3: Sidebar bị co lại khi content quá dài
- Nguyên nhân: flex items mặc định có thể shrink; `.sidebar` chỉ có `width:250px` nhưng có thể bị co (shrink) khi container nhỏ hoặc khi nội dung ép; cần đảm bảo không cho shrink hoặc đặt `flex` cố định.
- Sửa:
```css
.layout { display: flex; align-items: stretch; }
.sidebar { flex: 0 0 250px; /* không shrink, không grow, width = 250px */ }
.content { flex: 1; min-width: 0; /* allow content to shrink properly */ }
```
- Ghi chú: `min-width:0` trên `.content` quan trọng để cho phép phần nội dung chính bị bó nhỏ (và xuất hiện scrollbar) thay vì ép sidebar.

Ảnh chụp (yêu cầu): tôi không thể trực tiếp chụp ảnh màn hình trong môi trường này. Để tạo screenshot trước/sau, bạn có thể:
- Mở trang demo trong trình duyệt (ví dụ mở file HTML tương ứng), chụp màn hình trước khi áp dụng CSS sửa lỗi.
- Áp dụng CSS sửa lỗi (hoặc mở file đã sửa), reload trang và chụp màn hình sau.
- Trên Windows: `PrtSc` hoặc `Win+Shift+S`; trên macOS: `Cmd+Shift+4`.

---

Hoàn tất PHẦN C. Nếu bạn muốn, mình sẽ:
- commit & push phần này vào repo, hoặc
- tạo các file demo nhỏ để bạn mở kiểm thử và mình sẽ chụp screenshot (nếu bạn cho phép chạy local preview). 
