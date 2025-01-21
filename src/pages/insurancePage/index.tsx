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
  FetchProvincesResponseModel,
} from "../../services/fetchProvinces";
import { fetchInsuranceBranch } from "../../services/insuranceBranch";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { useSignupAgent } from "../../services/verificationSignup";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { useNavigate } from "react-router-dom";

interface IFormInput {
  firstName: string;
  lastName: string;
}

const InsurancePage = () => {
  const { agentCode, phoneNumber, firstName, lastName, dispatch } =
    useContext(userContext);

  const { handleSubmit } = useForm();

  const navigate = useNavigate();

  const {
    data,
    mutate: verificationSignupMutation,
    isLoading: isLoadingVerificationSignup,
    isError: isErrorVerificationSignup,
    isSuccess: isSuccessVerificationSignup,
    error: errorVerificationSignup,
  } = useSignupAgent();

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

  console.log(data, "data");
  const [branchValue, setBranchValue] = useState<string>("");
  const [cityCode, setCityCode] = useState<string>("021");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [nameOfAgency, setNameOfAgency] = useState<string>("");
  const [cityValue, seCityValue] = useState<{
    name: string;
    id: number;
  }>();
  const [typeOfRepresentation, setTypeOfRepresentation] =
    useState<string>("real");

  const {
    data: provincesData,
    isLoading: loadingProvinces,
    isError: isErrorProvinces,
    error: errorProvinces,
  } = useQuery(["provinces"], fetchProvinces);

  const {
    data: citiesData,
    isLoading: loadingCities,
    isError: isErrorCities,
    error: errorCities,
  } = useQuery(
    ["counties", selectedProvince],
    () => fetchCounties(selectedProvince?.id),
    {
      enabled: !!selectedProvince.name,
    }
  );

  const {
    data: insuranceBranchData,
    isLoading: loadingInsuranceBranchData,
    isError: isErrorInsuranceBranch,
    error: errorInsuranceBranch,
  } = useQuery(
    ["branches", selectedProvince],
    () =>
      fetchInsuranceBranch(Number(branchValue), "DEY", selectedProvince?.id),
    {
      enabled: !!selectedProvince.name && !!branchValue,
    }
  );

  const onSubmit: SubmitHandler<IFormInput> = () => {
    const requestData = {
      province: String(selectedProvince.id),
      county: String(cityValue?.id),
      agent_code: agentCode,
      phone_number: `0${phoneNumber}`,
      insurance_branch: String(selectedInsuranceBranch?.id),
      agency_type: typeOfRepresentation,
      phone,
      city_code: cityCode,
      first_name: firstName,
      last_name: lastName,
      Name: nameOfAgency,
      address,
    };

    if (!isLoadingVerificationSignup) {
      verificationSignupMutation(requestData);
    }
    navigate("/userState");
    if (isErrorVerificationSignup) {
      notification.open({
        type: "error",
        message: (
          <Typography className="text-basicGray-400 font-medium text-xs m-0 pt-1">
            {errorVerificationSignup?.error_details?.fa_details}
          </Typography>
        ),
        className: "bg-error-100",
      });
    }
  };

  const checkAgencyCodeMutation = useMutation(checkAgencyCode, {
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

  const clearAgencycodeHandler = () => {
    dispatch({ type: "SET-AGENT-CODE", payload: "" });
  };

  if (
    isErrorProvinces ||
    isErrorCities ||
    isErrorInsuranceBranch ||
    errorInsuranceBranch
  ) {
    notification.open({
      type: "warning",
      message: (
        <Typography className="text-basicGray-400 font-medium text-xs m-0 pt-1">
          {errorProvinces?.error_details?.fa_details ||
            errorCities?.error_details?.fa_details ||
            errorInsuranceBranch?.error_details?.fa_details ||
            "Unknown Error"}
        </Typography>
      ),
      className: "bg-error-100",
    });
  }

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
                  <TickCircle size={20} className="text-green-600" />
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
          <label htmlFor="province">
            <Typography
              className="font-normal text-xs text-basicGray-400"
              type="h2"
            >
              استان
            </Typography>
          </label>
          <div id="province" className="w-full">
            <Select
              data={provincesData}
              value={selectedProvince?.name}
              inputProps={{
                className: "placeholder:!text-[#D2D1D1] placeholder:text-xs",
              }}
              placeholder={{ input: "استان را انتخاب کنید." }}
              renders={(provinces: FetchProvincesResponseModel) => (
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
          <label htmlFor="city">
            <Typography
              className="font-normal text-xs text-basicGray-400"
              type="h2"
            >
              شهر
            </Typography>
          </label>
          <div id="city" className="w-full">
            <Select
              data={citiesData}
              value={cityValue?.name}
              inputProps={{
                className: `placeholder:!text-[#D2D1D1] placeholder:text-xs ${
                  selectedProvince.name ? "" : "!bg-gray-200"
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
          <label htmlFor="address">
            <Typography
              className="font-normal text-xs text-basicGray-400"
              type="h2"
            >
              آدرس
            </Typography>
          </label>
          <div id="address" className="w-full">
            <Textarea
              placeholder="آدرس را وارد کنید."
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              className="placeholder:!text-[#D2D1D1] placeholder:text-xs"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 ">
          <label htmlFor="insuranceBranch">
            <Typography
              className="font-normal text-xs text-basicGray-400"
              type="h2"
            >
              شعبه بیمه گر
            </Typography>
          </label>
          <div id="insuranceBranch" className="w-full">
            <Select
              data={insuranceBranchData?.response}
              value={branchValue}
              inputProps={{
                className: `placeholder:!text-[#D2D1D1] placeholder:text-xs ${
                  selectedProvince.name ? "" : "!bg-gray-200"
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
              isLoading={loadingInsuranceBranchData}
              readOnly={selectedProvince.name ? false : true}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 ">
          <label htmlFor="phone">
            <Typography
              className="font-normal text-xs text-basicGray-400"
              type="h2"
            >
              تلفن ثابت
            </Typography>
          </label>
          <div
            id="phone"
            className="grid grid-cols-5 items-center gap-2 w-full"
          >
            <Input
              className="w-11 !pr-3 flex justify-center placeholder:!text-basicGray-100 placeholder:text-xs text-basicGray-400 col-span-4"
              placeholder="XXXX - XXXX"
              onChangeText={(value) => setPhone(value)}
              value={phone}
              maxLength={8}
            />
            <Input
              className="w-11 !pr-3 flex justify-center placeholder:!text-basicGray-100 placeholder:text-xs text-basicGray-400 text-center"
              placeholder="021"
              value={cityCode}
              onChangeText={(value) => setCityCode(value)}
              maxLength={3}
            />
          </div>
        </div>
        <div>
          <RadioGroup
            defaultValue={typeOfRepresentation}
            className="grid grid-cols-3 items-center "
            dir="rtl"
            onValueChange={(value) => setTypeOfRepresentation(value)}
          >
            <Typography
              className="font-normal text-xs text-basicGray-400"
              type="h2"
            >
              نوع نمایندگی
            </Typography>
            <div className="flex items-center space-x-2 justify-center gap-2">
              <RadioGroupItem value="real" id="real" />
              <Label htmlFor="real">
                <Typography className="text-basicGray-400 font-normal">
                  حقیقی
                </Typography>
              </Label>
            </div>
            <div className="flex items-center space-x-2 justify-end gap-2">
              <RadioGroupItem value="legal" id="legal" />
              <Label htmlFor="legal">
                <Typography className="text-basicGray-400 font-normal">
                  حقوقی
                </Typography>
              </Label>
            </div>
          </RadioGroup>
        </div>
        {typeOfRepresentation === "legal" ? (
          <div className="flex flex-col gap-1">
            <label htmlFor="nameOfAgency">
              <Typography
                className="font-normal text-xs text-basicGray-400"
                type="h2"
              >
                نام نمایندگی
              </Typography>
            </label>
            <div
              id="nameOfAgency"
              className="flex items-center justify-between border border-basicGray-100 rounded-lg "
            >
              <Input
                value={nameOfAgency}
                className="border-none text-right placeholder:!text-basicGray-100 placeholder:text-xs text-basicGray-400 w-full"
                placeholder="نام نمایندگی را وارد کنید"
                onChangeText={(value) => setNameOfAgency(value)}
              />
            </div>
          </div>
        ) : null}
        <div className="mt-7">
          <Button
            type="submit"
            className={`bg-primaries-100 rounded-lg w-full py-[10px] ${
              isLoadingVerificationSignup
                ? "!bg-gray-400 cursor-not-allowed"
                : "bg-primaries-100 "
            }`}
            disabled={isLoadingVerificationSignup}
          >
            <Typography className="font-normal m-0" type="h2">
              {isLoadingVerificationSignup ? "در حال ثبت نام..." : "ثبت نام"}
            </Typography>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InsurancePage;
