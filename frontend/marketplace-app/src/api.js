const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function getAuthToken() {
  const token = localStorage.getItem("token");
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

export async function apiGet(path) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      ...getAuthToken(),
    },
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export async function apiDelete(path) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "DELETE",
    headers: {
      ...getAuthToken(),
    },
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data;
}

export async function apiPost(path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthToken() },
    body: JSON.stringify(body),
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data;
}

export async function apiPatch(path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...getAuthToken() },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}
