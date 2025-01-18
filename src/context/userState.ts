export type userState = {
  phoneNumber: string;
  firstName: string;
  lastName: string;
  agentCode: string;
};

export const InitialUserState = {
  phoneNumber: "",
  firstName: "",
  lastName: "",
  agentCode: "",
};

export type IactionOfUser =
  | {
      type: "SET-PHONE-NUMBER";
      payload: string;
    }
  | {
      type: "SET-FIRST-NAME";
      payload: string;
    }
  | {
      type: "SET-LAST-NAME";
      payload: string;
    }
  | {
      type: "SET-AGENT-CODE";
      payload: string;
    };

export const createUserReducer = (state: userState, action: IactionOfUser) => {
  switch (action.type) {
    case "SET-PHONE-NUMBER":
      return { ...state, phoneNumber: action.payload };
    case "SET-FIRST-NAME":
      return { ...state, firstName: action.payload };
    case "SET-LAST-NAME":
      return { ...state, lastName: action.payload };
    case "SET-AGENT-CODE":
      return { ...state, agentCode: action.payload };
    default:
      return { ...state };
  }
};
