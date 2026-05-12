// const API_BASE = "http://localhost:8080/api";

const DUMMY_RESTAURANTS = [
  {
    id: 1,
    name: "L'Étoile Brasserie",
    area: "Ginza",
    genre: "French",
    phoneNumber: "03-1234-5678",
    isSmoke: false,
    isCourse: true,
    isAycd: false,
    maxPeople: 12,
    rateAverage: 4.8,
    reviews: [
      {
        id: 101,
        userName: "t.yamada@example.com",
        company: "Executive Board",
        reviewBody: "An absolutely exquisite dining experience. The ambiance is perfectly suited for executive dinners. The wine pairing was exceptional.",
        rate: 5,
        numberOfPeople: 4,
        reviewTime: "2026-05-10T19:30:00",
        parentId: null,
        replies: [
          {
            id: 102,
            userName: "s.sato@example.com",
            company: "Sales Dept",
            reviewBody: "I completely agree! I took a client here last week and they were thoroughly impressed.",
            rate: 0,
            numberOfPeople: 0,
            reviewTime: "2026-05-11T10:15:00",
            parentId: 101,
            replies: []
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Kagura Traditional",
    area: "Kagurazaka",
    genre: "Washoku",
    phoneNumber: "03-8765-4321",
    isSmoke: false,
    isCourse: true,
    isAycd: true,
    maxPeople: 24,
    rateAverage: 4.5,
    reviews: [
      {
        id: 201,
        userName: "k.tanaka@example.com",
        company: "Engineering",
        reviewBody: "Great place for team wrap-up parties. The private rooms offer a very relaxing and intimate atmosphere.",
        rate: 4,
        numberOfPeople: 10,
        reviewTime: "2026-05-08T20:00:00",
        parentId: null,
        replies: []
      }
    ]
  },
  {
    id: 3,
    name: "Café de l'Ambre",
    area: "Omotesando",
    genre: "Cafe & Lounge",
    phoneNumber: "03-5555-6666",
    isSmoke: false,
    isCourse: false,
    isAycd: false,
    maxPeople: 8,
    rateAverage: 4.9,
    reviews: []
  }
];

export async function getRestaurants() {
  // 実際のAPI通信はコメントアウト
  // const res = await fetch(`${API_BASE}/restaurants`, { cache: 'no-store' });
  // if (!res.ok) return [];
  // return res.json();
  
  // ダミーデータを即座に返す
  return Promise.resolve(DUMMY_RESTAURANTS.map(r => ({
    id: r.id,
    name: r.name,
    area: r.area,
    genre: r.genre,
    isSmoke: r.isSmoke,
    isCourse: r.isCourse,
    isAycd: r.isAycd,
    maxPeople: r.maxPeople,
    rateAverage: r.rateAverage
  })));
}

export async function getRestaurant(id: string) {
  // const res = await fetch(`${API_BASE}/restaurants/${id}`, { cache: 'no-store' });
  // if (!res.ok) return null;
  // return res.json();
  
  const restaurant = DUMMY_RESTAURANTS.find(r => r.id.toString() === id);
  return Promise.resolve(restaurant || null);
}

export async function getUserCompany(email: string) {
  // const res = await fetch(`${API_BASE}/users/${email}/company`);
  // if (!res.ok) return null;
  // return res.text();
  
  if (email.includes("yamada")) return Promise.resolve("Executive Board");
  if (email.includes("sato")) return Promise.resolve("Sales Dept");
  return Promise.resolve(null);
}

export async function postReview(data: any) {
  // const res = await fetch(`${API_BASE}/reviews`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(data),
  // });
  // if (!res.ok) throw new Error("Failed to post review");
  
  const restaurant = DUMMY_RESTAURANTS.find(r => r.id === data.restaurantId);
  if (!restaurant) return Promise.resolve();

  const newReview = {
    id: Math.floor(Math.random() * 10000) + 1000,
    userName: data.email,
    company: data.company || "Unknown",
    reviewBody: data.content,
    rate: data.rate || 0,
    numberOfPeople: data.numberOfPeople || 0,
    reviewTime: new Date().toISOString(),
    parentId: data.parentId || null,
    replies: []
  };

  if (data.parentId) {
    const parent = restaurant.reviews.find(r => r.id === data.parentId);
    if (parent) {
      parent.replies.push(newReview as any);
    }
  } else {
    restaurant.reviews.push(newReview as any);
  }

  return Promise.resolve();
}
