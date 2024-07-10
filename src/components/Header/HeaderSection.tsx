interface HeaderSectionProps {
  children: React.ReactNode;
}
const HeaderSection = ({ children }: HeaderSectionProps) => {
  return (
    <div className="relative pt-[80px] w-full">
      <div className="px-[40px] flex items-center mb-6">{children}</div>
      <hr className=" border-gray-600" />
      {/* <div className="w-full border-t border-black absolute top-[130px] left-0"></div> */}
    </div>
  );
};

export default HeaderSection;
