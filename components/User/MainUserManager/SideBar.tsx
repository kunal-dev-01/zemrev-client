import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLoginModal } from "@/hooks/loginHooks/login.hooks";
import {DasBoardSvg,PaymentSvg,UserProfileSvg,SecuritySvg,NotificationSvg,MembershipSvg} from "../../Svg/UserPageSvg";

const SideBar = () => {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page");
  const { setOpenUserMenu } = useLoginModal();

  const closeMenu = () => setOpenUserMenu(false);

  const UserLinks = [
    { name: "Dashboard", slug: "dashboard", icon: <DasBoardSvg /> },
    { name: "Billing & Payment", slug: "billing" , icon: <PaymentSvg /> },
    { name: "Membership", slug: "membership" , icon: <MembershipSvg /> },
    { name: "Security & Privacy", slug: "security" , icon: <SecuritySvg /> },
    { name: "Notifications", slug: "notifications" , icon: <NotificationSvg /> },
    { name: "Profile", slug: "profile" , icon: <UserProfileSvg /> },
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
            className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 cursor-pointer
              ${
                isActive
                  ? "bg-light dark:bg-dark/70 text-white duration-300"
                  : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/70"
              }
            `}
          >
            <div className={`w-5 h-5 md:w-6 md:h-6 ${isActive ? "text-white" : "text-zinc-700 dark:text-zinc-300"} `}>{item.icon}</div>

            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

export default SideBar;
