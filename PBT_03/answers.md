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

