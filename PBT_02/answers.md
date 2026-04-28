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