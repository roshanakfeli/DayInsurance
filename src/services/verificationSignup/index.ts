import axios from "axios";
import { useMutation } from "react-query";

export type VerificationSignupResponseModel = {
  message: string;
  status_code: number;
  is_success: boolean;
  error_details: null | string;
  response: {
    refresh: string;
    access: number;
  };
};

export const verificationSignup = async (data: {
  address: string;
  agency_type: string;
  agent_code: string;
  city_code: string;
  county: string;
  first_name: string;
  insurance_branch: string;
  last_name: string;
  phone: string;
  phone_number: string;
  province: string;
  Name: string;
}): Promise<VerificationSignupResponseModel> => {
  try {
    const response = await axios.post<VerificationSignupResponseModel>(
      `https://stage.api.sanaap.co/api/v2/app/DEY/agent/verification/signup/`,
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

export const useSignupAgent = () => {
  return useMutation(verificationSignup);
};
