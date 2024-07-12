interface ButtonLgProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const LargeButton = ({ children, onClick }: ButtonLgProps) => {
  return (
    <button className="font-bold rounded-lg bg-customGreen text-white w-[270px] h-[34px] mt-3" onClick={onClick}>
      {children}
    </button>
  );
};

export default LargeButton;
