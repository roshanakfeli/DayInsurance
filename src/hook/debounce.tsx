import { useState } from "react";
import { useEffect } from "react";

export const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// export const useDebounce = (debounce: number = 0) => {

//   const [value, setValue] = React.useState<string>('');

//   useEffect(() => {
//     /**
//      * در صورتی که تایمری برای تاخیر تنظیم نشده باشد بلافاطمه متن برگشت داده می‌شود
//      */
//     if (!debounce) {
//       // onChangeText(text)
//       return;
//     }

//     /**
//      * در صورت تنظیم شدن تایمر با تاخیری که از سمت کاربر ارسال شده است داده‌ها برگشت داده می‌شوند
//      */
//     const timeout = setTimeout(() => {
//       // onChangeText(text)
//     }, debounce)
//     return () => {
//       /**
//        * با هر تغییر متن مقدار استیت عوض شده و این متد فراخوانی شده و settimeout را کنسل می‌کند.
//        */
//       clearTimeout(timeout)
//     }
//   }, [value])

//   return { value, setValue };
// }
