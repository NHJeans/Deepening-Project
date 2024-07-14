const ClubDetailHeaderSkeleton = () => {
  return (
    <div className="flex animate-pulse">
      <div className="relative w-[60px] h-[60px] items-center bg-gray-300 rounded-full" />
      <div className="ml-4 flex items-center">
        <div className="bg-gray-300 h-8 w-48 rounded"></div>
      </div>
    </div>
  );
};

export default ClubDetailHeaderSkeleton;
