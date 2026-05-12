const API_BASE = "http://localhost:8080/api";

export async function getRestaurants() {
  const res = await fetch(`${API_BASE}/restaurants`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export async function getRestaurant(id: string) {
  const res = await fetch(`${API_BASE}/restaurants/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export async function getUserCompany(email: string) {
  const res = await fetch(`${API_BASE}/users/${email}/company`);
  if (!res.ok) return null;
  return res.text();
}

export async function postReview(data: any) {
  const res = await fetch(`${API_BASE}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to post review");
}
