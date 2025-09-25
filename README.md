# cookie_session_auth

Xác thực bằng **cookie** + lưu **session** vào MongoDB (TTL 5 phút). Luồng yêu cầu của bài:
1) `register` (tạo user) → kiểm tra trong DB  
2) `login` (đăng nhập) → kiểm tra trong DB  
3) `profile` (xem trang bảo vệ)  
4) `logout` (đăng xuất) → kiểm tra cookie bị xóa trong DB

## Yêu cầu
- Node.js ≥ 18
- MongoDB chạy local (mặc định: `mongodb://127.0.0.1:27017/cookieApp`)

## Cài đặt
```bash
npm init -y
npm i express cookie-parser mongoose bcrypt
