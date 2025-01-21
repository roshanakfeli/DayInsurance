import MainTemplate from "./components/templates/mainTemplate";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import OtpPage from "./pages/otpPage";
import UserInfo from "./pages/userInfo";
import InsurancePage from "./pages/insurancePage";

import "antd/dist/reset.css";
import "./assets/css/index.css";
import UserState from "./pages/userStatePage";

function App() {
  return (
    <Routes>
      <Route path="/userState" element={<UserState />} />

      <Route
        path="/*"
        element={
          <MainTemplate
            children={
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/otpPage" element={<OtpPage />} />
                <Route path="/userInfo" element={<UserInfo />} />
                <Route path="/insurancePage" element={<InsurancePage />} />
              </Routes>
            }
          />
        }
      />
    </Routes>
  );
}

export default App;
