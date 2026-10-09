
const BASE_URL = "https://api.api-store.workers.dev/api/bazardor";

export async function getProducts(category) {
  const url = category
    ? `${BASE_URL}/products?category=${category}`
    : `${BASE_URL}/products`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("পণ্যের তথ্য আনা যায়নি");
  }

  return response.json();
}

export async function getProduct(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error("পণ্য পাওয়া যায়নি");
  }

  return response.json();
}

export async function getCategories() {
  const response = await fetch(`${BASE_URL}/categories`);

  if (!response.ok) {
    throw new Error("ক্যাটাগরির তথ্য আনা যায়নি");
  }

  return response.json();
}
