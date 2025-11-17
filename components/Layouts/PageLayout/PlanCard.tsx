import { TickIconSvg } from "../../Svg/AuthSvg";

export enum PlanType {
  BASIC = "BASIC",
  PRO = "PRO",
  ELITE = "ELITE",
  SCALE = "SCALE",
}

export interface PlanDetails {
  type: PlanType;
  dailyCredits: number;
  concurrentJobLimit: number;
  priority: string;
  price: number;
  features: string[];
}

export const PLAN_COLORS = {
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

export const PlanCard = ({ plan }: { plan: PlanDetails }) => {
  const colors = PLAN_COLORS[plan.type];
  const isScale = plan.type === PlanType.SCALE;

  return (
    <div
      className="relative min-w-[280px] md:min-w-[20vw] p-5 rounded-xl border 
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
        type="button"
        onClick={() => window.open("/auth/register", "_self")}
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
export default PlanCard;