import axios from "axios";

export const userStatus = async () => {
  try {
    const response = await axios.get(
      "https://stage.api.sanaap.co/api/v2/app/DEY/agent/app_user_status/"
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
