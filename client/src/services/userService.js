import api from "./api";

// Get all users
export const getAllUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

// Get user by ID
export const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

// Activate / Deactivate user
export const toggleUserStatus = async (id) => {
  const response = await api.patch(`/users/${id}/status`);
  return response.data;
};