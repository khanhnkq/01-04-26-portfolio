# Frontend Design Showcase

> Ghi chú nội dung cho phần showcase portfolio.  
> Nguồn: thông tin sản phẩm do chủ dự án cung cấp và dữ liệu repository lấy qua GitHub connector ngày 23/07/2026.

## Tổng quan

| Dự án | Loại sản phẩm | Điểm nổi bật | Công nghệ chính |
| --- | --- | --- | --- |
| Flotie | E-commerce landing page | Quảng bá thương hiệu và bán quần áo | React 19, TypeScript, Vite 7, Tailwind CSS 4, Radix UI |
| WonderKids Fun Zone | Educational web app | Giáo dục bảo vệ cơ thể cho trẻ em, tích hợp AI chatbot | React 18, TypeScript, Vite 5, Tailwind CSS 3, shadcn/ui |
| Checked Mobile UI | Social finance mobile app | Chia sẻ khoảnh khắc theo phong cách Locket, tích hợp quản lý chi tiêu | Flutter, Dart, Riverpod, Dio, GoRouter, Hive |
| HyperMatch | Hyperwork web app | Luồng gợi ý sản phẩm và không gian workspace | React 19, TypeScript, Vite 6, Tailwind CSS 4, GSAP, Motion |
| QuizKen Landing | Product landing page | Giới thiệu nền tảng QuizKen và dẫn dắt người dùng khám phá sản phẩm | Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion |
| ThauPhim Web | Movie streaming web app | Khám phá và xem phim từ nguồn dữ liệu OPhim API | Next.js 16, React 19, TypeScript, Tailwind CSS 4, HLS.js |
| ThauPhim Mobile | Movie streaming mobile app | Phiên bản mobile của trải nghiệm khám phá và xem phim ThauPhim | Expo 55, React Native 0.83, TypeScript, NativeWind, Expo Router |

---

## 01. Flotie

