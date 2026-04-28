# 📝 PHẦN A

## Câu A1 --- HTTP & Browser

### 1. Khi nhập `https://shopee.vn` và nhấn Enter

Các bước xảy ra theo thứ tự:

1.  **DNS Lookup**\
    Trình duyệt gửi yêu cầu tới DNS để phân giải tên miền `shopee.vn`
    thành địa chỉ IP.

2.  **Thiết lập kết nối TCP + TLS**\
    Trình duyệt tạo kết nối TCP với server và thực hiện bắt tay TLS để
    mã hóa (HTTPS).

3.  **Gửi HTTP Request**\
    Trình duyệt gửi request (thường là `GET /`) tới server.

4.  **Server xử lý và trả HTTP Response**\
    Server xử lý yêu cầu và trả về nội dung (HTML, dữ liệu...).

5.  **Trình duyệt parse HTML**\
    Trình duyệt đọc HTML và xây dựng DOM.

6.  **Tải thêm tài nguyên (CSS, JS, ảnh...)**\
    Trình duyệt gửi thêm nhiều request để lấy các file cần thiết.

7.  **Render trang web**\
    Parse CSS, chạy JavaScript và hiển thị giao diện hoàn chỉnh lên màn
    hình.

### 2. Tab Network trong Chrome DevTools hiển thị gì?

-   Danh sách request (HTML, CSS, JS, ảnh, API...)
-   Status Code (200, 404, 500...)
-   Thời gian tải
-   Kích thước tài nguyên
-   Loại tài nguyên
-   Timeline (waterfall)

### 3. Screenshot tab Network

-   Status Code: dòng đầu tiên, cột Status\
-   Tổng thời gian: dòng "Finish"\
-   CSS: dòng có Type = stylesheet

------------------------------------------------------------------------

## Câu A2 --- Semantic HTML

### Lý do SEO thấp

-   Dùng quá nhiều `<div>`
-   Không có semantic structure
-   Không có heading
-   Thiếu alt

### Lỗi semantic

-   Không dùng `<header>`, `<nav>`, `<footer>`
-   Menu không dùng `<nav>`
-   Không dùng `<article>`
-   Không có heading
-   Ảnh thiếu alt

------------------------------------------------------------------------

## Câu A3 --- Block vs Inline

    Hộp 1
    Text A Text B
    Hộp 2
    Text C Text D
    Hộp 3

-   `<div>`: block → xuống dòng\
-   `<span>`, `<strong>`: inline → cùng dòng

------------------------------------------------------------------------

## Câu A4 --- Table

-   `<thead>`: tiêu đề\
-   `<tbody>`: nội dung\
-   `<tfoot>`: tổng kết

### Không nên dùng table để layout:

-   Sai mục đích
-   Khó responsive
-   Khó maintain

------------------------------------------------------------------------

# 📝 PHẦN C

## Câu C1 --- HTML Structure
<header> <!-- header vì đây là phần đầu trang chứa nhận diện và điều hướng tổng -->
    <nav aria-label="Dieu huong chinh"> <!-- nav vì đây là cụm liên kết điều hướng chính của website -->
        <ul> <!-- ul vì menu là danh sách các mục điều hướng ngang cấp -->
            <li> <!-- li vì mỗi mục menu là một phần tử danh sách riêng -->
                <a href="#">Trang chu</a> <!-- a vì đây là liên kết điều hướng tới trang khác -->
            </li>
            <li> <!-- li vì mỗi mục menu là một phần tử danh sách riêng -->
                <a href="#">Dien thoai</a> <!-- a vì đây là liên kết điều hướng tới danh mục -->
            </li>
        </ul>
    </nav>
</header>

<nav aria-label="breadcrumb"> <!-- nav vì breadcrumb cũng là điều hướng theo ngữ cảnh hiện tại -->
    <ol> <!-- ol vì breadcrumb có thứ tự phân cấp từ cha đến con -->
        <li> <!-- li vì mỗi cấp breadcrumb là một mục trong chuỗi phân cấp -->
            <a href="#">Trang chu</a> <!-- a vì mục breadcrumb có thể quay lại cấp trước -->
        </li>
        <li> <!-- li vì mỗi cấp breadcrumb là một mục trong chuỗi phân cấp -->
            <a href="#">Dien thoai</a> <!-- a vì mục breadcrumb có thể quay lại danh mục -->
        </li>
        <li aria-current="page"> <!-- li vì đây là mục cuối trong chuỗi breadcrumb -->
            iPhone 16 <!-- text thuần vì trang hiện tại không cần là liên kết -->
        </li>
    </ol>
</nav>

