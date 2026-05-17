
Phần A - Kiểm tra đọc hiểu 

câu A1
    - inline CSS (tránh dùng)
ví dụ: <h1 style="color: red; font-size: 24px;">Tiêu đề</h1>

    - internal CSS (chấp nhận đượpc khi prototype)
ví dụ: <head>
            <style>
                 h1 { color: red; font-size: 24px; }
             </style>
        </head>

    - External CSS (file riêng)
ví dụ:  <head>
            <link rel="stylesheet" href="styles.css">
        </head>
câu hỏi thêm: 
    CSS hoạt động theo cơ chế gọi là Cascade (xếp tầng).
Trình duyệt sẽ xét:

    Độ ưu tiên (specificity)
    Vị trí khai báo
    Thứ tự xuất hiện

Inline CSS gắn trực tiếp vào element nên có độ ưu tiên cao nhất trong 3 cách cơ bản.
thứ tự ưu tiên (độ mạnh) là: Inline CSS > Internal CSS > External CSS

câu A2
1. h1 -> ShopTLU
2. .price -> 25.990.000đ
3. #app header -> ShopTLU, Home, Products, About
4. nav a:first-child -> Home
5. .product.featured h2 -> Macbook Pro
6. article > p -> tất cả thẻ p của article
7. a[href="/"] -> chọn thẻ a có [href="/"]
8. .top-bar.dark h1 -> ShopTLU