**Repository:** [khanhnkq/Flotie-landing](https://github.com/khanhnkq/Flotie-landing)

### Mô tả ngắn

Landing page thương mại điện tử dành cho thương hiệu thời trang, tập trung vào việc quảng bá bộ sưu tập, truyền tải cá tính thương hiệu và dẫn dắt người dùng đến hành động mua hàng.

### Showcase copy

> A fashion e-commerce experience designed to turn visual storytelling into product discovery and purchase intent.

### Điểm nên làm nổi bật

- Art direction và cách trình bày sản phẩm thời trang.
- Luồng khám phá sản phẩm từ landing page đến quyết định mua hàng.
- Hệ thống component UI phong phú dựa trên Radix UI.
- Responsive layout và trải nghiệm tương tác trên nhiều kích thước màn hình.

### Thông tin kỹ thuật

- React 19 và TypeScript.
- Vite 7.
- Tailwind CSS 4.
- Radix UI, React Hook Form và Zod.
- Embla Carousel, Recharts và Lucide React.
- Có cấu hình Cloudflare Vite plugin.

### Trạng thái repository

- Public, không archived.
- Default branch: `main`.
- Chưa có `README.md` tại thời điểm thu thập dữ liệu.

---

## 02. WonderKids Fun Zone

**Repository:** [khanhnkq/wonderkids-fun-zone](https://github.com/khanhnkq/wonderkids-fun-zone)

### Mô tả ngắn

Website giáo dục tương tác giúp trẻ em tìm hiểu về cơ thể, ranh giới cá nhân và kỹ năng tự bảo vệ trong một không gian trực quan, thân thiện. Sản phẩm tích hợp chatbot AI để hỗ trợ giải đáp nội dung theo cách gần gũi với trẻ.

### Showcase copy

> An interactive learning space that helps children understand body safety through approachable content, playful UI and AI-assisted guidance.

### Điểm nên làm nổi bật

- Thiết kế thân thiện, dễ tiếp cận với nhóm người dùng nhỏ tuổi.
- Cách chuyển tải chủ đề nhạy cảm thành trải nghiệm học tập an toàn.
- AI chatbot đóng vai trò hỗ trợ, không lấn át nội dung giáo dục chính.
- Hệ thống điều hướng và tương tác phù hợp với trẻ em.

### Thông tin kỹ thuật

- React 18 và TypeScript.
- Vite 5.
- Tailwind CSS 3 và shadcn/ui/Radix UI.
- TanStack React Query.
- React Hook Form và Zod.
- Recharts, Embla Carousel và Lucide React.

### Trạng thái repository

- Public, không archived.
- Default branch: `main`.
- README hiện chủ yếu là nội dung khởi tạo mặc định của Lovable.

---

## 03. Checked Mobile UI

**Repository:** [khanhnkq/Checked-Mobile-UI](https://github.com/khanhnkq/Checked-Mobile-UI)

### Mô tả ngắn

Ứng dụng di động lấy cảm hứng từ Locket, cho phép người dùng chia sẻ những khoảnh khắc đời thường với bạn bè thân thiết, đồng thời tích hợp công cụ theo dõi và quản lý chi tiêu cá nhân trong cùng một trải nghiệm.

### Showcase copy

> A close-friends social app inspired by Locket, combining spontaneous photo sharing with simple personal expense tracking.

### Điểm nên làm nổi bật

- Trải nghiệm chụp và chia sẻ khoảnh khắc nhanh với nhóm bạn thân.
- Cách kết hợp tính năng social và quản lý tài chính trong một luồng trải nghiệm thống nhất.
- Dashboard theo dõi chi tiêu rõ ràng, dễ đọc trên màn hình nhỏ.
- Khả năng kết nối API, lưu trữ cục bộ và quản lý trạng thái ứng dụng.
- Thiết kế responsive theo nhiều kích thước thiết bị.

### Thông tin kỹ thuật

- Flutter và Dart SDK 3.11.
- Riverpod và Provider cho state management.
- Dio cho networking.
- GoRouter cho routing.
- Hive, Flutter Secure Storage và dotenv cho dữ liệu cục bộ/cấu hình.
- Google Fonts, Flutter SVG và ScreenUtil cho UI.
- Có tích hợp camera, image picker và share flow.

### Trạng thái repository

- Public, không archived.
- Default branch: `main`.
- README có hướng dẫn cấu hình `API_BASE_URL`.

---

## 04. HyperMatch

**Repository:** [khanhnkq/HyperMatch](https://github.com/khanhnkq/HyperMatch)

### Mô tả ngắn

Web app theo mô hình hyperwork, kết hợp luồng gợi ý sản phẩm với không gian workspace để người dùng khám phá, đánh giá và tổ chức các lựa chọn trong cùng một trải nghiệm.

### Showcase copy

> A hyperwork experience that connects guided product discovery with a focused workspace for comparing and organizing decisions.

### Điểm nên làm nổi bật

- Luồng gợi ý sản phẩm theo từng bước.
- Sự chuyển tiếp giữa discovery flow và workspace.
- Motion design hỗ trợ cảm giác liên tục của trải nghiệm.
- Cách tổ chức nhiều lớp thông tin mà vẫn giữ giao diện tập trung.

### Thông tin kỹ thuật

- React 19 và TypeScript.
- Vite 6.
- Tailwind CSS 4.
- GSAP và Motion cho animation.
- Phosphor Icons.

### Trạng thái repository

- Public, không archived.
- Default branch: `main`.
- README hiện chỉ có tiêu đề dự án.

---

## 05. QuizKen Landing

**Repository:** [khanhnkq/quizken-landing](https://github.com/khanhnkq/quizken-landing)

### Mô tả ngắn

Landing page giới thiệu QuizKen, tập trung truyền tải giá trị sản phẩm, trình bày tính năng và tạo luồng chuyển đổi rõ ràng để người dùng bắt đầu khám phá nền tảng.

### Showcase copy

> A product landing page that turns QuizKen’s learning experience into a clear, engaging story with purposeful calls to action.

### Điểm nên làm nổi bật

- Visual storytelling cho sản phẩm giáo dục.
- Cấu trúc landing page và hệ thống CTA.
- Motion hỗ trợ nhịp kể chuyện và cảm giác khám phá.
- Hệ thống nội dung hỗ trợ Markdown và bài viết.

### Thông tin kỹ thuật

- Next.js 16 và React 19.
- TypeScript.
- Tailwind CSS 4.
- Framer Motion.
- React Markdown, Remark GFM và Gray Matter.
- Lucide React.

### Trạng thái repository

- Public, không archived.
- Default branch: `main`.
- README chủ yếu là nội dung mặc định của `create-next-app`.

---

## 06. ThauPhim Web

**Repository:** [khanhnkq/khanhnkq-ThauPhim-FE-for-OPhim-API](https://github.com/khanhnkq/khanhnkq-ThauPhim-FE-for-OPhim-API)

### Mô tả ngắn

Website khám phá và xem phim sử dụng dữ liệu từ OPhim API. Giao diện tập trung vào trải nghiệm duyệt nội dung, tìm phim, xem thông tin chi tiết và phát video trực tuyến trên nhiều kích thước màn hình.

### Showcase copy

> A cinematic streaming interface powered by OPhim API, designed for fluid discovery and uninterrupted viewing across devices.

### Điểm nên làm nổi bật

- Trải nghiệm khám phá phim theo danh mục và nội dung nổi bật.
- Information hierarchy cho poster, metadata và thông tin tập phim.
- Trình phát video hỗ trợ nội dung HLS.
- Motion và loading feedback giúp quá trình chuyển trang liền mạch.
- Responsive layout dành cho desktop, tablet và mobile.

### Thông tin kỹ thuật

- Next.js 16 và React 19.
- TypeScript.
- Tailwind CSS 4.
- Axios cho kết nối API.
- HLS.js cho phát video streaming.
- Framer Motion.
- Next.js TopLoader và Lucide React.

### Trạng thái repository

- Public, không archived.
- Default branch: `main`.
- README xác định đây là dự án phục vụ mục đích học tập và nghiên cứu.

---

## 07. ThauPhim Mobile

**Repository:** [khanhnkq/thauphim-mobileUI-react-native](https://github.com/khanhnkq/thauphim-mobileUI-react-native)

### Mô tả ngắn

Phiên bản mobile của ThauPhim, chuyển trải nghiệm khám phá và xem phim sang giao diện React Native tối ưu cho thao tác cảm ứng, màn hình nhỏ và thói quen sử dụng nội dung trên thiết bị di động.

### Showcase copy

> A mobile streaming experience that brings ThauPhim’s cinematic identity to fast, touch-first content discovery and viewing.

### Điểm nên làm nổi bật

- Điều hướng mobile bằng Expo Router.
- Trải nghiệm duyệt phim và xem chi tiết bằng thao tác cảm ứng.
- Lưu trữ dữ liệu và trạng thái truy vấn để hỗ trợ trải nghiệm liên tục.
- Hỗ trợ xoay màn hình cho trải nghiệm xem video.
- Motion, splash screen và typography tạo nhận diện riêng cho sản phẩm.

### Thông tin kỹ thuật

- Expo 55 và React Native 0.83.
- React 19 và TypeScript.
- Expo Router.
- TanStack React Query và query persistence.
- Zustand và Async Storage.
- NativeWind.
- React Native Reanimated.
- Axios, WebView và Expo Screen Orientation.

### Trạng thái repository

- Public, không archived.
- Default branch: `main`.
- README hiện chỉ có tiêu đề dự án.

---

## Gợi ý cấu trúc card showcase

Mỗi card có thể dùng cùng một schema:

```ts
type ShowcaseProject = {
  name: string;
  category: string;
  summary: string;
  highlights: string[];
  technologies: string[];
  repositoryUrl: string;
  previewImage?: string;
  liveUrl?: string;
};
```

Thứ tự nội dung đề xuất trên card:

1. Ảnh preview hoặc video ngắn.
2. Tên dự án và loại sản phẩm.
3. Một câu mô tả giá trị chính.
4. Hai đến ba điểm nổi bật về thiết kế/trải nghiệm.
5. Nhóm công nghệ chính.
6. Liên kết xem case study, live demo và GitHub.

## Việc nên bổ sung trước khi đưa lên portfolio

- Viết README riêng cho từng dự án thay cho nội dung khởi tạo mặc định.
- Thêm live URL vào repository metadata nếu dự án đã deploy.
- Chuẩn bị một ảnh cover có cùng tỉ lệ cho tất cả dự án.
- Với mỗi dự án, bổ sung vai trò, thời gian thực hiện và phạm vi công việc.
- Ghi rõ phần nào do cá nhân thực hiện và phần nào có sự cộng tác.
- Chọn một kết quả hoặc bài học cụ thể để biến showcase thành case study, thay vì chỉ liệt kê tính năng.
