import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

// Feedback APIs
export const saveFeedback = (data) => api.post("/save", data);
export const getFeedbacks = () => api.get("/getdata");
export const deleteFeedback = (data) => api.delete("/delete", { data }); 

// Admin APIs
export const adminLogin = (data) => api.post("/admin_login",data);

// User APIs
export const loginUser = (data) => api.post("/login", data);  
export const signUpUser = (data) => api.post("/user_save", data);

export default api;