<main> <!-- main vì đây là vùng nội dung chính duy nhất của trang chi tiết sản phẩm -->
    <section class="product-gallery"> <!-- section vì đây là một khối chức năng độc lập: khu vực ảnh sản phẩm -->
        <h2>Anh san pham</h2> <!-- h2 vì đây là tiêu đề cấp 2 cho khối ảnh trong main -->
        <figure> <!-- figure vì ảnh sản phẩm là nội dung minh họa độc lập -->
            <img src="#" alt="Anh san pham 1"> <!-- img vì hiển thị hình ảnh sản phẩm -->
        </figure>
        <figure> <!-- figure vì ảnh sản phẩm là nội dung minh họa độc lập -->
            <img src="#" alt="Anh san pham 2"> <!-- img vì hiển thị hình ảnh sản phẩm -->
        </figure>
        <figure> <!-- figure vì ảnh sản phẩm là nội dung minh họa độc lập -->
            <img src="#" alt="Anh san pham 3"> <!-- img vì hiển thị hình ảnh sản phẩm -->
        </figure>
        <figure> <!-- figure vì ảnh sản phẩm là nội dung minh họa độc lập -->
            <img src="#" alt="Anh san pham 4"> <!-- img vì hiển thị hình ảnh sản phẩm -->
        </figure>
        <figure> <!-- figure vì ảnh sản phẩm là nội dung minh họa độc lập -->
            <img src="#" alt="Anh san pham 5"> <!-- img vì hiển thị hình ảnh sản phẩm -->
        </figure>
    </section>

    <article class="product-info"> <!-- article vì đây là nội dung chi tiết hoàn chỉnh của một sản phẩm cụ thể -->
        <h1>Ten san pham</h1> <!-- h1 vì đây là tiêu đề chính của trang chi tiết sản phẩm -->
        <p class="price">Gia san pham</p> <!-- p vì giá là đoạn thông tin văn bản ngắn -->
        <p class="rating">Danh gia sao</p> <!-- p vì điểm đánh giá là thông tin văn bản ngắn -->
        <section class="description"> <!-- section vì mô tả là một tiểu khối nội dung riêng trong product-info -->
            <h2>Mo ta</h2> <!-- h2 vì đây là tiêu đề cấp 2 cho phần mô tả -->
            <p>Noi dung mo ta san pham</p> <!-- p vì mô tả là đoạn văn bản diễn giải -->
        </section>
    </article>

    <section class="specifications"> <!-- section vì thông số kỹ thuật là một khối chức năng riêng -->
        <h2>Thong so ky thuat</h2> <!-- h2 vì đây là tiêu đề cấp 2 của khối thông số -->
        <table> <!-- table vì dữ liệu thông số có dạng hàng cột rõ ràng -->
            <thead> <!-- thead vì nhóm hàng tiêu đề cột cho bảng -->
                <tr> <!-- tr vì tiêu đề được trình bày theo một hàng -->
                    <th>Thong so</th> <!-- th vì đây là ô tiêu đề cột -->
                    <th>Gia tri</th> <!-- th vì đây là ô tiêu đề cột -->
                </tr>
            </thead>
            <tbody> <!-- tbody vì nhóm các hàng dữ liệu nội dung bảng -->
                <tr> <!-- tr vì mỗi thông số là một hàng dữ liệu -->
                    <td>...</td> <!-- td vì đây là ô dữ liệu thường -->
                    <td>...</td> <!-- td vì đây là ô dữ liệu thường -->
                </tr>
            </tbody>
        </table>
    </section>

    <section class="reviews"> <!-- section vì phần đánh giá là một khối nội dung riêng -->
        <h2>Danh gia va binh luan</h2> <!-- h2 vì đây là tiêu đề cấp 2 cho khối đánh giá -->
        <article class="review-item"> <!-- article vì mỗi bình luận là một đơn vị nội dung độc lập -->
            <p>Noi dung binh luan</p> <!-- p vì bình luận là nội dung văn bản -->
        </article>
    </section>

    <aside class="related-products"> <!-- aside vì sản phẩm tương tự là nội dung bổ trợ cho nội dung chính -->
        <h2>San pham tuong tu</h2> <!-- h2 vì đây là tiêu đề cho khối nội dung bổ trợ -->
        <ul> <!-- ul vì danh sách sản phẩm tương tự là tập hợp các mục ngang cấp -->
            <li> <!-- li vì mỗi sản phẩm tương tự là một mục trong danh sách -->
                <a href="#">San pham A</a> <!-- a vì mục sản phẩm tương tự dẫn đến trang chi tiết khác -->
            </li>
        </ul>
    </aside>
</main>

<footer> <!-- footer vì đây là phần chân trang chứa thông tin kết trang -->
    <p>Thong tin chan trang</p> <!-- p vì nội dung chân trang thường là đoạn thông tin văn bản -->
</footer>
## Câu C2 --- Tranh luận

Noi dung tranh luan cho rang chi dung div va class la du khong dung trong thuc te ky thuat hien dai. Ly do thu nhat la SEO: cong cu tim kiem phan tich cau truc trang dua tren y nghia the, vi vay header, nav, main, article, section giup bot tim kiem nhan dien nhanh khu vuc noi dung chinh, dieu huong va cac khoi doc lap. Neu dung div cho tat ca, bot van co the index, nhung mat them ngu canh, dan den chat luong hieu trang va kha nang hien thi rich result kem hon. Ly do thu hai la Accessibility: screen reader va cong nghe ho tro dua vao semantic landmark de nguoi khuyet tat nhay nhanh den nav, main, footer ma khong phai nghe toan bo trang tu dau den cuoi. Do la loi ich truc tiep, do duoc, khong phai ly thuyet.

