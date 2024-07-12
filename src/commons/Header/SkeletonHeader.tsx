import HeaderSection from "./HeaderSection";

const SkeletonHeader = () => {
  return (
    <HeaderSection>
      <div className="flex items-center">
        <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden bg-gray-300 animate-pulse"></div>
        <div className="ml-4 flex-grow">
          <div className="w-24 h-6 bg-gray-300 animate-pulse mb-2"></div>
          <div className="flex space-x-2">
            <div className="w-16 h-6 bg-gray-300 animate-pulse"></div>
            <div className="w-16 h-6 bg-gray-300 animate-pulse"></div>
          </div>
        </div>
      </div>
    </HeaderSection>
  );
};

export default SkeletonHeader;
