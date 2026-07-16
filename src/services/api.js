const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || `Request failed: ${res.status}`);
  }
  return res.json();
}

export async function runSimulation({ message, noise, eve }) {
  return request("/simulate", {
    method: "POST",
    body: JSON.stringify({ message, noise_level: noise, eve_enabled: eve }),
  });
}

export async function resetSession() {
  return request("/reset", { method: "POST" });
}

export async function getSessionHistory() {
  return request("/history");
}