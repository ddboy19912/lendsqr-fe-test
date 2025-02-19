import Icon from "./Icon";
import { Input } from "./ui/input";

interface CustomInputProps {
  value: string | number | readonly string[] | undefined;
  placeholderText?: string;
  inputType: React.HTMLInputTypeAttribute;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

const CustomInput = ({
  value,
  placeholderText,
  inputType,
  onChange,
}: CustomInputProps) => {
  return (
    <div className="font-work-sans relative flex h-10 overflow-hidden rounded-lg">
      <Input
        className="border-primary-blue-20 focus-visible:border-teal h-full w-full rounded-l-lg rounded-r-none border border-r-0 placeholder:text-[#545F7DB3] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-search-cancel-button]:appearance-none"
        type={inputType}
        onChange={onChange}
        value={value}
        placeholder={placeholderText}
      />
      <div className="bg-teal flex h-full w-14 cursor-pointer items-center justify-center">
        <Icon icon="search" size={14} />
      </div>
    </div>
  );
};

export default CustomInput;
