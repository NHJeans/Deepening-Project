import Image from "next/image";

const LoadingFloater = () => (
  <div className="flex flex-col justify-center items-center">
    <Image src="/logo.png" alt="Loading..." width={171} height={171} className="mb-4 animate-bounce" />
    <p className="text-xl font-semibold">`텍스트를 넣으세요`</p>
  </div>
);

export default LoadingFloater;
