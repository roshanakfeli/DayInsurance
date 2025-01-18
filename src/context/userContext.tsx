import { createContext } from "react";
import { useReducer } from "react";
import {
  createUserReducer,
  IactionOfUser,
  InitialUserState,
  userState,
} from "./userState";

interface IProps {
  children: JSX.Element;
}

export type Idispatch = {
  dispatch: (arg: IactionOfUser) => void;
};

export const userContext = createContext<userState & Idispatch>({
  phoneNumber: "",
  firstName: "",
  lastName: "",
  dispatch: () => {},
});

function UserProvider({ children }: IProps) {
  const [{ phoneNumber, firstName, lastName }, dispatch] = useReducer(
    createUserReducer,
    InitialUserState
  );

  return (
    <userContext.Provider
      value={{ phoneNumber, firstName, lastName, dispatch }}
    >
      {children}
    </userContext.Provider>
  );
}

export default UserProvider;
