import axios from "axios";

export type FetchProvincesResponseModel = {
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

export const fetchProvinces = async (): Promise<
  FetchProvincesResponseModel[]
> => {
  try {
    const response = await axios.get<FetchProvincesResponseModel[]>(
      "https://stage.api.sanaap.co/base/provinces_wop/"
    );
    return response.data;
  } catch (error: {
    response: {
      data: {
        status_code: number;
        message: string;
        error_details: { fa_details: string };
        is_success: boolean;
      };
    };
  }) {
    throw error.response ? error.response.data : error;
  }
};

export const fetchCounties = async (
  province: number
): Promise<FetchProvincesResponseModel[]> => {
  try {
    const response = await axios.get<FetchProvincesResponseModel[]>(
      `https://stage.api.sanaap.co/base/counties_wop/`,
      {
        params: { province },
      }
    );
    return response.data;
  } catch (error: {
    response: {
      data: {
        status_code: number;
        message: string;
        error_details: { fa_details: string };
        is_success: boolean;
      };
    };
  }) {
    throw error.response ? error.response.data : error;
  }
};
