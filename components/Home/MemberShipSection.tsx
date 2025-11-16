import React, { useRef } from "react";
import { TickIconSvg } from "../Svg/AuthSvg";

/* ----------------------------------------------------
   PLAN TYPES & CONFIG
---------------------------------------------------- */
enum PlanType {
  BASIC = "BASIC",
  PRO = "PRO",
  ELITE = "ELITE",
  SCALE = "SCALE",
}

interface PlanDetails {
  type: PlanType;
  dailyCredits: number;
  concurrentJobLimit: number;
  priority: string;
  price: number;
  features: string[];
}

const PLAN_COLORS = {
  [PlanType.BASIC]: {
    badge:
      "bg-purple-500/50 dark:bg-purple-900/50 border-purple-500 dark:border-purple-900",
    dot: "bg-purple-500 dark:bg-purple-900",
    price: "text-purple-600 dark:text-purple-400",
    creditBox:
      "bg-purple-500/10 dark:bg-purple-900/20 border border-purple-500/20 dark:border-purple-900/30 text-purple-700 dark:text-purple-300",
    button:
      "bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700",
  },
  [PlanType.PRO]: {
    badge:
      "bg-blue-500/50 dark:bg-blue-900/50 border-blue-500 dark:border-blue-900",
    dot: "bg-blue-500 dark:bg-blue-900",
    price: "text-blue-600 dark:text-blue-400",
    creditBox:
      "bg-blue-500/10 dark:bg-blue-900/20 border border-blue-500/20 dark:border-blue-900/30 text-blue-700 dark:text-blue-300",
    button:
      "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700",
  },
  [PlanType.ELITE]: {
    badge:
      "bg-amber-500/50 dark:bg-amber-900/50 border-amber-500 dark:border-amber-900",
    dot: "bg-amber-500 dark:bg-amber-900",
    price: "text-amber-600 dark:text-amber-400",
    creditBox:
      "bg-amber-500/10 dark:bg-amber-900/20 border border-amber-500/20 dark:border-amber-900/30 text-amber-700 dark:text-amber-300",
    button:
      "bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700",
  },
  [PlanType.SCALE]: {
    badge:
      "bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-900 dark:to-teal-900 border-emerald-500 dark:border-emerald-900",
    dot: "bg-gradient-to-r from-emerald-500 to-teal-500",
    price: "text-emerald-600 dark:text-emerald-400",
    creditBox:
      "bg-emerald-500/10 dark:bg-emerald-900/20 border border-emerald-500/20 dark:border-emerald-900/30 text-emerald-700 dark:text-emerald-300",
    button:
      "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600",
  },
};

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

/* ----------------------------------------------------
   PLAN CARD COMPONENT
---------------------------------------------------- */
const PlanCard = ({ plan }: { plan: PlanDetails }) => {
  const colors = PLAN_COLORS[plan.type];
  const isScale = plan.type === PlanType.SCALE;

  return (
    <div
      aria-label={`${plan.type.toLowerCase()}-plan`}
      className="min-w-[280px] md:min-w-[20vw] p-5 rounded-xl border 
                 border-zinc-100/50 dark:border-zinc-900/50 
                 flex flex-col bg-zinc-100/50 dark:bg-zinc-900/30 
                 transition-all duration-300 cursor-pointer"
    >
      {/* Badge */}
      <div className="text-center pb-3 border-b border-zinc-200 dark:border-zinc-800">
        <h6
          className={`w-fit text-base md:text-lg flex items-center gap-2 text-white font-semibold px-4 py-1.5 rounded-full mx-auto ${colors.badge}`}
        >
          <span className={`w-3 h-3 rounded-full ${colors.dot}`} />
          {plan.type}
        </h6>
      </div>

      {/* Pricing */}
      <div className="text-center py-4">
        {isScale ? (
          <p className={`text-3xl md:text-4xl font-bold ${colors.price}`}>
            $0.01{" "}
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              /credit
            </span>
          </p>
        ) : (
          <p className={`text-3xl md:text-4xl font-bold ${colors.price}`}>
            ${plan.price}{" "}
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              /month
            </span>
          </p>
        )}
      </div>

      {/* Credits Box */}
      <div className={`w-full px-3 py-2.5 rounded-lg mb-4 ${colors.creditBox}`}>
        <p className="text-sm font-semibold text-center">
          {isScale ? "Pay As You Go" : `${plan.dailyCredits} Credits/Day`}
        </p>
      </div>

      {/* Features */}
      <div className="flex flex-col gap-3 grow">
        <FeatureItem text={`${plan.concurrentJobLimit} Concurrent Jobs`} />
        <FeatureItem text={`${plan.priority} Priority`} />

        {plan.features.map((f, i) => (
          <FeatureItem key={i} text={f} />
        ))}
      </div>

      {/* CTA */}
      <button
        className={`w-full mt-6 px-4 py-1.5 rounded-lg text-white font-semibold transition-colors duration-300 ease-in-out cursor-pointer ${colors.button}`}
      >
        Get Started
      </button>
    </div>
  );
};

const FeatureItem = ({ text }: { text: string }) => (
  <div className="flex items-start gap-2.5 px-1">
    <TickIconSvg />
    <p className="text-sm text-zinc-700 dark:text-zinc-300">{text}</p>
  </div>
);

/* ----------------------------------------------------
   CHEVRON ICONS
---------------------------------------------------- */
const ChevronLeft = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

const ChevronRight = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

/* ----------------------------------------------------
   MEMBERSHIP SECTION (FIXED + OPTIMIZED)
---------------------------------------------------- */
const MembershipSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const amount = dir === "left" ? -300 : 300;
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft + amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full p-6 md:p-8 rounded-2xl border-2 border-zinc-100/50 dark:border-zinc-900/50 bg-zinc-100/10 dark:bg-zinc-900/10">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100">
          Choose Your Plan
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Select the perfect plan for your needs
        </p>
      </div>

      <div className="relative">
        {/* Left Button */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-30 w-8 h-15 items-center justify-center rounded-full border dark:border-zinc-900 border-zinc-100 bg-zinc-900/80 dark:bg-zinc-900/50 text-zinc-700 dark:text-zinc-300 transition-all -translate-x-1/2 cursor-pointer"
          aria-label="Scroll left"
        >
          {" "}
          <ChevronLeft />{" "}
        </button>

        {/* Scrollable Wrapper */}
        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide px-2 relative z-10"
        >
          <div className="flex gap-6 py-2">
            {Object.values(PLANS).map((plan) => (
              <PlanCard key={plan.type} plan={plan} />
            ))}
          </div>
        </div>

        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-30 w-8 h-15 items-center justify-center rounded-full border dark:border-zinc-900 border-zinc-100 bg-zinc-900/80 dark:bg-zinc-900/50 text-zinc-700 dark:text-zinc-300 transition-all translate-x-1/2 cursor-pointer"
          aria-label="Scroll right"
        >
          {" "}
          <ChevronRight />{" "}
        </button>
      </div>
    </div>
  );
};

export default MembershipSection;
