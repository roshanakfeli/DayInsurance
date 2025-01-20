import React from "react";
import { Input, IInputProps } from "../../atoms/input";
import { Loading } from "../../atoms/loading";

interface IProps extends IInputProps {
  icon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  leftClassName?: string;
  isLoading?: boolean;
  refInput?: React.LegacyRef<HTMLInputElement>;
  maxLength?: number;
  value?: string;
  letterCounter?: boolean;
}
export const InputIcon = (props: IProps) => {
  const {
    icon,
    isLoading,
    refInput,
    leftIcon,
    leftClassName,
    maxLength,
    value,
    letterCounter = false,
  } = props;
  return (
    <div className="relative w-full">
      <Input maxLength={maxLength} refInput={refInput} {...props} />
      <span className="h-full w-12 absolute top-[1px] right-0 flex justify-center items-center pointer-events-none">
        <span>{isLoading ? <Loading /> : icon}</span>
      </span>
      <span
        className={`hidden md:flex h-full w-12 absolute top-0 left-0 justify-center items-center ${leftClassName}`}
      >
        <span>{leftIcon}</span>
        {letterCounter && (
          <span
            className={`flex items-center text-neutral-400 text-xs absolute ${
              leftIcon ? "left-10" : "left-3"
            }`}
          >
            {maxLength}/{value ? value.length : 0}
          </span>
        )}
      </span>
    </div>
  );
};
