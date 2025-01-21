import { Button } from "../../components/atoms/button";
import StickyBottomModal from "../../components/atoms/sticky-modal/insex";
import { Typography } from "../../components/atoms/typography";
import logo from "../../assets/images/logo.svg";

const UserState = () => {
  return (
    <div className="bg-primaries-200 h-[100vh]">
      <div className="flex justify-center my-auto pt-8">
        <img src={logo} alt="" className="w-[90px]" />
      </div>
      <StickyBottomModal isOpen>
        <div className="flex flex-col gap-4 p-4">
          <Typography type="h3" className="text-basicGray-400">
            نماینده محترم:{" "}
          </Typography>
          <Typography type="h3" className="text-basicGray-400">
            درخواست ثبت نام شما در حال بررسی است. در صورت تایید اطلاعات ،
            اپلیکیشن مورد نظر فعال خواهد شد.
          </Typography>
        </div>
        <Button className="mt-5">ورود با حساب کاربری دیگر</Button>
      </StickyBottomModal>
    </div>
  );
};

export default UserState;
