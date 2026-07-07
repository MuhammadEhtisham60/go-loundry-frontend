export const setToken = (access: string, refresh: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
  }
};

export const getToken = (): { access: string | null; refresh: string | null } => {
  if (typeof window !== "undefined") {
    return {
      access: localStorage.getItem("access"),
      refresh: localStorage.getItem("refresh"),
    };
  }
  return { access: null, refresh: null };
};

export const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  }
};

export const setUser = (user: unknown) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

export const getUser = (): unknown => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    try {
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  }
  return null;
};

export const removeUser = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
};

export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return true;

    // Decode Base64URL payload
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );

    const payload = JSON.parse(jsonPayload);
    if (!payload.exp) return false;

    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  } catch (error) {
    return true; // If decoding fails, treat it as expired/invalid
  }
};
