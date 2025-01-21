import axios from "axios";

type CheckAgencyCodeResponseModel = {
  status_code: number;
  message: string;
  is_success: boolean;
  error_details: null;
  response: string;
};

export const checkAgencyCode = async (data: {
  agent_code: string;
}): Promise<CheckAgencyCodeResponseModel> => {
  try {
    const response = await axios.post<CheckAgencyCodeResponseModel>(
      "https://stage.api.sanaap.co/api/v2/app/DEY/agent/verification/signup/check_agency_code/",
      data
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
