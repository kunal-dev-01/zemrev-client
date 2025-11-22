import HeroSection from "./HeroSection";
import ToolsGridSection from "./ToolGridSection";
import FeatureSection from "./FeatureSection";
import BuyCredit from "./BuyCredit";
import WorkflowSection from "./WorkflowSection";

const MainHomeManager = () => {

  return (
    <div className="w-full md:space-y-[1vw] space-y-[1vh]">
      <HeroSection />
      <ToolsGridSection />
      <FeatureSection />
      <WorkflowSection />
      <BuyCredit />
    </div>
  );
};

export default MainHomeManager;