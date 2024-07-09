interface HeaderSectionProps {
  children: React.ReactNode;
}
const HeaderSection = ({ children }: HeaderSectionProps) => {
  return (
    <div className="relative pt-[80px] w-full mb-10">
      <div className="pl-[40px] flex items-center">{children}</div>
      <div className="w-full border-t border-black mt-6 absolute top-[130px] left-0"></div>
    </div>
  );
};

export default HeaderSection;
