import React from "react";
import { Loading } from "../../atoms/loading";

export interface IButtonprops {
  variant?: "primary" | "outline" | "none";
  className?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void;
  type?: "button" | "submit" | "reset";
  size?: "small" | "default" | "big";
  rounded?: "small" | "default" | "big";
  icon?: React.ReactNode;
  minWidth?: boolean;
  color?: "error" | "warning" | "info" | "success" | "secondary";
}

export const Button = (props: IButtonprops) => {
  const {
    disabled,
    onClick = () => {},
    variant,
    isLoading,
    children,
    type,
    icon,
    size,
    minWidth = true,
    color,
    rounded,
  } = props;
  let { className = "" } = props;

  let loadingColor: "white" | "black" | "primary" = "white";
  switch (variant) {
    case "outline":
      className += "text-primaries-100 border border-primaries-100 rounded-md";
      loadingColor = "primary";
      break;
    case "none":
      break;
    default:
      className += " bg-primaries-100 text-white border rounded-md ";
      break;
  }

  switch (size) {
    case "small":
      className += "w-[60px] ";
      break;
    case "big":
      className += " w-[150px]";
      break;
    case "default":
      className += "w-[100px]";
      break;
  }

  switch (rounded) {
    case "small":
      className += "w-[40px] h-[35px] rounded-full ";
      break;
    case "big":
      className += " w-[60px] h-[60px] rounded-full ";
      break;
    case "default":
      className += "w-[50px] h-[50px] rounded-full ";
      break;
  }

  switch (color) {
    case "error":
      className += " bg-red-500 ";
      break;
    case "warning":
      className += " bg-[#f0ad4e] ";
      break;
    case "info":
      className += " bg-[#5bc0de]";
      break;
    case "success":
      className += " bg-[#5cb85c] ";
      break;
    case "secondary":
      className += " bg-[#d1d5db] ";
      break;
  }

  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      type={type ?? "button"}
      className={`z-20 ${minWidth && "px-4"} md: py-2  ${minWidth && "px-8"} ${
        minWidth && "min-w-[60px]"
      } md:${
        minWidth && "min-w-[100px]"
      }  flex items-center justify-center relative transition-color ease-in-out duration-300  ${
        minWidth && "text-[14px]"
      } md:${minWidth && "text-[16px]"} ${
        isLoading || disabled ? "cursor-not-allowed" : ""
      }${className ?? ""}`}
    >
      <span> {icon} </span>
      {children}
      <span
        className={`absolute left-0 top-0 h-full w-6 md:w-10 flex items-center justify-center transition-opacity duration-300 opacity-${
          isLoading ? 1 : 0
        }`}
      >
        <Loading color={loadingColor} />
      </span>
    </button>
  );
};
