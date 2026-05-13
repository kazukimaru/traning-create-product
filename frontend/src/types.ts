// レストランデータの型定義
export interface Restaurant {
  id: number;
  name: string;
  area: string;
  genre: string;
  phoneNumber: string;
  isSmoke: string; // "完全禁煙" | "喫煙専用室あり" | "加熱式たばこ限定" | "全面喫煙可" など
  isCourse: string; // "有" | "無" | "不明"
  isAycd: string; // "有" | "無" | "不明"
  maxPastPeople: number; // 過去の最大利用人数
  budget: number; // 予算
  scenes: string[]; // "社外新規顧客との会食" | "社外既存顧客との会食" | "社内"
  department: string; // "XCI" | "SXI" | "SHI"
  rateAverage: number;
  reviews?: Review[];
}

// フィルター条件の型定義
export interface FilterConditions {
  area: string; // "指定なし" もしくは各エリア
  scene: string; // "指定なし" もしくは各シーン
  genre: string; // "指定なし" もしくは各ジャンル
  budget: string; // "指定なし" もしくは "3000" (〜3000), "3001-5000", "20001" (20001〜) など
  peopleCount: string; // "指定なし" もしくは数値（1〜99）
  department: string; // "指定なし" もしくは "XCI", "SXI", "SHI"
  smoking: string; // "指定なし" もしくは各喫煙条件
  aycd: string; // "指定なし" もしくは "有", "無", "不明"
  course: string; // "指定なし" もしくは "有", "無", "不明"
}

// レビューの型定義
export interface Review {
  id: number;
  userName: string;
  company: string;
  projectName?: string;
  reviewBody: string;
  rate: number;
  numberOfPeople: number;
  reviewTime: string;
  parentId: number | null;
  replies: Review[];
}
