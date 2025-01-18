import { useContext, useState } from "react";
import { Typography } from "../../components/atoms/typography";
import { userContext } from "../../context/userContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { Select } from "../../components/molecules/select";
import { Input } from "../../components/atoms/input";
import { useCities, useProvinces } from "../../hook/states";
import { notification } from "antd";
import { Button } from "../../components/atoms/button";

interface IFormInput {
  firstName: string;
  lastName: string;
}

const InsurancePage = () => {
  const { agentCode } = useContext(userContext);

  const [provinceValue, setProvinceValue] = useState<{
    name: string;
    id: number;
  }>();
  const [cityValue, seCityValue] = useState<{
    name: string;
    id: number;
  }>();
  const [selectedValue, setSelectedValue] = useState<string>("");

  const { data: provincesData, isLoading: loadingProvinces } = useProvinces();

  const { data: citiesData, isLoading: loadingCities } = useCities(
    String(provinceValue?.id)
  );

  const { handleSubmit } = useForm();

  const onSubmit: SubmitHandler<IFormInput> = () => {
    notification.open({
      message: (
        <Typography className="text-basicGray-400 font-medium text-xs rounded-2xl m-0 pt-1">
          ثبت نام با موفقیت انجام شد.
        </Typography>
      ),
      type: "success",
      className: "bg-green-100 rounded-2xl border-2 border-green-500",
      closeIcon: false,
    });
  };

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
              placeholder="نام نمایندگی را وارد کنید."
            />
          </div>
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
              data={provincesData}
              value={provinceValue?.name}
              inputProps={{
                className: "placeholder:!text-[#D2D1D1] placeholder:text-xs",
              }}
              placeholder={{ input: "استان را انتخاب کنید." }}
              renders={(provinces: { name: string; id: number }) => (
                <Typography className="text-basicGray-200">
                  {provinces.name}
                </Typography>
              )}
              onClickItem={(province) => setProvinceValue(province)}
              isLoading={loadingProvinces}
            />
          </div>
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
              data={citiesData}
              value={cityValue?.name}
              inputProps={{
                className: "placeholder:!text-[#D2D1D1] placeholder:text-xs",
              }}
              placeholder={{ input: "شهر را انتخاب کنید." }}
              renders={(provinces: { name: string; id: number }) => (
                <Typography className="text-basicGray-200">
                  {provinces.name}
                </Typography>
              )}
              onClickItem={(city) => seCityValue(city)}
              isLoading={loadingCities}
            />
          </div>
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
              inputProps={{
                className: "placeholder:!text-[#D2D1D1] placeholder:text-xs",
              }}
              placeholder={{ input: "شعبه بیمه گر را انتخاب کنید." }}
            />
          </div>
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
          </div>
        </div>
        <div className="grid grid-cols-3 items-center ">
          <Typography
            className="font-normal text-xs text-basicGray-400"
            type="h2"
          >
            نوع نمایندگی
          </Typography>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="type"
              value="حقوقی"
              checked={selectedValue === "حقوقی"}
              onChange={() => handleChange("حقوقی")}
              className={
                " w-5 h-5 rounded-full focus:outline-none cursor-pointer"
              }
            />
            <Typography className="text-basicGray-400 !text-xs m-0">
              حقیقی
            </Typography>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="type"
              value="حقیقی"
              checked={selectedValue === "حقیقی"}
              onChange={() => handleChange("حقیقی")}
              className=" w-5 h-5 rounded-full focus:outline-none cursor-pointer"
            />
            <Typography className="text-basicGray-400 !text-xs m-0">
              حقوقی
            </Typography>
          </label>
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
            />
          </div>
        </div>
        <div className="mt-7">
          <Button
            type="submit"
            className="bg-primaries-100 rounded-lg w-full py-[10px]"
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
