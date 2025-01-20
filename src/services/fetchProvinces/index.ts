import axios from "axios";

export type FetchProvincesResponse = {
  code: string;
  country: number;
  id: number;
  is_active: true;
  name: string;
  name_split: string;
  creator_user: {
    first_name: string;
    id: number;
    last_name: string;
    username: string;
  };
};

export const fetchProvinces = async (): Promise<FetchProvincesResponse[]> => {
  try {
    const response = await axios.get<FetchProvincesResponse[]>(
      "https://stage.api.sanaap.co/base/provinces_wop/"
    );
    return response.data;
  } catch (error) {
    // Optionally, handle the error (e.g., log or rethrow)
    throw new Error(
      `Error fetching provinces: ${
        axios.isAxiosError(error) ? error.message : "Unknown error"
      }`
    );
  }
};

export const fetchCounties = async (
  province: number
): Promise<FetchProvincesResponse[]> => {
  try {
    const response = await axios.get<FetchProvincesResponse[]>(
      `https://stage.api.sanaap.co/base/counties_wop/`,
      {
        params: { province }, // Add the `province` as a query parameter
      }
    );
    return response.data;
  } catch (error) {
    // Handle error appropriately
    throw new Error(
      `Error fetching counties: ${
        axios.isAxiosError(error) ? error.message : "Unknown error"
      }`
    );
  }
};
