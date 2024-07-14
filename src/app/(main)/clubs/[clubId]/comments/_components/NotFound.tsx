import logoIcon from "@/public/logo.png";
import Image from "next/image";

const NotFound = () => {
  return (
    <section className="flex flex-col justify-center items-center h-screen bg-customYellow gap-y-4">
      <Image
        src={logoIcon}
        alt="logo"
        width={150}
        height={150}
        className="transform hover:rotate-6 transition-transform duration-300"
      />
      <strong className="text-xl font-bold">글이 존재하지 않아요</strong>
    </section>
  );
};

export default NotFound;
