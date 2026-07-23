import api from "./api";

export const getScheduleById = async (id) => {
  const response = await api.get(`/schedules/${id}`);
  return response.data;
};