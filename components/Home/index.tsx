import HeroSection from "./HeroSection";
import BuyCredit from "./BuyCredit";

const MainHomeManager = () => {

  return (
    <div className="w-full md:space-y-[1vw] space-y-[1vh]">
      <HeroSection />
      <BuyCredit />
    </div>
  );
};

export default MainHomeManager;