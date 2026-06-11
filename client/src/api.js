const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {})
    },
    ...options
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.message || "Request failed.");
  }

  return payload;
}

export const api = {
  getPublicSettings() {
    return request("/settings/public");
  },
  leaderLogin(username, password) {
    return request("/auth/leader", {
      method: "POST",
      body: JSON.stringify({ username, password })
    });
  },
  roverSignup(body) {
    return request("/rovers/signup", {
      method: "POST",
      body: JSON.stringify(body)
    });
  },
  roverLogin(login, accessCode) {
    return request("/auth/rover", {
      method: "POST",
      body: JSON.stringify({ login, accessCode })
    });
  },
  getRovers() {
    return request("/rovers");
  },
  getRover(id) {
    return request(`/rovers/${id}`);
  },
  updateRoverAssignment(id, body) {
    return request(`/rovers/${id}/assignment`, {
      method: "PATCH",
      body: JSON.stringify(body)
    });
  },
  getFactions() {
    return request("/factions");
  },
  getRoles() {
    return request("/roles");
  },
  getEvaluations() {
    return request("/evaluations");
  },
  saveEvaluation(body) {
    return request("/evaluations", {
      method: "POST",
      body: JSON.stringify(body)
    });
  },
  getMissions() {
    return request("/missions");
  },
  getMission(id) {
    return request(`/missions/${id}`);
  },
  getReports() {
    return request("/reports");
  }
};
