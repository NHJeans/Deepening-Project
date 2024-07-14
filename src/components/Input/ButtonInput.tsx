interface ButtonInputProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonText: string;
  onButtonClick: () => void;
  label: string;
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
          className="flex-1 p-2 h-full outline-none rounded-lg text-sm"
        />
        <button onClick={onButtonClick} className="bg-customGreen text-xs text-white px-4 py-1 mr-1 rounded-lg">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ButtonInput;
