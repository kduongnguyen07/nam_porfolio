# Hoàng Nam — Court of Code (AI & Basketball Portfolio)

Một trang Portfolio cá nhân cao cấp dành cho **Hoàng Nam** (K70 CNTT - UET VNU, MSSV: `25020279`), kết hợp giữa hành trình học tập học phần Nhập môn Công nghệ số & Trí tuệ nhân tạo (CNS) và niềm đam mê bóng rổ mãnh liệt.

## 🏀 Các Tính Năng Nổi Bật

1. **Hiệu ứng Phay Xước (Brushed Metal Overlay)**:
   - Sử dụng bộ lọc nhiễu SVG nâng cao (`feTurbulence`) tạo ra một lớp vân xước mịn tựa kim loại phủ trên toàn màn hình, mang lại giao diện cơ khí cao cấp.
2. **Hình nền mờ siêu sao NBA (Parallax Watermarks)**:
   - Các khoảnh khắc thi đấu đỉnh cao của LeBron James, Steph Curry, Kevin Durant, Kobe Bryant, Michael Jordan tự động xuất hiện làm hình nền mờ mượt mà phía sau timeline tương ứng với từng bài tập khi cuộn chuột.
   - Hình nền bài tập cuối cùng là cú ném Fadeaway ghi điểm lịch sử phá vỡ kỷ lục mọi thời đại của LeBron James.
3. **Bảng điểm Stadium LED Scoreboard**:
   - Widget bảng điểm điện tử góc màn hình hoạt động như đồng hồ nhà thi đấu, lấy số cuối và số đầu trong MSSV của bạn làm điểm thi đấu (`HOME 79 - AWAY 25`), và khóa học làm hiệp đấu (`PERIOD 7`).
   - Có đồng hồ 24 giây Shot Clock đếm ngược sinh động kèm còi buzzer nhấp nháy đỏ khi hết giờ.
4. **Vé vào sân timeline (Match Admission Tickets)**:
   - Các báo cáo bài tập được thiết kế dạng vé xem bóng rổ với đầy đủ cuống vé (thông tin SEC, ROW, SEAT ánh xạ từ MSSV `25020279`), đường xé răng cưa, vết đục lỗ và mã vạch tương tác.
5. **Tích hợp dữ liệu 100% từ Bài tập**:
   - Dữ liệu được trích xuất tự động bằng Python từ các file báo cáo gốc (`BaiTap/1CNS.docx` đến `6CNS.docx`), hiển thị chi tiết các bảng biểu báo cáo và toàn bộ hình ảnh minh chứng.

## 🛠️ Công Nghệ Sử Dụng

- **Core**: HTML5, TypeScript (Vanilla TS)
- **Styling**: Vanilla CSS3, SVG Filters
- **Build tool**: Vite
- **Data pipeline**: Python (docx parsing)

## 🚀 Hướng Dẫn Chạy Dự Án

### Cài đặt dependencies:
```bash
npm install
```

### Chạy ở chế độ phát triển (Development):
```bash
npm run dev
```

### Build cho môi trường production:
```bash
npm run build
```

---
Thiết kế dành riêng cho **K70 IT UET VNU** • MSSV: **25020279**.
