// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TagTypesData = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "a"] as const;
type TagTypes = typeof TagTypesData;
type TagType = TagTypes[number];

export interface ITypographyProps {
  children?: React.ReactNode;
  className?: string;
  isError?: boolean;
  type?: TagType;
  onClick?: () => void;
  dir?: "rtl" | "ltr";
}
export const Typography = (props: ITypographyProps) => {
  const {
    type,
    onClick,
    className: classNameInjext,
    isError,
    children,
    dir = "rtl",
  } = props;

  const Tag: TagType = type ?? "p";

  const className: string[] = [""];

  switch (type) {
    case "h1":
      className.push("text-2xl font-bold");
      break;
    case "h2":
      className.push("text-base md:text-lg");
      break;
    case "h3":
      className.push("text-[13px] md:text-[15px]");
      break;
    case "h4":
      className.push("text-[12px] md:text-[14px]");
      break;

    default:
      className.push("text-xs font-medium");
      break;
  }

  if (classNameInjext) className.push(classNameInjext ?? "");

  if (isError) className.push("text-error");

  return (
    <Tag onClick={onClick} className={className.join(" ")} dir={dir}>
      {children}
    </Tag>
  );
};
