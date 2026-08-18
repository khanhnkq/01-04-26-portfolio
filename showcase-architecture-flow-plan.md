# Showcase Architecture & Request Flow

## Goal
Thêm một panel kiến trúc có thể mở rộng cho từng project trong `/showcase`, minh họa request → xử lý → response/event bằng animation đồng bộ với visual notebook/brutalist hiện tại.

## Visual direction
- Mỗi project là một pinned horizontal chapter gồm `Project overview → Architect`; hết Architect mới tiếp tục cuộn dọc tới project sau.
- Desktop dùng Architect track có chiều ngang tăng theo số node; mobile chuyển thành timeline dọc.
- Node: giấy trắng viền xanh; node đang chạy đổi vàng và nhấc lên bằng hard shadow. Request là nét xanh liền, async/event là nét đứt, response chạy ngược bằng nét vàng.
- Khi mở panel: vẽ path → packet chạy qua node → node pulse → response quay về. Có `Replay flow`; reduced-motion hiển thị trạng thái cuối và danh sách bước tĩnh.

## Source-verified project flow map
| Project | Verified topology | Animated flow grounded in repo |
|---|---|---|
| QuizKen | Pending source access | Public `quizken-landing` is a Next.js 16 content/SEO site; public `quizken-supabase` has no source tree. Do not visualize Supabase/SEPAY application flow until the core app repo is available. |
| ThauPhim | Direct external API + media player | Web Next.js or React Native client → Axios movie service → `ophim1.com` list/search/detail endpoint → normalize image URLs/pagination → UI; selected `.m3u8` episode → Hls.js worker → video element, with native-source fallback. |
| ConnectCG | REST + external services + realtime | React Axios client adds JWT → Spring Security/controller/service → JPA database. Representative post flow: create post → Gemini moderation → persist status/media metadata → STOMP event to clients; media uses MinIO. Chat is a separate E2EE flow: client writes encrypted payload to Firebase, backend updates room metadata, STOMP updates unread/typing/seen state. No Kafka node: current source does not contain Kafka. |
| Danang's Egov | Pending source access | No matching public repo or homepage metadata was found under the account. Do not visualize Spring/VNPay/WebSocket as source-confirmed until repo access is supplied. |
| WonderKids | Direct client-to-AI | AI chat/quiz UI → client-side Gemini SDK (`gemini-1.5-flash`) using Vite/custom API key → text or raw-JSON response → chat/quiz state → UI; fallback question/error copy is returned locally on failure. |
| HyperMatch | Concept full-stack recommendation architecture | Eight-step onboarding + optional workspace photo → React client → recommendation API → profile/image preprocessing → AI recommendation + rule-based budget scoring → HyperWork/Shopify catalog adapter → ranked workspace setup → selected products and outbound purchase links. Current FE provides the interaction contract; backend nodes are an intentional target architecture. |
| Flotie | Concept commerce architecture | React storefront → commerce API → catalog/inventory service → product database; add-to-cart → cart/session service; checkout → order service → payment gateway → inventory update → order confirmation. Current FE provides routes/product shapes; backend nodes are an intentional target architecture. |
| DocCleaner | MV3 page-transformation pipeline | Matching Studocu/Scribd navigation → service worker navigation/tab listeners and cookie cleanup → document-end content script → domain-specific DOM cleanup + page preload + print CSS → `window.print()` → browser Save-as-PDF dialog. |
| Pinoria | MV3 message + download/mux pipeline | Pinterest content script scans pin/board → runtime message → service worker validates sender and resolves best media → direct asset uses `chrome.downloads`; split HLS video/audio creates offscreen document → MediaBunny conversion/mux queue → object URL → `chrome.downloads` → local file; settings remain in `chrome.storage.local`. |

## Evidence policy
- Architecture labels must cite a concrete repo file/README; tags in `projects.ts` are presentation metadata, not architecture authority.
- QuizKen and Danang's Egov display a concise `Private architecture` state rather than inferred infrastructure.
- HyperMatch and Flotie explicitly use `Concept architecture`: their FE repos ground the user journey, while backend services describe the intended production design rather than existing source.
- ConnectCG uses two selectable stories (`Post + AI moderation`, `E2EE chat`) because collapsing both into one path would be misleading.

