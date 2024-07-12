import Image from "next/image";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image src="/logo.png" alt="Loading..." width={171} height={171} className="mb-4 animate-rotate" />
      <p className="text-xl font-semibold">불러오는 중..</p>
    </div>
  );
};

export default LoadingSpinner;
