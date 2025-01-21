import axios from "axios";

type CreateOtpResponseModel = {
  status_code: number;
  message: string;
  is_success: boolean;
  error_details: null;
  response: string;
};

export const createOtp = async (data: {
  phone_number: string;
}): Promise<CreateOtpResponseModel> => {
  try {
    const response = await axios.post<CreateOtpResponseModel>(
      "https://stage.api.sanaap.co/api/v2/app/DEY/agent/verification/signup/create_otp/",
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
