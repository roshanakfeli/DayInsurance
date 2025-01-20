import { Typography } from "../../components/atoms/typography";
import { Divider, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useContext } from "react";
import { userContext } from "../../context/userContext";
import { Button } from "../../components/atoms/button";
import { useMutation } from "react-query";
import { createOtp } from "../../services/createOtp";
interface IFormInput {
  phoneNumber: string;
}

const LoginPage = () => {
  const navigate = useNavigate();

  const { phoneNumber, dispatch } = useContext(userContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createOtpMutation = useMutation(createOtp, {
    onSuccess: () => {
      navigate("/otpPage");
    },
    onError: (error: { code: string; message: string }) => {
      notification.open({
        type: "error",
        message: (
          <Typography className="text-basicGray-400 font-medium text-xs m-0 pt-1">
            {error.message}
          </Typography>
        ),
        className: "bg-error-100",
      });
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const requestData ={
      phone_number:`0${data.phoneNumber}`
    }
    createOtpMutation.mutate(requestData);
    dispatch({ type: "SET-PHONE-NUMBER", payload: data.phoneNumber });
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
              className="border-none focus:border-none text-left w-full"
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
              onChange={(e) => {
                dispatch({ type: "SET-PHONE-NUMBER", payload: e.target.value });
              }}
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
          {errors.phoneNumber?.message && (
            <Typography className="text-rose-600" type="h4">
              {errors.phoneNumber.message as React.ReactNode}
            </Typography>
          )}
        </div>
        <div className="mt-7">
          <Button
            type="submit"
            className={` rounded-lg w-full py-[10px] ${
              createOtpMutation.isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primaries-100"
            } `}
          >
            <Typography className="font-normal m-0" type="h2">
              {createOtpMutation.isLoading ? "لطفا منتظر بمانید..." : "ادامه"}
            </Typography>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
