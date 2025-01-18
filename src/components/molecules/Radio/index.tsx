import { Input } from "../../atoms/input";
import { Typography } from "../../atoms/typography";

interface IProps {
  setConfirm: () => void;
  confirm: boolean;
  id?: string;
  label1?: string | React.ReactNode;
  label2?: string | React.ReactNode;
}

const Radio = (props: IProps) => {
  const { setConfirm, confirm, id, label1, label2 } = props;

  return (
    <div className="flex items-center gap-5 mr-10">
      <div className="flex items-center gap-3">
        <div className="flex items-center">
          <Input
            id={id}
            type="radio"
            checked={confirm}
            onClick={() => {
              setConfirm();
            }}
            className="!border !border-warning-500"
          />
        </div>
        <div className="w-full">
          <Typography className="text-base text-basicGray-500">
            {label1}
            {/* شریک کاری */}
          </Typography>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center">
          <Input
            id={id}
            type="radio"
            checked={!confirm}
            onClick={() => {
              setConfirm();
            }}
            className="!border-warning-500"
          />
        </div>
        <div className="w-full">
          <Typography className="text-base text-basicGray-500">
            {/* همکار */}
            {label2}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Radio;
