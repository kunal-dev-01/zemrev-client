import React from "react";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";
import SideBar from "@/components/Navbar/SideBar";
import { usePathname } from "next/navigation";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const hideFooter = pathname.startsWith("/user");

  return (
    <div className="w-full md:px-[10vw] px-[1vh] relative">
      <div className="w-full md:h-[4vw] h-[7vh] flex items-center justify-center sticky top-0 z-20">
        <Navbar />
      </div>

      <SideBar />

      <div className="w-full">{children}</div>

      {!hideFooter && (
        <div className="w-full md:py-[1vw] py-[1vh]">
          <Footer />
        </div>
      )}
    </div>
  );
};

export default PageLayout;
