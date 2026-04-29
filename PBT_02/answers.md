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

---

PHẦN C — PHÂN TÍCH & SUY LUẬN (20 điểm)

**Câu C1 (10đ) — Debug Form**

**8 lỗi tìm được:**

1. **Lỗi:** Input "Tên" không có `<label>`, vi phạm accessibility và không có liên kết với label.
   **Sửa:** Thêm `<label for="name">Tên:</label>` và `id="name"` vào input.

2. **Lỗi:** Input email không có `<label>`, khiến screen reader không biết đây là trường gì.
   **Sửa:** Thêm `<label for="email">Email:</label>` + `id="email"` cho input.

3. **Lỗi:** Input email không có `name` attribute, form không thể gửi dữ liệu.
   **Sửa:** Thêm `name="email"` vào input.

4. **Lỗi:** 2 input password không có `id`, `name`, `required`, khó xử lý với JavaScript.
   **Sửa:** Thêm `id="password"` + `name="password"` + `id="confirm_password"` + `name="confirm_password"` + `required`.

5. **Lỗi:** Input phone dùng `type="text"` thay vì `type="tel"`, không tối ưu trên di động (không mở bàn phím số).
   **Sửa:** Đổi thành `type="tel"` và thêm `pattern="[0-9]{10}"` để kiểm tra 10 chữ số.

6. **Lỗi:** Input phone không có `<label>`.
   **Sửa:** Thêm `<label for="phone">Phone:</label>` + `id="phone"`.

7. **Lỗi:** `<select>` không có `name` attribute, `<label>` gắn với nó, và không có `required`.
   **Sửa:** Thêm `id="city"` + `name="city"` + `<label for="city">Thành phố:</label>` + `required`.

8. **Lỗi:** Checkbox điều khoản không có `id`, không có `name`, không có `required`.
   **Sửa:** Thêm `<input type="checkbox" id="terms" name="terms" required>` rồi `<label for="terms">Tôi đồng ý điều khoản</label>`.

---

**Câu C2 (10đ) — Thiết kế chiến lược Validation**

**Pattern Regex cho CMND/CCCD và Số tài khoản:**

1. CMND/CCCD (đúng 12 chữ số): `^[0-9]{12}$`
2. Số tài khoản (10-15 chữ số): `^[0-9]{10,15}$`

**Giải thích Pattern:**
- `^` = bắt đầu chuỗi
- `[0-9]` = ký tự từ 0-9
- `{12}` = lặp đúng 12 lần
- `{10,15}` = lặp từ 10 đến 15 lần
- `$` = kết thúc chuỗi

---

**HTML5 validation đủ an toàn cho ứng dụng ngân hàng?**

**Trả lời: KHÔNG, vì:**

1. **Frontend validation dễ bị vượt qua**: Attacker có thể disable JavaScript, dùng DevTools sửa HTML, hoặc gửi request trực tiếp bypass form.
2. **Chỉ là trải nghiệm UX, không phải bảo mật**: HTML validation là feedback tức thời cho user, nhưng không đảm bảo dữ liệu hợp lệ đến server.
3. **Phải validate lại trên Backend**: Mọi dữ liệu từ client đều phải kiểm tra trên server trước khi lưu database hoặc xử lý tiền bạc.

---

**3 loại validation HTML5 KHÔNG THỂ làm:**

1. **Kiểm tra độc nhất (Uniqueness)**: Ví dụ, kiểm tra email/CMND chưa được đăng ký. Phải query database từ server.
2. **Kiểm tra luật kinh doanh**: Ví dụ, tài khoản chỉ mở được cho độc tuổi ≥ 18 tuổi, hoặc số dư tài khoản ≥ số tiền gửi. Cần logic phức tạp từ server.
3. **Kiểm tra phụ thuộc giữa các field**: Ví dụ, nếu chọn "chuyển khoản" thì phải nhập số tài khoản và mã ngân hàng, không thể confirm password = password (như bài B1 đã nói).

---

**2 rủi ro bảo mật nếu chỉ validate Frontend:**

1. **Bypass validation mà không submit form**: Attacker dùng browser console (JavaScript) hoặc DevTools để xóa `required`, `pattern`, `minlength`... hoặc gửi request HTTP thô mà không qua form.
   **Kết quả:** Dữ liệu sai định dạng, không phải số điện thoại 10 chữ số, hay CMND 8 chữ số được gửi tới server.

2. **Đánh cắp thông tin nhạy cảm từ dữ liệu đã nhập**: Nếu form chứa mật khẩu, PIN, số CMND và chỉ validate ở client, attacker có thể xem dữ liệu trong HTML hoặc JavaScript memory.
   **Kết quả:** Thông tin nhạy cảm bị lộ, tài khoản bị mở, tiền bị chuyển khoản trái phép.
   **Giải pháp:** HTTPS để mã hóa dữ liệu truyền trên mạng, KHÔNG lưu mật khẩu/PIN trong cookie/localStorage, validate lại trên server, hash mật khẩu trước khi lưu.