import axios from "axios";

type CreateOtpResponse = {
  status_code: number;
  message: string;
  is_success: boolean;
  error_details: null;
  response: string;
};

export const createOtp = async (data:CreateOtpResponse) => {
  const response = await axios.post(
    "https://stage.api.sanaap.co/api/v2/app/DEY/agent/verification/signup/create_otp/",
    data
  );
  return response.data;
};
