import Image from "next/image";

const LoadingFloater = () => (
  <div className="flex flex-col justify-center items-center">
    <Image src="/logos/logo.png" alt="Loading..." width={150} height={150} className="mb-4 animate-bounce" />
  </div>
);

export default LoadingFloater;
