import { useState, useEffect } from "react";
import { Button } from "../button";
import { Typography } from "antd";
import { ArrowRotateRight } from "iconsax-react";
type TimerProps = {
  /**
   * عددی است که مقدار تایمر را بر حسب ثانیه تنظیم می کند
   */
  totalSeconds: number;
  /**
   * برای تنظیم رنگ پس زمینه به کار می رود.
   */
  backgroundColor?: string;
  onClick?: () => void;
  className?: string;
  hidden?: boolean;
  id?: string;
};
export const Timer = ({
  totalSeconds: totalseconds = 120,
  backgroundColor,
  className,
  onClick,
  hidden,
  id,
}: TimerProps) => {
  const [second, setSecond] = useState<number>(totalseconds);
  useEffect(() => {
    let timerVal = setInterval(() => {
      if (second > 0) {
        setSecond(second - 1);
      }
    }, 1000);
    return () => clearInterval(timerVal);
  }, [second]);
  // hidden && setSecond(10);
  const mm_ss = new Date(second * 1000).toISOString().substring(14, 19);
  const _onClick = () => {
    onClick && onClick();
    setSecond(120);
  };
  return (
    <div style={{ backgroundColor }} className={`flex flex-col ${className}`}>
      <div className="flex items-center gap-5">
        {second === 0 ? (
          <Button
            className=" border-none text-basicGray-200 text-[10px] !p-0 !m-0"
            // disabled={second === 0}
            onClick={_onClick}
          >
            <div className="flex items-center gap-1">
              <Typography className="!text-basicGray-200 font-semibold text-[10px] m-0">
                ارسال مجدد کد
              </Typography>
              <ArrowRotateRight className="!text-basicGray-200 font-semibold" size="16" />
            </div>
          </Button>
        ) : (
          <h3
            className={`text-basicGray-200 font-semibold text-[10px] m-0 p-0 `}
          >
            {mm_ss}
          </h3>
        )}
      </div>
    </div>
  );
};
