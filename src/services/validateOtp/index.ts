import axios from "axios";

type ValidateOtpResponseModel = {
  status_code: number;
  message: string;
  is_success: boolean;
  error_details: null;
  response: string;
};

export const validateOtp = async (data: {
  phone_number: string;
  code: number;
}): Promise<ValidateOtpResponseModel> => {
  try {
    const response = await axios.post<ValidateOtpResponseModel>(
      "https://stage.api.sanaap.co/api/v2/app/DEY/agent/verification/signup/validate_otp/",
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
