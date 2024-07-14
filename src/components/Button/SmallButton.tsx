interface SmallButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const SmallButton = ({ children, onClick }: SmallButtonProps) => {
  return (
    <button onClick={onClick} className="bg-customGreen font-bold rounded-lg text-white text-xs px-2 py-1">
      {children}
    </button>
  );
};

export default SmallButton;
