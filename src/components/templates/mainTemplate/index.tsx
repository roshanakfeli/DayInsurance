import { ArrowRight2 } from "iconsax-react";
import logo from "../../../assets/images/Group 48095662.svg";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  children?: ReactNode;
}

const MainTemplate = (props: IProps) => {
  const { children } = props;

  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-primaries-100 rounded-b-2xl items-center pt-8 flex flex-col h-52">
        <ArrowRight2 size={24} className="absolute text-white right-4" onClick={() => navigate(-1)}/>
        <img src={logo} alt="" className="w-[90px]" />
      </div>

      <div className=" flex justify-center items-center h-full"></div>

      <div className="absolute inset-0 flex justify-center shadow-custom-shadow top-24 mx-6 h-fit">
        <div className="bg-white shadow-custom-shadow rounded-lg px-4 py-6 w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainTemplate;
