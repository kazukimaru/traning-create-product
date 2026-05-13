import type { Restaurant, Review } from "../types";

export const DUMMY_RESTAURANTS: Restaurant[] = [
  {
    id: 1,
    name: "L'Étoile Brasserie",
    area: "東京・銀座・新橋",
    genre: "フレンチ",
    phoneNumber: "03-1234-5678",
    isSmoke: "完全禁煙",
    isCourse: "有",
    isAycd: "無",
    maxPastPeople: 12,
    budget: 15000,
    scenes: ["社外新規顧客との会食", "社外既存顧客との会食"],
    department: "XCI",
    rateAverage: 4.8,
    reviews: [
      {
        id: 101,
        userName: "t.yamada@example.com",
        company: "Executive Board",
        reviewBody: "素晴らしい体験でした。接待に最適です。",
        rate: 5,
        numberOfPeople: 4,
        reviewTime: "2026-05-10T19:30:00",
        parentId: null,
        replies: []
      }
    ]
  },
  {
    id: 2,
    name: "神楽伝統和食",
    area: "その他",
    genre: "和食",
    phoneNumber: "03-8765-4321",
    isSmoke: "完全禁煙",
    isCourse: "有",
    isAycd: "有",
    maxPastPeople: 24,
    budget: 8000,
    scenes: ["社内", "社外既存顧客との会食"],
    department: "SXI",
    rateAverage: 4.5,
    reviews: []
  },
  {
    id: 3,
    name: "焼肉 Simplex",
    area: "赤坂・六本木・麻布",
    genre: "焼肉・ステーキ",
    phoneNumber: "03-5555-6666",
    isSmoke: "喫煙専用室あり",
    isCourse: "無",
    isAycd: "無",
    maxPastPeople: 40,
    budget: 12000,
    scenes: ["社内"],
    department: "SHI",
    rateAverage: 4.9,
    reviews: []
  },
  {
    id: 4,
    name: "カフェ ド アンブル",
    area: "渋谷・目黒・恵比寿",
    genre: "カフェ・スイーツ",
    phoneNumber: "03-1111-2222",
    isSmoke: "完全禁煙",
    isCourse: "無",
    isAycd: "無",
    maxPastPeople: 4,
    budget: 2000,
    scenes: ["社内"],
    department: "XCI",
    rateAverage: 4.2,
    reviews: []
  }
];

export async function getRestaurants(): Promise<Restaurant[]> {
  return Promise.resolve(DUMMY_RESTAURANTS);
}

export async function getRestaurant(id: string): Promise<Restaurant | null> {
  const restaurant = DUMMY_RESTAURANTS.find(r => r.id.toString() === id);
  return Promise.resolve(restaurant || null);
}

export async function getUserCompany(email: string): Promise<string | null> {
  if (email.includes("yamada")) return Promise.resolve("Executive Board");
  if (email.includes("sato")) return Promise.resolve("Sales Dept");
  return Promise.resolve(null);
}

export async function postReview(data: any): Promise<void> {
  const restaurant = DUMMY_RESTAURANTS.find(r => r.id === data.restaurantId);
  if (!restaurant) return Promise.resolve();

  const newReview: Review = {
    id: Math.floor(Math.random() * 10000) + 1000,
    userName: data.email,
    company: data.company || "Unknown",
    projectName: data.projectName || undefined,
    reviewBody: data.content,
    rate: data.rate || 0,
    numberOfPeople: data.numberOfPeople || 0,
    reviewTime: new Date().toISOString(),
    parentId: data.parentId || null,
    replies: []
  };

  if (data.parentId) {
    const parent = restaurant.reviews?.find(r => r.id === data.parentId);
    if (parent) {
      parent.replies.push(newReview);
    }
  } else {
    restaurant.reviews?.push(newReview);
  }

  return Promise.resolve();
}
