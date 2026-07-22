export interface CoffeePreset {
  count: number;
  label: string;
  amountVnd: number;
  amountUsd: number;
  icon: string;
  popular?: boolean;
}

export interface SupporterMessage {
  id: string;
  name: string;
  cups: number;
  amount: number;
  message: string;
  createdAt: string;
  avatarBg?: string;
}

export interface BankConfig {
  bankId: string; // E.g., 'MBBank', 'TCB', 'VCB', 'ACB', 'TPB'
  bankName: string;
  accountNo: string;
  accountName: string;
  template: 'compact2' | 'compact' | 'qr_only' | 'print';
}

export const BANK_CONFIG: BankConfig = {
  bankId: "MBBank",
  bankName: "MBBank",
  accountNo: "0703586224",
  accountName: "NGUYEN KIM QUOC KHANH",
  template: "compact2",
};

export const COFFEE_PRESETS: CoffeePreset[] = [
  { count: 1, label: "1 Coffee", amountVnd: 30000, amountUsd: 1.5, icon: "(^ ᴗ ^)" },
  { count: 3, label: "3 Coffees", amountVnd: 90000, amountUsd: 4.5, icon: "(♡ ‿ ♡)", popular: true },
  { count: 5, label: "5 Coffees", amountVnd: 150000, amountUsd: 7.5, icon: "(づ｡◕‿‿◕｡)づ" },
];

export const INITIAL_SUPPORTERS: SupporterMessage[] = [
  {
    id: "sup-1",
    name: "Tuấn Anh (Senior FE)",
    cups: 3,
    amount: 90000,
    message: "Giao diện đỉnh cao quá Khánh ơi! Tiếp tục phát huy nhé (づ｡◕‿‿◕｡)づ",
    createdAt: "2 giờ trước",
    avatarBg: "#FFE06B",
  },
  {
    id: "sup-2",
    name: "Minh Anh (UI/UX Designer)",
    cups: 5,
    amount: 150000,
    message: "Tone màu với hiệu ứng 3D mịn xịn xịn. Tặng Khánh 5 ly cà phê nạp năng lượng!",
    createdAt: "5 giờ trước",
    avatarBg: "#238CFF",
  },
  {
    id: "sup-3",
    name: "Hoàng Nam (Tech Lead)",
    cups: 5,
    amount: 150000,
    message: "Portfolio rất ấn tượng và chuyên nghiệp. Chúc em ngày càng bứt phá hơn nữa (♡ ‿ ♡)",
    createdAt: "Hôm qua",
    avatarBg: "#FFF9EF",
  },
  {
    id: "sup-4",
    name: "Trần Đức",
    cups: 2,
    amount: 60000,
    message: "Ủng hộ Khánh 2 ly cà phê nhé. Thiết kế retro window card nhìn mê quá!",
    createdAt: "1 ngày trước",
    avatarBg: "#FFE06B",
  },
  {
    id: "sup-5",
    name: "Thúy Hằng",
    cups: 3,
    amount: 90000,
    message: "Xịn đét luôn ạ! Chúc anh Khánh có thêm nhiều sản phẩm xuất sắc hơn nữa (^ ᴗ ^)",
    createdAt: "2 ngày trước",
    avatarBg: "#238CFF",
  },
  {
    id: "sup-6",
    name: "Bảo Long (Fullstack Dev)",
    cups: 10,
    amount: 300000,
    message: "Code sạch, UI đỉnh, trải nghiệm tương tác mượt mà. 10 ly cà phê cho người anh em!",
    createdAt: "2 ngày trước",
    avatarBg: "#FFF9EF",
  },
  {
    id: "sup-7",
    name: "Phương Thảo",
    cups: 3,
    amount: 90000,
    message: "Một chút caffeine tiếp thêm động lực cho Khánh tạo nên nhiều dự án tuyệt vời nhé (づ｡◕‿‿◕｡)づ",
    createdAt: "3 ngày trước",
    avatarBg: "#FFE06B",
  },
  {
    id: "sup-8",
    name: "Đăng Khoa",
    cups: 2,
    amount: 60000,
    message: "Thiết kế đậm chất riêng, animation quá êm! Cố lên nhé bạn ơi (♡ ‿ ♡)",
    createdAt: "4 ngày trước",
    avatarBg: "#238CFF",
  },
  {
    id: "sup-9",
    name: "Khánh Linh",
    cups: 1,
    amount: 30000,
    message: "Gửi Khánh chút năng lượng ngọt ngào cho ngày làm việc sáng tạo!",
    createdAt: "5 ngày trước",
    avatarBg: "#FFF9EF",
  },
  {
    id: "sup-10",
    name: "Một Người Bạn Thầm Lặng",
    cups: 5,
    amount: 150000,
    message: "Ủng hộ Khánh 5 ly cà phê nhé! Chúc đường sự nghiệp của bạn luôn rực rỡ (^ ᴗ ^)",
    createdAt: "1 tuần trước",
    avatarBg: "#FFE06B",
  },
];

/**
 * Tự động tạo URL VietQR tĩnh động theo số tiền và lời nhắn
 */
export function getVietQRUrl(amount: number, memo: string): string {
  const { bankId, accountNo, accountName, template } = BANK_CONFIG;
  const cleanMemo = memo.trim() ? memo : "Buy Me A Coffee";

  const params = new URLSearchParams({
    amount: amount.toString(),
    addInfo: cleanMemo,
    accountName: accountName,
  });

  return `https://img.vietqr.io/image/${bankId}-${accountNo}-${template}.png?${params.toString()}`;
}
