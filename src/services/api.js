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

export async function runSimulation({
  noise,
  eve,
  num_photons,
  message
})  {

  return request("/simulate",{

    method:"POST",

    body:JSON.stringify({

      noise,

      eve,

      num_photons,
      
      message

    })

  });

}

export async function resetSession() {
  return request("/reset", { method: "POST" });
}

export async function getSessionHistory() {
  return request("/history");
}

export async function encryptMessage(message, key) {

  return request("/encrypt", {

    method:"POST",

    body:JSON.stringify({
      message,
      key
    })

  });

}