## Repo evidence
- QuizKen: [`quizken-landing`](https://github.com/khanhnkq/quizken-landing); `quizken-supabase` currently exposes no source tree.
- ThauPhim: [`movie.service.ts`](https://github.com/khanhnkq/khanhnkq-ThauPhim-FE-for-OPhim-API/blob/main/src/services/endpoints/movie.service.ts), [`useHls.ts`](https://github.com/khanhnkq/khanhnkq-ThauPhim-FE-for-OPhim-API/blob/main/src/hooks/useHls.ts), and [mobile service](https://github.com/khanhnkq/thauphim-mobileUI-react-native/blob/main/services/endpoints/movies.service.ts).
- ConnectCG: [backend business flows](https://github.com/khanhnkq/connectCG./blob/main/BUSINESS_SERVICE_FLOWS.md), [Axios/JWT client](https://github.com/khanhnkq/connectCG/blob/main/src/config/axiosConfig.js), and [STOMP client](https://github.com/khanhnkq/connectCG/blob/main/src/context/WebSocketContext.jsx).
- WonderKids: [`services/gemini.ts`](https://github.com/khanhnkq/wonderkids/blob/main/services/gemini.ts).
- HyperMatch: [`App.tsx`](https://github.com/khanhnkq/HyperMatch/blob/main/src/App.tsx), [`OnboardingFlow.tsx`](https://github.com/khanhnkq/HyperMatch/blob/main/src/components/OnboardingFlow.tsx), and [`WorkspaceResult.tsx`](https://github.com/khanhnkq/HyperMatch/blob/main/src/components/WorkspaceResult.tsx).
- Flotie: [`router.tsx`](https://github.com/khanhnkq/Flotie-landing/blob/main/src/router.tsx) and [`products.ts`](https://github.com/khanhnkq/Flotie-landing/blob/main/src/data/products.ts).
- DocCleaner: [`manifest.json`](https://github.com/khanhnkq/DocCleaner/blob/main/manifest.json), [`background.js`](https://github.com/khanhnkq/DocCleaner/blob/main/background.js), and [`content.js`](https://github.com/khanhnkq/DocCleaner/blob/main/content.js).
- Pinoria: [`manifest.config.ts`](https://github.com/khanhnkq/Pinoria/blob/main/manifest.config.ts), [`quick-download.ts`](https://github.com/khanhnkq/Pinoria/blob/main/src/background/quick-download.ts), and [`offscreen.ts`](https://github.com/khanhnkq/Pinoria/blob/main/src/offscreen/offscreen.ts).

## Tasks
- [x] Mở rộng `ProjectType` trong `src/data/projects.ts` với evidence, source, scenario, node và step có type rõ ràng.
- [x] Tạo `ArchitectureFlow.tsx` dùng chung cho request, response, event và local handoff của cả 9 project.
- [x] Tạo Framer Motion sequence cho connector, packet và node pulse; `Replay flow` reset sequence bằng replay key.
- [x] Hiển thị Architect mặc định và ghép project overview + Architect thành một horizontal chapter bằng GSAP ScrollTrigger.
- [x] Thêm style theo palette `#238CFF / #FFE06B / #FFF9EF`, hard-shadow và graph-paper.
- [x] Cho Architect track giãn theo số node; desktop scrub ngang, dưới 1400px dùng timeline dọc không overflow.
- [x] Thêm semantic button/tab, `aria-expanded`, `aria-controls`, source link và `prefers-reduced-motion`.
- [x] Gắn badge; HyperMatch/Flotie là `Concept architecture`, QuizKen/Egov dùng trạng thái `Private architecture`.
- [x] Chạy TypeScript, scoped ESLint và Vitest: 16/16 tests pass; local `/showcase` trả HTTP 200.

## Done when
- [x] Năm project có source-confirmed diagram, HyperMatch/Flotie có target full-stack diagram, QuizKen/Egov có private state; mọi flow replay được, accessible và không tạo data file ngoài `projects.ts`.
