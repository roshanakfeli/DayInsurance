import "./assets/css/index.css";
import MainTemplate from "./components/templates/mainTemplate";
import "antd/dist/reset.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import OtpPage from "./pages/otpPage";
import UserInfo from "./pages/userInfo";
import InsurancePage from "./pages/insurancePage";

function App() {
  return (
    <div className="">
      <MainTemplate
        children={
          <>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/otpPage" element={<OtpPage />} />
              <Route path="/userInfo" element={<UserInfo />} />
              <Route path="/insurancePage" element={<InsurancePage />} />
            </Routes>
          </>
        }
      />
    </div>
  );
}

export default App;
