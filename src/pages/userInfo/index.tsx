import React, { useContext } from "react";
import { Typography } from "../../components/atoms/typography";
import { Divider } from "antd";
import { Button } from "../../components/molecules/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { userContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

interface IFormInput {
  firstName: string;
  lastName: string;
}

const UserInfo = () => {
  const { firstName, lastName, dispatch } = useContext(userContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    dispatch({ type: "SET-FIRST-NAME", payload: data.firstName });
    dispatch({ type: "SET-LAST-NAME", payload: data.lastName });
    navigate("/insurancePage");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1">
          <label htmlFor="firstName">
            <Typography
              className="font-normal text-xs text-basicGray-400"
              type="h2"
            >
              نام
            </Typography>
          </label>
          <div
            id="firstName"
            className="flex items-center justify-between border p-3 border-basicGray-100 rounded-lg h-full"
          >
            <input
              value={firstName}
              className="hover:border-none focus:border-none text-right placeholder:text-basicGray-100 placeholder:text-xs text-basicGray-400 w-full"
              placeholder="نام را وارد کنید"
              {...register("firstName", {
                required: "نام خود را وارد کنید.",
              })}
              onChange={(e) => {
                dispatch({ type: "SET-FIRST-NAME", payload: e.target.value });
              }}
            />
          </div>
          {errors.phoneNumber && (
            <Typography
              className="text-rose-600"
              type="h4"
              style={{ color: "red" }}
            >
              {errors.firstName.message}
            </Typography>
          )}
        </div>

        <div className="flex flex-col gap-1 mt-6">
          <label htmlFor="lastName">
            <Typography
              className="font-normal text-xs text-basicGray-400"
              type="h2"
            >
              نام خانوادگی
            </Typography>
          </label>
          <div
            id="lastName"
            className="flex items-center justify-between border p-3 border-basicGray-100 rounded-lg h-full"
          >
            <input
              value={lastName}
              className="hover:border-none focus:border-none text-right placeholder:text-basicGray-100 placeholder:text-xs text-basicGray-400 w-full"
              placeholder="نام خانوادگی را وارد کنید"
              {...register("lastName", {
                required: "نام خانوادگی خود را وارد کنید .",
              })}
              onChange={(e) =>
                dispatch({ type: "SET-LAST-NAME", payload: e.target.value })
              }
            />
          </div>
          {errors.phoneNumber && (
            <Typography
              className="text-rose-600"
              type="h4"
              style={{ color: "red" }}
            >
              {errors.lastName.message}
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

export default UserInfo;
