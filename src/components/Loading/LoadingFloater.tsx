import Image from "next/image";

interface LoadingFloaterProps {
  children: React.ReactNode;
}

const LoadingFloater = ({ children }: LoadingFloaterProps) => (
  <div className="flex flex-col justify-center items-center">
    <Image src="/logos/logo.png" alt="Loading..." width={150} height={150} className="mb-4 animate-bounce" />
    <p className="text-xl font-semibold">{children}</p>
  </div>
);

export default LoadingFloater;
