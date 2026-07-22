# Hoàn thiện chức năng Donate

## Mục tiêu

Biến trang `/buy-me-a-coffee` từ bản mô phỏng dùng `localStorage` thành luồng donate thật: tạo VietQR riêng, chỉ công khai supporter sau khi webhook xác nhận đã nhận tiền, và đồng bộ dữ liệu trên mọi thiết bị.

## Kiến trúc chốt

`CoffeeForm` → `POST /api/donations` tạo mã `CF########` + VietQR → người dùng chuyển khoản → SePay webhook → Neon Postgres cập nhật `paid` → UI kiểm tra trạng thái và tải lại supporter wall.

## Công việc

- [x] 1. Dùng Neon project đã tạo, lấy pooled connection string vào `DATABASE_URL` cho `.env.local` và Vercel; thêm `@neondatabase/serverless`, `drizzle-orm`, `zod` và dev dependency `drizzle-kit`, cập nhật `.gitignore` để commit được `.env.example` chứa tên biến SePay/Neon/thông tin tài khoản nhưng không có secret → Đã kết nối pooled URL và chạy truy vấn chỉ đọc thành công trên `neondb`; còn khai báo cùng biến trên Vercel khi deploy hosting.
- [x] 2. Tạo `drizzle.config.ts`, `src/db/index.ts` có `server-only`, `src/db/schema.ts` và migration trong `drizzle/` cho `donations` (`payment_code` unique, name, message, cups, amount, status, timestamps, `is_visible`) cùng `sepay_transactions` (`sepay_id` unique, reference, amount, payment_code, matched donation) → Migration đã được kiểm thử trên branch tạm rồi commit vào Neon branch `production`; schema production có 2 bảng, 7 index và 26 constraint.
- [x] 3. Tạo schema Zod và `POST src/app/api/donations/route.ts`: validate/giới hạn name-message-cups, tính giá 30.000đ/ly ở server, sinh mã `CF########` không trùng, lưu `pending`, trả URL VietQR với đúng tài khoản + amount + nội dung chỉ chứa mã thanh toán và `expiresAt` → Kiểm tra tự động cho validation và tính tiền đã pass.
- [x] 4. Tạo `POST src/app/api/webhooks/sepay/route.ts` và endpoint kiểm tra trạng thái: đọc raw body để xác minh HMAC-SHA256 trước khi parse, chỉ nhận `transferType=in`, đối chiếu account + `code` + `transferAmount`, rồi dùng một câu SQL atomic/transaction Neon để `INSERT ... ON CONFLICT` transaction và đổi đơn sang `paid`; trả `200 {"success":true}` và idempotent theo `id` → Unit test HMAC, sai tiền và normalization đã pass; còn test payload thật từ SePay dashboard.
- [x] 5. Refactor `src/components/coffee/CoffeeForm.tsx` và `src/app/buy-me-a-coffee/page.tsx` thành state machine `idle → creating → pending → paid/error/expired`: render VietQR + mã chuyển khoản, copy tài khoản/nội dung, polling mỗi 3 giây, disable submit lặp, dừng sau thời hạn và cảm ơn chỉ khi server báo `paid` → Không còn ghi supporter vào `localStorage`.
- [x] 6. Thay `INITIAL_SUPPORTERS` và `portfolio_coffee_supporters` trong `src/data/coffeeConfig.ts`, `src/components/sections/SupporterSection.tsx` bằng danh sách `paid AND is_visible` từ data layer/API → Homepage và trang donate dùng chung API supporter.
- [x] 7. Hoàn thiện an toàn/vận hành: escape và giới hạn nội dung, cap số ly, rate-limit tạo đơn, so sánh HMAC constant-time, log theo `payment_code`/`sepay_id` không chứa secret và tài liệu setup trong `README.md`.
- [ ] 8. Xác minh cuối: thêm unit test cho validation/tính tiền/HMAC/idempotency, integration test route bằng payload SePay fixture, E2E cho success/sai tiền/timeout/refresh; chạy `npm run lint`, `npm run build`, toàn bộ test, mô phỏng giao dịch trong SePay Test mode rồi mới chuyển thật số tiền nhỏ → Kiểm tra: mọi lệnh pass, webhook nhận 200 và supporter chỉ xuất hiện sau giao dịch đúng mã + đúng tiền.

## Hoàn tất khi

- [x] Người dùng không thể tự thêm tên lên wall nếu chưa thanh toán.
- [ ] Donation thành công được xác nhận bằng webhook SePay có HMAC hợp lệ, không trùng khi retry, và đồng bộ giữa các thiết bị.
- [x] Luồng pending, paid, sai số tiền, expired và lỗi mạng đều có trạng thái UI rõ ràng.
- [ ] Build, lint, test tự động và giao dịch production giá trị nhỏ đều thành công.

## Ghi chú

- Không dùng nút “đã chuyển khoản” làm bằng chứng; chỉ webhook SePay có HMAC hợp lệ, đúng tài khoản, đúng mã và đúng tiền mới đổi đơn sang `paid`.
- SePay có thể gửi cùng giao dịch nhiều lần, vì vậy `sepay_transactions.sepay_id UNIQUE` là lớp chống trùng bắt buộc.
- Test theo thứ tự: fixture cục bộ → SePay Test mode → giao dịch thật giá trị nhỏ trên HTTPS production.
- Neon project đã được tạo; khi triển khai chỉ còn lấy pooled connection string và khai báo `DATABASE_URL` ở local/Vercel. Mọi truy vấn database đi qua server Route Handler, không kết nối Neon trực tiếp từ browser.
- Tài liệu tham chiếu: [SePay Webhook](https://docs.sepay.vn/tich-hop-webhooks.html), [SePay Test mode](https://developer.sepay.vn/vi/sepay-webhooks/test-mode/bat-dau-nhan), [Neon serverless driver](https://neon.com/docs/serverless/serverless-driver), [Drizzle với Neon](https://orm.drizzle.team/docs/get-started/neon-new), và tài liệu Next.js 16 tại `node_modules/next/dist/docs/01-app/01-getting-started/15-route-handlers.md`.
