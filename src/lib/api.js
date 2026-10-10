
const BASE_URL = "https://api.abcz.workers.dev/api/bazardor";

async function fetchData(url, errorMessage) {
  let response;

  try {
    response = await fetch(url);
  } catch {
    throw new Error(
      "API সার্ভারে সংযোগ করা যাচ্ছে না। ইন্টারনেট ও API URL পরীক্ষা করো।"
    );
  }

  if (!response.ok) {
    throw new Error(errorMessage);
  }

  return response.json();
}

export async function getProducts(category) {
  const url = category
    ? `${BASE_URL}/products?category=${encodeURIComponent(category)}`
    : `${BASE_URL}/products`;

  return fetchData(url, "পণ্যের তথ্য আনা যায়নি");
}

export async function getProduct(id) {
  return fetchData(
    `${BASE_URL}/products/${encodeURIComponent(id)}`,
    "পণ্য পাওয়া যায়নি"
  );
}

export async function getCategories() {
  return fetchData(
    `${BASE_URL}/categories`,
    "ক্যাটাগরির তথ্য আনা যায়নি"
  );
}
