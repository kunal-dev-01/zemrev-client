import { useLoginModal } from "@/hooks/loginHooks/login.hooks";
import { useCallback } from "react";
import { SidebarSvgTwo } from "../Svg/NavSvg";

const SideBar = () => {
  const { isOpenSidebar, setOpenSidebar } = useLoginModal();

  const handleSidebarToggle = useCallback(() => {
    setOpenSidebar(!isOpenSidebar);
  }, [isOpenSidebar, setOpenSidebar]);

  const handleBackdropClick = useCallback(() => {
    setOpenSidebar(false);
  }, [setOpenSidebar]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-white/50 dark:bg-black/50 z-40 transition-opacity duration-300 ease-in-out ${
          isOpenSidebar ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={handleBackdropClick}
      />

      <div
        className={`w-full md:w-[17vw] h-screen fixed top-0 right-0 z-50 bg-zinc-50 dark:bg-[#101010] transition-transform duration-300 ease-in-out p-3 md:rounded-l-xl ${
          isOpenSidebar ? "translate-x-0" : "translate-x-full"
        }`}
      >

        <div className="flex items-center p-1 rounded-xl border border-zinc-200/50 dark:border-zinc-800">
          <button
            onClick={handleSidebarToggle}
            className="rounded-lg transition-colors duration-200 cursor-pointer"
            aria-label="Toggle sidebar"
          >
            <SidebarSvgTwo />
          </button>

          <h2 className="mx-auto text-zinc-700 dark:text-zinc-300 text-2xl font-semibold ">Explore Tools</h2>
        </div>

        <div className="">
        
        </div>
      </div>
    </>
  );
};

export default SideBar;