câu A3
/* Trường hợp 1: content-box (mặc định) */
.box-1 {
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
→ Chiều rộng hiển thị = 450px
  (Tính: content(400px) + padding(20px*2) + border(5px*2) = 400 + 40 + 10 = 450px)
→ Không gian chiếm trên trang = 470px
  (Tính: display width(450px) + margin(10px*2) = 450 + 20 = 470px)

/* Trường hợp 2: border-box */
.box-2 {
    box-sizing: border-box;
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
→ Chiều rộng hiển thị = 400px
  (width: 400px đã bao gồm cả padding + border)
→ Kích thước content thực tế = 350px
  (Tính: 400 - padding(20px*2) - border(5px*2) = 400 - 40 - 10 = 350px)
→ Không gian chiếm trên trang = 420px
  (Tính: display width(400px) + margin(10px*2) = 400 + 20 = 420px)

/* Trường hợp 3: Margin collapse */
.box-a { margin-bottom: 25px; }
.box-b { margin-top: 40px; }
→ Khoảng cách giữa box-a và box-b = 40px
→ Giải thích tại sao KHÔNG PHẢI 65px:
  Khi hai element block theo chiều dọc, margin của chúng sẽ bị "collapse" (sụp)
  Thay vì cộng lại (25 + 40 = 65px), trình duyệt sẽ lấy margin LỚN NHẤT (40px)
  Đây là hành vi mặc định của Box Model trong CSS - gọi là "Margin Collapsing"

Nâng cao: Nếu .box-a có margin-bottom: -10px và .box-b có margin-top: 40px
→ Khoảng cách = 30px
  (Khi có margin âm, các margin sẽ cộng lại: 40px + (-10px) = 30px)

câu A4
Specificity score (a, b, c) cho mỗi rule:

p { color: black; }                    /* Rule A */
→ Specificity: (0, 0, 1)
  (0 IDs + 0 Classes + 1 Element)

.price { color: blue; }               /* Rule B */
→ Specificity: (0, 1, 0)
  (0 IDs + 1 Class + 0 Elements)

#main-price { color: red; }           /* Rule C */
→ Specificity: (1, 0, 0)
  (1 ID + 0 Classes + 0 Elements)

p.price { color: green; }             /* Rule D */
→ Specificity: (0, 1, 1)
  (0 IDs + 1 Class + 1 Element)

So sánh độ ưu tiên: (0, 0, 1) < (0, 1, 0) < (0, 1, 1) < (1, 0, 0)

→ Element sẽ có màu: RED
  Giải thích: Rule C có specificity cao nhất (1, 0, 0), vì nó dùng ID selector
  Thứ tự ưu tiên: ID > Class > Element

Nếu thêm inline style: <p class="price" id="main-price" style="color: orange;">
→ Element có màu: ORANGE
  Giải thích: Inline style có độ ưu tiên cao nhất trong các CSS rules
  Thứ tự ưu tiên: Inline Style > ID > Class > Element

Nếu Rule A thêm !important:
p { color: black !important; }
→ Element có màu: BLACK
  Giải thích: !important ghi đè tất cả các rules khác (trừ inline !important)
  !important là lựa chọn cuối cùng, nó vô hiệu hóa cascade bình thường
  Thứ tự ưu tiên: Inline !important > !important > Inline > ID > Class > Element

Phần B: Thực hành

Câu B1

Danh sách selector đã dùng trong `style.css`:

- Universal selector: `*`
- Element selectors: `body`, `header`, `nav`, `main`, `figure`, `section`, `aside`, `table`, `thead`, `tbody`, `tfoot`, `footer`
- Class selectors: `.active` (sử dụng trong `nav a.active`)
- ID selectors: `#ve-toi`, `#ky-nang`, `#lien-he`
- Descendant / combined selectors: `nav a`, `section h2`, `aside h2`, `thead th`, `tbody td`, `tfoot td`, `nav a.active`
- Pseudo-class selectors: `nav a:hover`, `tbody tr:nth-child(even)`, `tbody tr:hover`

Ghi chú: Một số selector là kết hợp (ví dụ `nav a.active` kết hợp descendant và class).

Câu B2

Phần 1:
    Hộp 1: chiều rộng thực tế 350px
    Hộp 2: chiều rộng thực tế 300px
Sự khác biệt: 
    Hộp 1 tổng chiểu rộng = width + padding + border
    Hộp 2 width = 300 = content + padding + border

Phần 2:
    Không dùng border-box: content = width + padding + border 
                                   = 500 + 20*2 + 2*2 
                                   = 544px (tràn viền)

    Dùng border-box: content = width = 500px (vừa khít layout)

## Câu B3 (15đ) — Specificity Battle

### Phần 1: Liệt kê 10 CSS rules + Specificity Score

```css
/* Specificity: (0, 0, 1) */
p { color: blue; }

/* Specificity: (0, 1, 0) */
.text { color: green; }

/* Specificity: (0, 1, 0) */
.highlight { color: orange; }

/* Specificity: (0, 1, 1) */
p.text { color: purple; }

/* Specificity: (0, 1, 1) */
p.highlight { color: brown; }

/* Specificity: (0, 2, 0) */
.text.highlight { color: pink; }

/* Specificity: (0, 2, 1) */
p.text.highlight { color: gray; }

/* Specificity: (1, 0, 0) */
#demo { color: red; }

/* Specificity: (1, 1, 0) */
#demo.text { color: navy; }

/* Specificity: (1, 2, 0) - HIGHEST */
#demo.text.highlight { color: yellow; }
```

### Phần 2: Element cuối cùng hiển thị màu gì? Tại sao?

**Màu sắc cuối cùng: YELLOW** (vàng)

**Giải thích:**
- Element `<p id="demo" class="text highlight">` được match bởi tất cả 10 rules.
- Quy tắc Specificity trong CSS:
  - **ID selector** có độ ưu tiên cao nhất (1, x, x)
  - **Class/Pseudo-class** đứng giữa (0, x, x)
  - **Element selector** có độ ưu tiên thấp nhất (0, 0, x)
  
- Sắp xếp specificity từ thấp đến cao:
  ```
  (0,0,1) < (0,1,0) = (0,1,0) < (0,1,1) = (0,1,1) < (0,2,0) < (0,2,1) < (1,0,0) < (1,1,0) < (1,2,0)
  ```
  
- Rule `#demo.text.highlight { color: yellow; }` có **specificity cao nhất (1, 2, 0)**, nên nó là winner.

### Phần 3: Thay đổi thứ tự rules - Kết quả có đổi không?

**Câu trả lời: KHÔNG thay đổi**

**Giải thích:**
- CSS không dựa vào **thứ tự khai báo** trong file CSS mà dựa vào **Specificity**.
- Dù bạn đặt rule `#demo.text.highlight` ở đầu hay cuối file, nó vẫn là winner.
- Thứ tự khai báo chỉ quan trọng khi **Specificity bằng nhau**. Lúc đó rule được viết sau sẽ override rule được viết trước.
- Vì vậy, không thay đổi thứ tự rules không ảnh hưởng đến kết quả cuối cùng.

**Ví dụ:**
```css
/* Dù viết như này */
p { color: blue; }
#demo.text.highlight { color: yellow; }
```
hoặc
```css
/* Hay viết như này */
#demo.text.highlight { color: yellow; }
p { color: blue; }
```
**Kết quả vẫn luôn là YELLOW**, vì specificity của `#demo.text.highlight` luôn cao hơn `p`.

## PHẦN C — DEBUG & SUY LUẬN (20 điểm)

### Câu C1 (10đ) — Debug CSS Layout

Cho CSS ban đầu (content-box):

.container {
   width: 960px;
   margin: 0 auto;
}
.sidebar {
   width: 300px;
   padding: 20px;
   border: 1px solid #ccc;
   float: left;
}
.content {
   width: 660px;
   padding: 30px;
   border: 1px solid #ccc;
   float: left;
}

Tính chiều rộng thực tế (content-box):
- Sidebar: 300px (width) + 2*20px (padding) + 2*1px (border) = 300 + 40 + 2 = 342px
- Content: 660px + 2*30px + 2*1px = 660 + 60 + 2 = 722px
- Tổng = 342 + 722 = 1064px > 960px → layout bị vỡ (content bị đẩy xuống dòng)

Giải thích: vì box model mặc định là `content-box`, `width` chỉ là phần content, padding và border được thêm bên ngoài. Hai cột cộng lại vượt quá chiều rộng container 960px.

Hai cách sửa (đủ khác nhau):
- Cách 1 (dùng `border-box`): cho `.sidebar` và `.content` hoặc toàn cục `box-sizing: border-box;` — khi đó `width` bao gồm padding và border, giữ nguyên `width:300` và `width:660` sẽ cho tổng 960px và khít.
- Cách 2 (không dùng `border-box`): điều chỉnh `width` để bù padding + border. Với padding/border hiện tại tổng phần bổ sung là 42px (sidebar) + 62px (content) = 104px. Vậy tổng content-box widths phải bằng 960 - 104 = 856px. Giữ sidebar 300 → content = 856 - 300 = 556px (content-box). Khi đó:
  - Sidebar ngoài cùng = 300 + 40 + 2 = 342px
  - Content ngoài cùng = 556 + 60 + 2 = 618px
  - Tổng = 342 + 618 = 960px

Tôi đã tạo file minh họa: [PBT_03/debug_layout.html](PBT_03/debug_layout.html) và [PBT_03/debug_layout.css](PBT_03/debug_layout.css). Mở `debug_layout.html` trong trình duyệt để xem 3 khối: Broken (gốc), Fix A (box-sizing: border-box), Fix B (width đã điều chỉnh).

---

### Câu C2 (10đ) — Cascade Puzzle

CSS cho trước:

body { font-size: 16px; color: #333; }
.container { font-size: 14px; }
.card { color: blue; }
.card .title { font-size: 20px; }
.card p { color: inherit; }
#featured .title { color: red; }
.highlight { color: green !important; }

HTML (vị trí các phần cần trả lời):

1) "Sản phẩm A" (h2, class `title highlight`, inside `#featured`):
  - font-size = 20px (selector `.card .title` áp dụng trực tiếp với specificity phù hợp)
  - color = green (selector `.highlight` có `!important`, ghi đè mọi quy tắc màu khác)

Giải thích ngắn: `font-size` được set bởi `.card .title` (không có !important), còn `color` có một quy tắc `.highlight { color: green !important; }` có độ ưu tiên cao nhất do `!important`, nên thắng cả `#featured .title { color: red }`.

2) "Mô tả sản phẩm" (p trong card featured):
  - color = blue

Giải thích: `.card { color: blue }` gán màu cho phần tử `.card` và được kế thừa xuống con. `.card p { color: inherit; }` khiến `p` lấy màu từ cha (`.card`) => blue. Không có `!important` hay selector nào khác áp dụng cho `p` này.

3) "Sản phẩm B" (h2 trong .card thứ hai, class `title`):
  - font-size = 20px (từ `.card .title`)
  - color = blue (kế thừa từ `.card` vì không có override cho màu của title)

Giải thích: không có `.highlight` hay id áp dụng, nên màu kế thừa từ `.card` → blue.

4) "Mô tả sản phẩm B" (p.highlight inside second card):
  - color = green

Giải thích: `.card p { color: inherit; }` sẽ khiến p kế thừa màu mặc định từ `.card` (blue), nhưng p có class `highlight` và `.highlight { color: green !important; }` chứa `!important` nên ghi đè mọi quy tắc khác — kết quả là green.

Tôi đã thêm file kiểm chứng: [PBT_03/cascade_test.html](PBT_03/cascade_test.html) và [PBT_03/cascade_test.css](PBT_03/cascade_test.css). Mở `cascade_test.html` để kiểm tra trực quan.

Lưu ý về screenshot: trong môi trường này tôi không thể chụp ảnh màn hình của trình duyệt. Vui lòng mở các file HTML trên máy của bạn và chụp screenshot. Hai file để mở là:
- [PBT_03/debug_layout.html](PBT_03/debug_layout.html)
- [PBT_03/cascade_test.html](PBT_03/cascade_test.html)
