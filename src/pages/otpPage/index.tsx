import { useContext, useState } from "react";
import { Typography } from "../../components/atoms/typography";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../../components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Timer } from "../../components/atoms/timer";
import { userContext } from "../../context/userContext";
import { Edit2 } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { BiError } from "react-icons/bi";
import { Button } from "../../components/atoms/button";

const notAllowedValues = new Set([
  "11111",
  "22222",
  "33333",
  "44444",
  "55555",
  "66666",
  "77777",
  "88888",
  "99999",
]);

const OtpPage = () => {
  const navigate = useNavigate();

  const { phoneNumber } = useContext(userContext);

  const [otpValue, setOtpValue] = useState<string>("");

  const isNotAllowedValue = (value: string) => {
    return notAllowedValues.has(value);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-2">
        <Typography className="font-bold text-basicGray-400 m-0" type="h2">
          کد تایید را وارد نمایید.
        </Typography>
        <div className="flex items-center gap-2">
          <Edit2
            size="18"
            className="text-primaries-100"
            onClick={() => navigate(-1)}
          />
          <Typography
            className="font-normal text-[10px] text-basicGray-400 m-0"
            type="h2"
          >
            {phoneNumber} 98+
          </Typography>
        </div>
      </div>
      <InputOTP
        maxLength={5}
        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
        className="flex justify-center"
        onChange={(value) => setOtpValue(value)}
      >
        <InputOTPGroup
          className="flex items-center justify-between mt-[22px] w-full"
          onChange={(value) => console.log(value)}
        >
          <InputOTPSlot
            index={4}
            className="border rounded-md border-basicGray-100 w-12 h-12"
          />
          <InputOTPSlot
            index={3}
            className="border rounded-md border-basicGray-100 w-12 h-12"
          />
          <InputOTPSlot
            index={2}
            className="border rounded-md border-basicGray-100 w-12 h-12"
          />
          <InputOTPSlot
            index={1}
            className="border rounded-md border-basicGray-100 w-12 h-12"
          />
          <InputOTPSlot
            index={0}
            className="border rounded-md border-basicGray-100 w-12 h-12"
          />
        </InputOTPGroup>
      </InputOTP>
      <div className="flex justify-center my-4">
        <Timer totalSeconds={120} className="text-basicGray-200" />
      </div>
      <div>
        <Button
          className="bg-primaries-100 rounded-lg w-full py-[10px]"
          onClick={() => {
            if (isNotAllowedValue(otpValue)) {
              notification.open({
                message: (
                  <Typography className="text-basicGray-400 font-medium text-xs rounded-2xl m-0 pt-1">
                    کد وارد شده صحیح نمی باشد.
                  </Typography>
                ),
                type: "error",
                className: "bg-error-100 rounded-2xl border-2 border-error-500",
                icon: (
                  <div className="bg-error-500 rounded-md p-1">
                    <BiError className=" text-white " size={20} />
                  </div>
                ),
                closeIcon: false,
              });
            } else {
              navigate("/userInfo");
            }
          }}
        >
          <Typography className="font-normal m-0" type="h2">
            ادامه
          </Typography>
        </Button>
      </div>
    </div>
  );
};

export default OtpPage;
