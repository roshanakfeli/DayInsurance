import React from "react";
import { Input, IInputProps } from "../../atoms/input";
import { Loading } from "../../atoms/loading";

interface IProps extends IInputProps {
  icon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  leftClassName?: string;
  isLoading?: boolean;
  refInput?: React.LegacyRef<HTMLInputElement>;
}
export const InputIcon = (props: IProps) => {
  const { icon, isLoading, refInput, leftIcon, leftClassName } = props;
  return (
    <div className="relative w-full">
      <Input refInput={refInput} {...props} />
      {/* {isLoading ? <Loading /> : } */}
      <span className="h-full w-12 absolute top-[1px] right-0 flex justify-center items-center pointer-events-none">
        <span>{isLoading ? <Loading /> : icon}</span>
      </span>
      <span
        className={`h-full w-12 absolute top-[2px] left-0 flex justify-center items-center ${leftClassName}`}
      >
        <span>{leftIcon}</span>
      </span>
    </div>
  );
};
