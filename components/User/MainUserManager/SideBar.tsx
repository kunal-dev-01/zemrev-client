import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLoginModal } from "@/hooks/loginHooks/login.hooks";
import {DashBoardSvg,PaymentSvg,UserRoundSvg,SecuritySvg,NotificationSvg,APISvg,BuyCreditSvg} from "@/components/Svg/UserPageSvg";

const SideBar = () => {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page");
  const { setOpenUserMenu } = useLoginModal();

  const closeMenu = () => setOpenUserMenu(false);

  const UserLinks = [
    { name: "Dashboard", slug: "dashboard", icon: <DashBoardSvg /> },
    { name: "Billing & Payment", slug: "billing" , icon: <PaymentSvg /> },
    { name: "Buy Credits", slug: "buy-credits" , icon: <BuyCreditSvg /> },
    { name: "API Access", slug: "api-access" , icon: <APISvg /> },
    { name: "Security & Privacy", slug: "security-and-privacy" , icon: <SecuritySvg /> },
    { name: "Notifications", slug: "notifications" , icon: <NotificationSvg /> },
    { name: "Profile", slug: "profile" , icon: <UserRoundSvg /> },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-1 p-1">
      {UserLinks.map((item) => {
        const isActive = currentPage === item.slug;

        return (
          <Link
            key={item.slug}
            href={`/user?page=${item.slug}`}
            onClick={closeMenu} 
            className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 cursor-pointer relative group
              ${
                isActive
                  ? "text-white duration-300"
                  : "text-zinc-700 dark:text-zinc-300"
              }
            `}
          >
            <div className={`w-5 h-5 md:w-6 md:h-6 ${isActive ? "text-white" : "text-zinc-700 dark:text-zinc-300"} `}>{item.icon}</div>

            {item.name}

            <div className={`scale-80 opacity-0 group-hover:scale-100 group-hover:opacity-100 -z-2 transition-all duration-200 absolute top-0 right-0 w-full h-full rounded-lg ${isActive ? "bg-light dark:bg-dark/80 scale-100 opacity-100" : "dark:bg-zinc-800 bg-zinc-200"}`}/>
          </Link>
        );
      })}
    </div>
  );
};

export default SideBar;
