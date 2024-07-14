const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-4">
      <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-customGreen"></div>
    </div>
  );
};

export default LoadingSpinner;
