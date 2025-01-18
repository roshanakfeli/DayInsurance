import { Typography } from "../../components/atoms/typography";
import { Divider } from "antd";
import { Button } from "../../components/molecules/button";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useContext } from "react";
import { userContext } from "../../context/userContext";

interface IFormInput {
  phoneNumber: string;
}

const LoginPage = () => {
  const navigate = useNavigate();

  const { phoneNumber, dispatch } = useContext(userContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    dispatch({ type: "SET-PHONE-NUMBER", payload: data.phoneNumber });
    navigate("/otpPage");
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-2">
        <Typography className="font-bold text-basicGray-400" type="h2">
          شماره موبایل خود را وارد نمایید.
        </Typography>
        <Typography
          className="font-normal text-[10px] text-basicGray-400"
          type="h2"
        >
          کد تایید برای شما ارسال خواهد شد.
        </Typography>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1 mt-6">
          <label htmlFor="phoneNumber">
            <Typography
              className="font-normal text-xs text-basicGray-400"
              type="h2"
            >
              شماره همراه
            </Typography>
          </label>
          <div
            id="phoneNumber"
            className="flex items-center justify-between border p-3 border-basicGray-100 rounded-lg h-full"
          >
            <input
              type="tel"
              value={phoneNumber}
              className="hover:border-none focus:border-none text-left placeholder:text-basicGray-100 text-basicGray-400 w-full"
              //   placeholder="XXX  XXX-XXX"
              {...register("phoneNumber", {
                required: "شماره همراه الزامی است.",
                minLength: {
                  value: 10,
                  message: "طول شماره همراه کمتر از 10 رقم است.",
                },
                pattern: {
                  value: /^9\d{9}$/,
                  message: "شماره همراه باید با 9 شروع شود .",
                },
              })}
              maxLength={10}
              onChange={(e) =>
                dispatch({ type: "SET-PHONE-NUMBER", payload: e.target.value })
              }
              placeholder="XXX - XXX - XXX"
            />
            <div className="flex items-center">
              <Divider
                className="w-[1.5px] bg-basicGray-100 h-8"
                type="vertical"
              />
              <Typography className="text-basicGray-100 m-0 ">98+</Typography>
            </div>
          </div>
          {errors.phoneNumber && (
            <Typography
              className="text-rose-600"
              type="h4"
              style={{ color: "red" }}
            >
              {errors.phoneNumber.message}
            </Typography>
          )}
        </div>
        <div className="mt-7">
          <Button
            type="submit"
            className="bg-primaries-100 rounded-lg w-full py-[10px]"
            // onClick={() => navigate("/otpPage")}
          >
            <Typography className="font-normal m-0" type="h2">
              ادامه
            </Typography>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
