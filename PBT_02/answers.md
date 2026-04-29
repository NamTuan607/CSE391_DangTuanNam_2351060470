PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)

Câu A1 (5đ) — Input Types
Liệt kê 10 input types khác nhau trong HTML5, cho mỗi type: giao diện hiển thị, validation tự động (nếu có), và use case cụ thể trong trang E-Commerce.

1. type="email" → Ô nhập text, tự kiểm tra có '@' và domain hợp lệ → Dùng cho form đăng ký/đặt hàng để nhận thông báo và hóa đơn điện tử
2. type="button" → Nút bấm, không gửi form, không có validation tự động → Dùng cho hành động trên trang sản phẩm (Thêm vào giỏ, Xem chi tiết) với JS xử lý
3. type="checkbox" → Ô tích chọn (có/không), có thể dùng `required`/JS để bắt buộc → Dùng để chọn phụ kiện hoặc chấp nhận điều khoản
4. type="date" → Trình chọn ngày, trình duyệt kiểm tra định dạng ngày → Dùng để chọn ngày giao hàng
5. type="number" → Ô nhập số với spinner, kiểm tra `min`/`max`/`step` → Dùng để nhập số lượng sản phẩm
6. type="password" → Ô nhập mật khẩu (ký tự ẩn), không tự kiểm tra độ mạnh → Dùng cho đăng nhập/đăng ký tài khoản khách hàng
7. type="tel" → Ô nhập số điện thoại, trên di động mở bàn phím số; có thể dùng `pattern` để kiểm tra → Dùng để nhập số điện thoại nhận hàng/OTP
8. type="text" → Ô nhập văn bản thông thường, không có validation mặc định → Dùng cho tên người nhận, địa chỉ giao hàng, ghi chú đơn
9. type="submit" → Nút gửi form (kích hoạt validation trước khi gửi) → Dùng cho nút "Thanh toán" hoặc "Gửi đơn hàng"
10. type="search" → Ô tìm kiếm, UI tối ưu cho tìm kiếm, không có validation tự động → Dùng cho thanh tìm kiếm sản phẩm

Câu A2 - Validate Attributes

Dự đoán:
    - Trường hợp 1 : yêu cầu nhập đầy đủ vì user bỏ trống
    - Trường hợp 2 : yêu cầu nhập @ vì type="email"
    - Trường hợp 3 : giá trị vượt quá cho phép vì 15 > 10
    - Trường hợp 4 : không hợp lệ vì giá trị cho phép 10 chứ số giá trị từ 0 đến 9
    - Trường hợp 5 : không hợp lệ vì tối thiểu chiều dài kí tự là 8
So sánh:
    - Trường hợp 1 : Đúng dự đoán
    - Trường hợp 2 : Đúng dự đoán
    - Trường hợp 3 : Đúng dự đoán
    - Trường hợp 4 : Đúng dự đoán
    - Trường hợp 5 : chặn form

Câu A3 (5đ) — Accessibility
1. `<label for="email">` rất quan trọng với screen reader vì nó gắn nhãn rõ ràng cho ô nhập. Khi người dùng di chuyển tới input, screen reader sẽ đọc tên trường là “Email”, giúp họ hiểu họ đang nhập gì mà không cần nhìn giao diện.
2. Dùng `<fieldset>` + `<legend>` khi cần nhóm các trường có cùng ý nghĩa. Ví dụ: nhóm chọn phương thức thanh toán hoặc giới tính.
```html
<fieldset>
     <legend>Phương thức thanh toán</legend>
     <label><input type="radio" name="payment" value="cod"> Thanh toán khi nhận hàng</label>
     <label><input type="radio" name="payment" value="card"> Thẻ ngân hàng</label>
</fieldset>
```
3. `aria-label` dùng khi phần tử không có nhãn hiển thị rõ ràng trên giao diện, ví dụ nút chỉ có biểu tượng kính lúp hoặc nút đóng `X`. Không nên dùng `aria-label` khi đã có `<label>` vì nó dễ tạo ra nhãn trùng lặp, làm nội dung khó bảo trì, và có thể khiến nhãn hiển thị và nhãn truy cập bị lệch nhau.

Câu A4 (5đ) — Media
1. `loading="lazy"` trên thẻ `<img>` yêu cầu trình duyệt chỉ tải ảnh khi ảnh sắp xuất hiện trong vùng nhìn thấy. Nó giúp giảm thời gian tải ban đầu, tiết kiệm băng thông và cải thiện hiệu năng trang. Không nên dùng cho ảnh quan trọng ở phía trên màn hình, ảnh hero, logo, hoặc ảnh đầu tiên cần hiển thị ngay vì có thể làm chậm nội dung quan trọng.
2. Nên cung cấp nhiều `<source>` trong thẻ `<video>` để trình duyệt tự chọn định dạng nó hỗ trợ tốt nhất. Điều này tăng khả năng tương thích giữa các trình duyệt và thiết bị. Ba format video web phổ biến là MP4, WebM và Ogg.
3. Thuộc tính `alt` dùng để mô tả nội dung ảnh cho screen reader, hiển thị khi ảnh lỗi, và hỗ trợ SEO. Alt tốt cho 3 trường hợp:
    - Ảnh sản phẩm iPhone 16: `iPhone 16 Pro Max 256GB màu Titan`
    - Ảnh trang trí (decorative): để trống `alt=""`
    - Ảnh biểu đồ doanh thu Q1/2026: `Biểu đồ doanh thu quý 1 năm 2026 tăng dần từ tháng 1 đến tháng 3`

Câu A5 (5đ) — So sánh `<figure>` vs `<img>`
1. Dùng Cách 1 (`<img>`) khi ảnh chỉ có nhiệm vụ hiển thị nội dung trực quan, không cần chú thích riêng hoặc không cần tách thành một khối nội dung độc lập. Ví dụ thực tế:
    - Ảnh đại diện sản phẩm trong lưới danh sách sản phẩm
    - Logo thương hiệu ở header
2. Dùng Cách 2 (`<figure>` + `<figcaption>`) khi ảnh cần chú thích, giải thích, hoặc là một đơn vị nội dung độc lập có thể được tham chiếu riêng. Ví dụ thực tế:
    - Ảnh sản phẩm kèm giá và tên trong trang chi tiết
    - Ảnh biểu đồ, sơ đồ hoặc infographic kèm chú thích nguồn dữ liệu