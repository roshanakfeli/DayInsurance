import { useContext, useEffect, useState } from "react";
import { Typography } from "../../components/atoms/typography";
import { userContext } from "../../context/userContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { Select } from "../../components/molecules/select";
import { Input } from "../../components/atoms/input";
import { notification } from "antd";
import { Button } from "../../components/atoms/button";
import { useMutation, useQuery } from "react-query";
import { checkAgencyCode } from "../../services/checkAgencyCode";
import { InputIcon } from "../../components/molecules/input-icon";
import { Loading } from "../../components/atoms/loading";
import { CloseCircle, TickCircle } from "iconsax-react";
import {
  fetchCounties,
  fetchProvinces,
  FetchProvincesResponse,
} from "../../services/fetchProvinces";
import {
  fetchInsuranceBranch,
  FetchInsuranceBranchResponseModel,
} from "../../services/insuranceBranch";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface IFormInput {
  firstName: string;
  lastName: string;
}

const InsurancePage = () => {
  const { agentCode, dispatch } = useContext(userContext);

  const [selectedProvince, setselectedProvince] = useState<{
    name: string;
    id: number;
  }>({ name: "", id: -1 });

  const [selectedInsuranceBranch, setselectedInsuranceBranch] = useState<{
    id: number;
    name: string;
    insurance: number;
    province: number;
    county: number;
  }>();

  const [branchValue, setBranchValue] = useState("");

  const { data: provincesData, isLoading: loadingProvinces } = useQuery(
    ["provinces"],
    fetchProvinces
  );

  const { data: citiesData, isLoading: loadingCities } = useQuery(
    ["counties", selectedProvince],
    () => fetchCounties(selectedProvince?.id),
    {
      enabled: !!selectedProvince.name,
    }
  );

  const { data: insuranceBranchData, isLoading: loadingInsuranceBranchData } =
    useQuery(
      ["branches", selectedProvince],
      () =>
        fetchInsuranceBranch(Number(branchValue), "DEY", selectedProvince?.id),
      {
        enabled: !!selectedProvince.name && !!branchValue,
      }
    );

  const [cityValue, seCityValue] = useState<{
    name: string;
    id: number;
  }>();
  const [selectedValue, setSelectedValue] = useState<string>("");
  // );

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

  const checkAgencyCodeMutation = useMutation(checkAgencyCode, {
    onSuccess: (data) => {
      // navigate("/otpPage");
    },
    onError: (error: {
      code: string;
      message: string;
      response: { data: { error_details: { fa_details: string } } };
    }) => {
      notification.open({
        type: "warning",
        message: (
          <Typography className="text-basicGray-400 font-medium text-xs m-0 pt-1">
            {error.response.data.error_details.fa_details}
          </Typography>
        ),
        className: "bg-error-100",
      });
    },
  });

  const checkAgencyCodeHandler = (agencyCode: string) => {
    dispatch({ type: "SET-AGENT-CODE", payload: agencyCode });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (agentCode) {
        const requestData = {
          agent_code: agentCode,
        };

        checkAgencyCodeMutation.mutate(requestData);
      } else return;
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [agentCode]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (agentCode) {
        const requestData = {
          agent_code: agentCode,
        };

        checkAgencyCodeMutation.mutate(requestData);
      } else return;
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [agentCode]);

  const clearAgencycodeHandler = () => {
    console.log("object");
    dispatch({ type: "SET-AGENT-CODE", payload: "" });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <label htmlFor="agencyCode">
            <Typography
              className="font-normal text-xs text-basicGray-400"
              type="h2"
            >
              کد نمایندگی
            </Typography>
          </label>
          <div
            id="agencyCode"
            className="flex items-center justify-between border border-basicGray-100 rounded-lg h-full"
          >
            <InputIcon
              value={agentCode}
              className="border-none text-left placeholder:text-right placeholder:!text-basicGray-100 placeholder:text-xs text-basicGray-400 w-full h-12"
              placeholder="کد نمایندگی را وارد کنید."
              onChangeText={(agencyCode) => checkAgencyCodeHandler(agencyCode)}
              icon={
                checkAgencyCodeMutation.isLoading ? (
                  <Loading />
                ) : checkAgencyCodeMutation.isSuccess ? (
                  <TickCircle
                    size={20}
                    className="text-green-600"
                    onClick={() => console.log("object")}
                  />
                ) : (
                  checkAgencyCodeMutation.isError && (
                    <CloseCircle
                      size={20}
                      className="text-rose-600"
                      onClick={clearAgencycodeHandler}
                    />
                  )
                )
              }
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
              value={selectedProvince?.name}
              inputProps={{
                className: "placeholder:!text-[#D2D1D1] placeholder:text-xs",
              }}
              placeholder={{ input: "استان را انتخاب کنید." }}
              renders={(provinces: FetchProvincesResponse) => (
                <Typography className="text-basicGray-200">
                  {provinces.name}
                </Typography>
              )}
              onClickItem={(province) => setselectedProvince(province)}
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
                className: `placeholder:!text-[#D2D1D1] placeholder:text-xs ${
                  selectedProvince.name ? "" : "bg-gray-200"
                }`,
              }}
              placeholder={{ input: "شهر را انتخاب کنید." }}
              renders={(provinces: { name: string; id: number }) => (
                <Typography className="text-basicGray-200">
                  {provinces.name}
                </Typography>
              )}
              onClickItem={(city) => seCityValue(city)}
              isLoading={loadingCities}
              readOnly={selectedProvince.name ? false : true}
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
              data={insuranceBranchData?.response}
              value={branchValue}
              inputProps={{
                className: `placeholder:!text-[#D2D1D1] placeholder:text-xs ${
                  selectedProvince.name ? "" : "bg-gray-200"
                }`,
              }}
              renders={(branche: {
                id: number;
                name: string;
                insurance: number;
                province: number;
                county: number;
              }) => (
                <Typography className="text-basicGray-200">
                  {branche?.name}
                </Typography>
              )}
              onChangeText={(value) => setBranchValue(value)}
              placeholder={{ input: "شعبه بیمه گر را انتخاب کنید." }}
              onClickItem={(branch) => {
                setBranchValue(branch.name);
                setselectedInsuranceBranch(branch);
              }}
              isLoading={loadingCities}
              readOnly={selectedProvince.name ? false : true}
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
          <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <Label htmlFor="option-one">حقیقی</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="option-two" />
              <Label htmlFor="option-two">حقوقی</Label>
            </div>
          </RadioGroup>

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
