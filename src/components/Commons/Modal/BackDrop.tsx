import { PropsWithChildren } from "react";

const BackDrop = ({ children }: PropsWithChildren) => {
  return <div className="fixed flex items-center justify-center inset-0 bg-black bg-opacity-50">{children}</div>;
};

export default BackDrop;
