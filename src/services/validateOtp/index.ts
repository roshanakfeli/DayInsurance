import axios from "axios";

type validateOtpResponse = {
  status_code: number;
  message: string;
  is_success: boolean;
  error_details: null;
  response: string;
};

export const validateOtp = async (data: validateOtpResponse) => {
  const response = await axios.post(
    "https://stage.api.sanaap.co/api/v2/app/DEY/agent/verification/signup/validate_otp/",
    data
  );
  return response.data;
};
