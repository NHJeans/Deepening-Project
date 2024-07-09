interface ButtonSmProps {
  children: React.ReactNode;
}

const ButtonSm = ({ children }: ButtonSmProps) => {
  return (
    <button className="bg-customGreen rounded-lg text-white text-xs px-2 py-[2.5px] ">
      {children}
    </button>
  );
};

export default ButtonSm;
