import axios from "axios";

type checkAgencyCodeResponse = {
  status_code: number;
  message: string;
  is_success: boolean;
  error_details: null;
  response: string;
};

export const checkAgencyCode = async (data:checkAgencyCodeResponse) => {
  const response = await axios.post(
    "https://stage.api.sanaap.co/api/v2/app/DEY/agent/verification/signup/check_agency_code/",
    data
  );
  return response.data;
};
