import React, { useEffect } from "react";
import { useDebounce } from "../../../hook/debounce";

export type IInputProps = {
  refInput?: React.LegacyRef<HTMLInputElement>;
  type?: "number" | "text" | "radio" | "tel";
  placeholder?: string;
  value?: string;
  readOnly?: boolean;
  className?: string;
  isError?: boolean;
  isDigit?: boolean;
  name?: string;
  autocomplete?: "on" | "off";
  maxLength?: number;
  debounceTime?: number;
  onEnter?: (text: string) => void;
  onKeyDown?: (key: string) => void;
  onKeyUp?: (key: string) => void;
  onChangeText?: (text: string) => void;
  onClick?: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
  id?: string;
  dir?: "ltr" | "rtl";
  checked?: boolean;
  required?: boolean;
  max?: number;
  min?: number;
};
// & InputHTMLAttributes<HTMLInputElement>
export const DefualtClassInput =
  "py-3 px-4 border w-full rounded-lg outline-none transition duration-300 text-sm";
export const debounceTime = 20;
export const Input = (props: IInputProps) => {
  const {
    onChangeText = () => {},
    onEnter = () => {},
    placeholder,
    value,
    readOnly,
    onClick = () => {},
    onBlur = () => {},
    onKeyDown,
    onKeyUp,
    min,
    max,
    isError,
    refInput,
    type = "text",
    isDigit,
    autocomplete,
    name,
    maxLength,
    id,
    onFocus,
    debounceTime: debounceTimeFromProps,
    dir = "rtl",
    checked,
    required,
  } = props;

  let { className = "" } = props;

  const [state, setState] = React.useState<string>(value ?? "");
  const debounce = useDebounce(state, debounceTimeFromProps ?? debounceTime);

  const onChangeTextCheck = (text: string) => {
    if (isDigit) {
      const result = text.replace(/\D/g, "");
      setState(result);
      return;
    }
    setState(text);
  };

  const onkeyDownEnterCheck = (key: string) => {
    if (key === "Enter") onEnter(state);
  };

  useEffect(() => {
    // if(!value) return;
    setState(value ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    onChangeText(debounce);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce]);

  if (isError) className += "  border-red-600 ";
  else className += " border-br focus:border-primary";

  className += " bg-inherit font-semibold text-xs md:text-sm";

  return (
    <input
      id={id}
      ref={refInput}
      maxLength={maxLength}
      psc-test="input"
      value={isDigit ? Number(state).toLocaleString() : value}
      onClick={onClick}
      readOnly={readOnly}
      type={type}
      dir={dir}
      placeholder={placeholder}
      name={name}
      onKeyDown={(e) => {
        if (onKeyDown) onKeyDown(e.key);
        onkeyDownEnterCheck(e.key);
      }}
      onFocus={onFocus}
      onBlur={onBlur}
      autoComplete={autocomplete}
      onChange={(e) => onChangeTextCheck(e.target.value)}
      className={`placeholder:font-semibold placeholder:text-sm placeholder:text-neutral-900 ss02 ${className.trim()} ${DefualtClassInput}`}
      onKeyUp={(e) => {
        if (onKeyUp) onKeyUp(e.key);
        onkeyDownEnterCheck(e.key);
      }}
      checked={checked}
      required={required}
      min={min}
      max={max}
    />
  );
};
