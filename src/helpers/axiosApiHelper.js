import axios from "axios";

const api = axios.create({
  //  baseURL: "http://localhost:5000/api",
  baseURL: "https://thonia-foods-server.onrender.com",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

// Then just call api.post("/auth/register", {...}).

// Handle expired tokens gracefully: If you get a 401 or 403, you can redirect the user to login or refresh the token.

// Avoid storing sensitive data in localStorage: For production apps, consider using httpOnly cookies for better security against XSS attacks.
