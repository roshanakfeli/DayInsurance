import React, { useContext, useState } from "react";
import { Button } from "../../components/molecules/button";
import { Typography } from "../../components/atoms/typography";
import { userContext } from "../../context/userContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { Select } from "../../components/molecules/select";
import { Input } from "../../components/atoms/input";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Label } from "@radix-ui/react-label";
import Radio from "antd/es/radio/radio";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

interface IFormInput {
  firstName: string;
  lastName: string;
}

const InsurancePage = () => {
  const { agentCode, lastName, dispatch } = useContext(userContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    dispatch({ type: "SET-FIRST-NAME", payload: data.firstName });
    dispatch({ type: "SET-LAST-NAME", payload: data.lastName });
    // navigate("/otpPage");
  };

  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <label htmlFor="agentCode">
            <Typography
              className="font-normal text-xs text-basicGray-400"
              type="h2"
            >
              کد نمایندگی
            </Typography>
          </label>
          <div
            id="agentCode"
            className="flex items-center justify-between border p-3 border-basicGray-100 rounded-lg h-full"
          >
            <input
              value={agentCode}
              className="hover:border-none focus:border-none text-right placeholder:text-basicGray-100 placeholder:text-xs text-basicGray-400 w-full"
              placeholder="نام را انتخاب کنید"
              {...register("phoneNumber", {
                required: "نام خود را انتخاب کنید.",
              })}
            />
          </div>
          {/* {errors.phoneNumber && (
            <Typography
              className="text-rose-600"
              type="h4"
              style={{ color: "red" }}
            >
              {errors.agentCode.message}
            </Typography>
          )} */}
        </div>

        <div className="flex flex-col gap-1 ">
          <label htmlFor="lastName">
            <Typography
              className="font-normal text-xs text-basicGray-400"
              type="h2"
            >
              استان
            </Typography>
          </label>
          <div id="lastName" className="w-full">
            <Select
              // data={[name:"تهران"]}
              inputProps={{
                className: "placeholder:!text-[#D2D1D1] placeholder:text-xs",
              }}
              placeholder={{ input: "استان را انتخاب کنید." }}
            />
            {/* <Select dir="rtl">
              <SelectTrigger >
                <SelectValue placeholder="استان را انتخاب کنید." className="text-red-500" style={{color:"red"}}/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select> */}
          </div>
          {/* {errors.phoneNumber && (
            <Typography
              className="text-rose-600"
              type="h4"
              style={{ color: "red" }}
            >
              {errors.lastName.message}
            </Typography>
          )} */}
        </div>

        <div className="flex flex-col gap-1 ">
          <label htmlFor="lastName">
            <Typography
              className="font-normal text-xs text-basicGray-400"
              type="h2"
            >
              شهر
            </Typography>
          </label>
          <div id="lastName" className="w-full">
            <Select
              // data={[name:"تهران"]}
              inputProps={{
                className: "placeholder:!text-[#D2D1D1] placeholder:text-xs",
              }}
              placeholder={{ input: "شهر را انتخاب کنید." }}
            />
            {/* <Select dir="rtl" className="">
              <SelectTrigger>
                <SelectValue placeholder="شهر را انتخاب کنید." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select> */}
          </div>
          {/* {errors.phoneNumber && (
            <Typography
              className="text-rose-600"
              type="h4"
              style={{ color: "red" }}
            >
              {errors.lastName.message}
            </Typography>
          )} */}
        </div>

        <div className="flex flex-col gap-1 ">
          <label htmlFor="lastName">
            <Typography
              className="font-normal text-xs text-basicGray-400"
              type="h2"
            >
              شعبه بیمه گر
            </Typography>
          </label>
          <div id="lastName" className="w-full">
            <Select
              // data={[name:"تهران"]}
              inputProps={{
                className: "placeholder:!text-[#D2D1D1] placeholder:text-xs",
              }}
              placeholder={{ input: "شعبه بیمه گر را انتخاب کنید." }}
            />
            {/* <Select dir="rtl" className="">
              <SelectTrigger>
                <SelectValue placeholder="شعبه بیمه گر را انتخاب کنید." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select> */}
          </div>
          {/* {errors.phoneNumber && (
            <Typography
              className="text-rose-600"
              type="h4"
              style={{ color: "red" }}
            >
              {errors.lastName.message}
            </Typography>
          )} */}
        </div>

        <div className="flex flex-col gap-1 ">
          <label htmlFor="lastName">
            <Typography
              className="font-normal text-xs text-basicGray-400"
              type="h2"
            >
              تلفن ثابت
            </Typography>
          </label>
          <div id="lastName" className="flex items-center gap-2 w-full">
            <Input
              className="w-11 !pr-3 flex justify-center placeholder:!text-[#D2D1D1] placeholder:text-xs text-[#D2D1D1]"
              placeholder="XXXX - XXXX"
            />
            <Input
              className="w-11 !pr-3 flex justify-center placeholder:!text-[#D2D1D1] placeholder:text-xs text-[#D2D1D1]"
              readOnly
              placeholder="021"
            />
            {/* <Select dir="rtl">
              <SelectTrigger >
                <SelectValue placeholder="استان را انتخاب کنید." className="text-red-500" style={{color:"red"}}/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select> */}
          </div>

          {/* {errors.phoneNumber && (
            <Typography
              className="text-rose-600"
              type="h4"
              style={{ color: "red" }}
            >
              {errors.lastName.message}
            </Typography>
          )} */}
        </div>
        <div className="grid grid-cols-3 items-center ">
          <Typography
            className="font-normal text-xs text-basicGray-400"
            type="h2"
          >
            نوع نمایندگی
          </Typography>
          {/* حقوقی Radio Button */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="type"
              value="حقوقی"
              checked={selectedValue === "حقوقی"}
              onChange={() => handleChange("حقوقی")}
              className={
                "appearance-none w-5 h-5 border-2 border-[#F86534] rounded-full focus:outline-none cursor-pointer"
              }
            />
            <span
              className={`w-3 h-3 rounded-full absolute right-[123.5px] ${
                selectedValue === "حقوقی" ? "bg-[#F86534]" : "bg-transparent"
              }`}
            ></span>
            <Typography className="text-basicGray-400 !text-xs m-0">
              حقیقی
            </Typography>
          </label>

          {/* حقیقی Radio Button */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="type"
              value="حقیقی"
              checked={selectedValue === "حقیقی"}
              onChange={() => handleChange("حقیقی")}
              className="appearance-none w-5 h-5 border-2 border-[#F86534] rounded-full focus:outline-none cursor-pointer"
            />
            <Typography className="text-basicGray-400 !text-xs m-0">
              حقوقی
            </Typography>
          </label>
          {/* <div className="flex items-center gap-1">
            <Radio />
            <Typography className="text-basicGray-400 !text-xs m-0">
              حقیقی
            </Typography>
          </div>
          <div className="flex items-center gap-1">
            <Radio />
            <Typography className="text-basicGray-400 !text-xs m-0">
              حقوقی
            </Typography>
          </div> */}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="agentCode">
            <Typography
              className="font-normal text-xs text-basicGray-400"
              type="h2"
            >
              نام نمایندگی
            </Typography>
          </label>
          <div
            id="agentCode"
            className="flex items-center justify-between border p-3 border-basicGray-100 rounded-lg h-full"
          >
            <input
              value={agentCode}
              className="hover:border-none focus:border-none text-right placeholder:text-basicGray-100 placeholder:text-xs text-basicGray-400 w-full"
              placeholder="نام نمایندگی را وارد کنید"
              {...register("phoneNumber", {
                required: "نام نمایندگی را وارد کنید.",
              })}
            />
          </div>
          {/* {errors.phoneNumber && (
            <Typography
              className="text-rose-600"
              type="h4"
              style={{ color: "red" }}
            >
              {errors.agentCode.message}
            </Typography>
          )} */}
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

export default InsurancePage;
