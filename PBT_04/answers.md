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
