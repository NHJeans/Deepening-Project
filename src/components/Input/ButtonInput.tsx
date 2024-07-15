interface ButtonInputProps {
  type: string;
  value: string;
  label: string;
  buttonText: string;
  onButtonClick: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ButtonInput = ({ type, value, onChange, buttonText, onButtonClick, label }: ButtonInputProps) => {
  return (
    <div className="flex flex-col w-[270px] mt-3">
      <label className="mb-1 font-semibold">{label}</label>
      <div className="flex items-center bg-white border-2 border-gray rounded-lg focus-within:border-customGreen w-[270px] h-[35px]">
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="flex-1 p-2 w-full h-full outline-none rounded-l-lg text-sm"
        />
        <button
          onClick={onButtonClick}
          className="shrink-0 h-4/5 font-semibold bg-customGreen text-xs text-white px-4 mr-1 my-1 rounded-lg"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ButtonInput;
