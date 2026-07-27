import api from "./api";

export const getSearchOptions = async () => {
  const response = await api.get("/search/options");
  return response.data;
};