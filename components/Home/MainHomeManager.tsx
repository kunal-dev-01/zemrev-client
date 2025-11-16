import HeroSection from "./HeroSection";
import MemberShipSection from "./MemberShipSection";

const MainHomeManager = () => {

  return (
    <div className="w-full md:space-y-[1vw] space-y-[1vh]">
      <HeroSection />
      <MemberShipSection />
    </div>
  );
};

export default MainHomeManager;