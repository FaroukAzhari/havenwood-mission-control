const SESSION_KEY = "last-outpost-session";

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

export function setSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function isLeaderSession() {
  return getSession()?.role === "leader";
}

export function isRoverSession() {
  return getSession()?.role === "rover";
}
