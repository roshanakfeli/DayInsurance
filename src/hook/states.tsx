import { useQuery } from "react-query";
import axios from "axios";

const PROVINCES_API_URL = "https://iran-locations-api.ir/api/v1/fa/states";

const fetchProvinces = async () => {
  const response = await axios.get(PROVINCES_API_URL);
  return response.data;
};

export const useProvinces = () => {
  return useQuery("iranStates", fetchProvinces);
};

const CITIES_API_URL = "https://iran-locations-api.ir/api/v1/fa/cities";

const fetchCities = async (stateId: string | number) => {
  const response = await axios.get(`${CITIES_API_URL}?state_id=${stateId}`);
  return response.data;
};

export const useCities = (stateId: string | number) => {
  return useQuery(["iranCities", stateId], () => fetchCities(stateId), {
    enabled: !!stateId, // Fetch only if stateId is provided
  });
};
