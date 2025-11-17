import React, { useRef } from "react";
import {
  PlanCard,
  PlanDetails,
  PlanType,
} from "../Layouts/PageLayout/PlanCard";
import { ChevronLeft, ChevronRight } from "../Svg/ImageToolSvg";

const PLANS: Record<PlanType, PlanDetails> = {
  [PlanType.BASIC]: {
    type: PlanType.BASIC,
    dailyCredits: 100,
    concurrentJobLimit: 10,
    priority: "Normal",
    price: 4.99,
    features: [
      "Remove background",
      "Compress images",
      "Convert formats",
      "Basic enhancements",
      "No Ads",
      "All feature access",
    ],
  },
  [PlanType.PRO]: {
    type: PlanType.PRO,
    dailyCredits: 250,
    concurrentJobLimit: 15,
    priority: "High",
    price: 9.99,
    features: [
      "All Basic features",
      "Advanced filters",
      "Batch processing",
      "Priority email support",
      "Cloud storage (10GB)",
      "High priority queue",
    ],
  },
  [PlanType.ELITE]: {
    type: PlanType.ELITE,
    dailyCredits: 600,
    concurrentJobLimit: 25,
    priority: "Highest",
    price: 19.99,
    features: [
      "All Pro features",
      "AI enhancement",
      "Premium filters",
      "Watermark removal",
      "Cloud storage (50GB)",
      "Highest priority queue",
    ],
  },
  [PlanType.SCALE]: {
    type: PlanType.SCALE,
    dailyCredits: -1,
    concurrentJobLimit: 100,
    priority: "Dedicated",
    price: 0.01,
    features: [
      "All Elite features",
      "API access",
      "Custom SLA",
      "Priority 24/7 support",
      "Unlimited cloud storage",
      "Dedicated queue",
    ],
  },
};


const MembershipSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = dir === "left" ? -300 : 300;
    scrollRef.current.scrollTo({
      left: scrollRef.current.scrollLeft + amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full p-6 md:p-8 rounded-2xl border-2 border-zinc-100/50 dark:border-zinc-900/50 bg-zinc-100/10 dark:bg-zinc-900/10">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-xl md:text-4xl font-medium text-zinc-700 dark:text-zinc-300">
          Choose Your Membership
        </h2>
        <p className="text-zinc-500 text-sm md:text-base text-center">
          Select the perfect membership for your needs
        </p>
      </div>

      <div className="relative">
        {/* Left Button */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-30 
                     w-8 h-15 items-center justify-center rounded-full border 
                     dark:border-zinc-900 border-zinc-200 bg-zinc-100/80 
                     dark:bg-zinc-900/50 text-zinc-700 dark:text-zinc-300 
                     transition-all -translate-x-1/2 cursor-pointer"
        >
          <ChevronLeft />
        </button>

        {/* Fog LEFT */}
        <div
          className="pointer-events-none absolute left-0 top-0 h-full w-10 z-20 
                     bg-linear-to-l to-[#FDFDFD] dark:to-[#0B0B0C] 
                     from-transparent"
        />

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide px-6 relative z-10"
        >
          <div className="flex gap-6 py-2">
            {Object.values(PLANS).map((plan) => (
              <PlanCard key={plan.type} plan={plan} />
            ))}
          </div>
        </div>

        {/* Fog RIGHT */}
        <div
          className="pointer-events-none absolute right-0 top-0 h-full w-10 z-20 
                     bg-linear-to-l from-[#FDFDFD] dark:from-[#0B0B0C] 
                     to-transparent"
        />

        {/* Right Button */}
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-30 
                     w-8 h-15 items-center justify-center rounded-full border 
                     dark:border-zinc-900 border-zinc-200 bg-zinc-100/80 
                     dark:bg-zinc-900/50 text-zinc-700 dark:text-zinc-300 
                     transition-all translate-x-1/2 cursor-pointer"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default MembershipSection;
