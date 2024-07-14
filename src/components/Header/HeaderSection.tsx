interface HeaderSectionProps {
  children: React.ReactNode;
}

const HeaderSection = ({ children }: HeaderSectionProps) => {
  return (
    <div className="relative pt-[80px] w-full">
      <div className="px-[40px] flex items-center mb-6">{children}</div>
      <hr className="border-gray-600" />
    </div>
  );
};

export default HeaderSection;
