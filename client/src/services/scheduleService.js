import api from "./api";

// Get all schedules
export const getAllSchedules = async () => {
  const response = await api.get("/schedules");
  return response.data;
};

// Get schedule by ID
export const getScheduleById = async (id) => {
  const response = await api.get(`/schedules/${id}`);
  return response.data;
};

// Create schedule
export const createSchedule = async (data) => {
  const response = await api.post("/schedules", data);
  return response.data;
};

// Update schedule
export const updateSchedule = async (id, data) => {
  const response = await api.put(`/schedules/${id}`, data);
  return response.data;
};

// Delete schedule
export const deleteSchedule = async (id) => {
  const response = await api.delete(`/schedules/${id}`);
  return response.data;
};