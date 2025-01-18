import React from "react";
import { Input, IInputProps } from "../../atoms/input";

export interface IInputAnimatedProps extends IInputProps {
  mode?: "input" | "textArea";
  errorMessage?: string;
  refTextArea?: React.LegacyRef<HTMLTextAreaElement>;
}
export const InputAnimatedPlaceHolder = (props: IInputAnimatedProps) => {
  const {
    mode = "input",
    placeholder,
    isError,
    errorMessage,
    className,
    id,
  } = props;
  // const active = false;

  return (
    <>
      <div className="relative">
        <div className="relative">
          {mode === "input" && (
            <Input
              {...props}
              id={id}
              className={` peer ${className}`}
              placeholder=" "
            />
          )}
          <label
            htmlFor={id}
            className={`absolute text-sm pointer-events-none bg-white  ${
              isError ? "text-red-600 dark:text-red-500" : ""
            } cursor-text text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[100%] th-inherit
             px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
             peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 right-1 truncate`}
          >
            {placeholder}
          </label>
        </div>
        <p
          id="outlined_error_help"
          className={`mt-2 text-xs text-red-600 dark:text-red-400 absolute -bottom-5 ${
            isError ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="font-medium"></span> {errorMessage}
        </p>
      </div>
    </>
  );
};
