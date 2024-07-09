import QueryProvider from "@/provider/QureyProvider";
import { PropsWithChildren } from "react";

function MainLayout({ children }: PropsWithChildren) {
  return <QueryProvider>{children}</QueryProvider>;
}

export default MainLayout;
