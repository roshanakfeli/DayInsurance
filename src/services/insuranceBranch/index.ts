import axios from "axios";

export type FetchInsuranceBranchResponseModel = {
  message: string;
  status_code: number;
  is_success: boolean;
  error_details: null | string;
  response: {
    id: number;
    name: string;
    insurance: number;
    province: number;
    county: number;
  }[];
};

export const fetchInsuranceBranch = async (
  name: number,
  insurance: unknown,
  province: number
): Promise<FetchInsuranceBranchResponseModel> => {
  try {
    const response = await axios.get<FetchInsuranceBranchResponseModel>(
      `https://stage.api.sanaap.co/api/v2/app/selection_item/insurance_branch/wop_list/`,
      {
        params: { name, insurance, province }, // Add the `province` as a query parameter
      }
    );
    return response.data;
  } catch (error) {
    // Handle error appropriately
    throw new Error(
      `Error fetching insurance branch: ${
        axios.isAxiosError(error) ? error.message : "Unknown error"
      }`
    );
  }
};
