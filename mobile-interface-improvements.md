# Cải thiện giao diện mobile

## Mục tiêu

Giữ nguyên đầy đủ 5 section `Hero → About → Book/Projects → Supporters → Thank You`, tối ưu chúng cho màn hình 320–767px và không dùng `hidden`, `display: none` hoặc render có điều kiện để loại bỏ cả section trên mobile.

## Công việc

- [ ] 1. Lập baseline responsive cho `src/app/page.tsx` và 5 section ở viewport 320×568, 360×800, 390×844, 430×932, 768×1024 và 1440×900; ghi lại overflow, chồng lớp và vùng bấm nhỏ → Kiểm tra: mỗi section có chiều cao lớn hơn 0, đúng thứ tự DOM và trang không cuộn ngang.
- [ ] 2. Sửa `src/components/sections/BookSection.tsx`: bỏ cả hai `hidden md:block` ở placeholder và section root; giữ desktop WebGL hiện tại, thêm layout mobile trong cùng `#book-section` dùng chung `PROJECTS` và `pageAtom`, có ảnh, mô tả, tags, CTA cùng nút trước/sau tối thiểu 44px → Kiểm tra: chọn project từ Hero cuộn tới Book và hiển thị đúng project trên mobile; toàn bộ project đều truy cập được mà không cần hover.
- [ ] 3. Tối ưu `HeroSection.tsx` cho touch: đổi folder/card có `onClick` thành control semantic, thêm focus-visible, khóa scroll nền khi mở project tray, dùng horizontal scroll-snap và đặt nút Close trong safe area → Kiểm tra: mở/chọn/đóng bằng chạm và bàn phím, không bị cắt ở màn hình 320px, thao tác chọn không dẫn tới section ẩn.
- [ ] 4. Refactor mobile layout của `AboutSection.tsx`: thay `h-[100vh] min-h-[800px]` cùng hai khối absolute bằng luồng dọc `text → stack → avatar`, dùng `min-height: 100svh`, kích thước ảnh theo `clamp()`/aspect ratio và giữ toàn bộ nội dung → Kiểm tra: chữ, carousel công nghệ và avatar không đè nhau ở cả portrait lẫn landscape.
- [ ] 5. Điều chỉnh `SupporterSection.tsx` và `SupporterWall.tsx`: đảm bảo heading không tràn, card có `min-w-0`/`break-words`, CTA co vừa 320px và marquee có phương án vuốt/scroll-snap khi giảm chuyển động → Kiểm tra: tên/lời nhắn ngắn và tối đa 500 ký tự không gây tràn; loading, empty và error state vẫn nhìn thấy.
- [ ] 6. Refactor `ThankYouSection.tsx`: bỏ chiều cao giấy cố định 500/600px trên mobile, chuyển contact và social từ absolute sang flow dọc, giữ Lottie/CTA/social links và tăng mọi vùng bấm lên ít nhất 44×44px → Kiểm tra: không chồng BottomBar, không cắt CTA/contact/social ở 320×568 và landscape thấp.
- [ ] 7. Bổ sung quy tắc responsive dùng chung trong `globals.css`/component: safe-area inset, `prefers-reduced-motion`, focus-visible, animation chỉ dùng transform/opacity và bỏ `transition-all` ở phần sửa; không ẩn toàn cục scrollbar của vùng cần vuốt → Kiểm tra: chế độ Reduce Motion không chạy marquee/animation vô hạn và nội dung vẫn đầy đủ khi JavaScript hoặc WebGL tải chậm.
- [ ] 8. Xác minh cuối bằng browser automation và thiết bị thật: assert 5 section đều visible, `scrollWidth <= clientWidth`, điều hướng Hero→Book hoạt động, link/CTA bấm được; chạy `npm test`, `npx tsc --noEmit`, ESLint phạm vi thay đổi và `npm run build` → Kiểm tra: pass toàn bộ viewport mobile đã chốt và desktop không regression.

## Hoàn tất khi

- [ ] Hero, About, Book/Projects, Supporters và Thank You đều hiển thị trên mọi breakpoint.
- [ ] Book Section có trải nghiệm mobile đầy đủ, không tải WebGL nặng khi layout mobile được dùng nhưng không mất bất kỳ project/nội dung nào.
- [ ] Không có horizontal overflow, nội dung chồng nhau hoặc control nhỏ hơn 44×44px ở viewport từ 320px.
- [ ] Desktop giữ nguyên 3D Book, visual identity, thứ tự section và hành vi hiện tại.

## Ghi chú

- Root cause hiện tại: `BookSection.tsx` có `hidden md:block` tại cả nhánh chưa mounted và section đã mounted.
- Chỉ được thay cách bố trí bên trong section theo breakpoint; không được xoá, comment hoặc ẩn section root.
- `ProjectSection.tsx` hiện đang bị comment trong `page.tsx`, không thuộc 5 section đang render và không được tự ý bật lại trong hạng mục này.
