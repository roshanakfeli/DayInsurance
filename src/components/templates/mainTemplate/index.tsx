import { ArrowRight2 } from "iconsax-react";
import logo from "../../../assets/images/Group 48095662.svg";
import { ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}

const MainTemplate = (props: IProps) => {
  const { children } = props;

  return (
    <div className="flex flex-col h-screen">
      {/* Top Section */}
      <div className="bg-primaries-100 rounded-b-2xl flex justify-center items-center h-52">
        <h1 className="text-white text-2xl font-bold">Top Section</h1>
      </div>

      {/* Bottom Section */}
      <div className=" flex justify-center items-center h-full">
        <h1 className="text-white text-2xl font-bold">Bottom Section</h1>
      </div>

      {/* Center White Component */}
      <div className="absolute inset-0 flex justify-center shadow-custom-shadow top-24 mx-6 h-[280px]">
        {children}
      </div>
    </div>
  );
};

export default MainTemplate;