Vi du cu the: tren trang chi tiet san pham, neu dung nav aria-label="breadcrumb" ket hop ol va li, nguoi dung dung screen reader se nghe dung thu tu Trang chu > Dien thoai > iPhone 16 va co the quay lai cap truoc nhanh hon. Neu thay bang cac div, thu tu va muc dich dieu huong de bi mo ho. Tuy nhien, div van rat phu hop trong mot so truong hop, nhu wrapper phuc vu layout voi grid/flex, nhom cac thanh phan khong co y nghia noi dung rieng (vi du khung can le, container responsive, overlay de tao hieu ung). Ket luan: semantic HTML khong thay the hoan toan div, ma bo sung y nghia dung cho dung cho, giup he thong, cong cu tim kiem va nguoi dung deu huong loi.

## Bài B3 --- Debug HTML

Lỗi 1: Dòng 1 — `<!DOCTYPE>` không đầy đủ chuẩn HTML5 — Sửa thành `<!DOCTYPE html>`.

Lỗi 2: Dòng 2 — Thẻ `<html>` thiếu thuộc tính ngôn ngữ — Sửa thành `<html lang="vi">`.

Lỗi 3: Dòng 4 — Thẻ `<title>` chưa đóng — Thêm `</title>`.

Lỗi 4: Dòng 5 — Khai báo mã hóa `utf8` không đúng chuẩn viết phổ biến — Sửa thành `UTF-8`.

Lỗi 5: Dòng 8 — Thẻ `<h1>` đóng sai (`<h1>` thay vì `</h1>`) — Sửa thành `<h1>Welcome to ShopTLU</h1>`.

Lỗi 6: Dòng 12 — Thẻ `<a>` đầu tiên chưa đóng đúng — Sửa thành `<a href="#home">Trang chủ</a>`.

Lỗi 7: Dòng 13 — Link sản phẩm dùng đường dẫn không rõ ngữ cảnh trong bài mẫu — Sửa thành `<a href="#products">Sản phẩm</a>`.

Lỗi 8: Dòng 20 — Giá trị thuộc tính `src` chưa đặt trong dấu ngoặc kép — Sửa `src=iphone.jpg` thành `src="iphone.jpg"`.

Lỗi 9: Dòng 20 — Ảnh thiếu thuộc tính mô tả thay thế — Thêm `alt="iPhone 16 Pro"` cho thẻ `<img>`.

Lỗi 10: Dòng 22 — Thẻ `<p>` và `<b>` lồng/đóng sai thứ tự (`</p></b>`) — Sửa thành `<p>Giá: <b>25.990.000đ</b></p>`.

Lỗi 11: Dòng 27-36 — Bảng thiếu nhóm cấu trúc ngữ nghĩa — Bổ sung `<thead>` cho dòng tiêu đề và `<tbody>` cho dữ liệu.

Lỗi 12: Dòng 29-30 — Ô tiêu đề bảng đang dùng `<td>` thay vì `<th>` — Sửa hai ô đầu thành `<th>`.

Lỗi 13: Dòng 40 — Tài liệu có 2 thẻ `<main>` (sai semantic, chỉ nên có 1) — Đổi khối thứ hai thành `<aside>`.

Lỗi 14: Dòng 45 — Thẻ `<p>` trong footer chưa đóng — Thêm `</p>`.

Lỗi 15: Cuối tài liệu — Thiếu thẻ đóng `</html>` — Bổ sung `</html>`.

## Bài B4 (15đ) --- Phân tích trang web thật (tiki.vn)

Trang được chọn: `https://tiki.vn`

### 1) Elements: Semantic HTML5

Khi mở DevTools (F12) ở trang chủ tiki.vn và Inspect các vùng chính, có thể xác nhận:

- Thẻ semantic dùng đúng:
    - `<header>`: bao phần đầu trang (logo, ô tìm kiếm, tài khoản, giỏ hàng).
    - `<main>`: bao khối nội dung chính (banner, danh mục, block sản phẩm).
    - `<footer>`: bao phần chân trang (hỗ trợ khách hàng, liên kết, thông tin công ty).

- Thẻ semantic dùng chưa tối ưu (nếu thấy trong DOM runtime của bạn):
    - Khu menu điều hướng chính hiển thị như thanh danh mục nhưng không bọc bằng `<nav>`, chủ yếu là `<div>`.
    - Các khối sản phẩm/lists có thể dùng nhiều `<div>` thay vì `<section>`/`<article>` cho từng cụm nội dung.

Ảnh bạn tự chụp và lưu:
- `screenshots/b4-elements-header-main-footer.png`
- `screenshots/b4-elements-nonsemantic.png`

### 2) Elements: Tìm `<table>`

Trang chủ tiki.vn không có `<table>` trong khung nội dung chính.


### 3) Elements: Tìm `<form>` (ô tìm kiếm)

Trang chủ tiki.vn không có `<form>` trong khung nội dung chính.

<input type="text">

