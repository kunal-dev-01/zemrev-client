import React, { useMemo, useState } from 'react';
import { Tick2IconSvg, CreditIconSvg, BoltIcon } from '@/components/Svg/AuthSvg';

const MIN_CREDITS = 1000;
const MAX_CREDITS = 100000;
const STEP = 100;
const PRICE_PER_CREDIT = 0.002;

const FEATURE_LIST = [
  "No expiration date on credits",
  "Access to all premium Tools",
  "High-speed priority processing",
  "Commercial usage rights included",
  "24/7 dedicated support channel",
  "API access included"
];

const BuyCredit: React.FC = () => {
  const [selectedCredit, setCredit] = useState<number>(MIN_CREDITS);
  const [inputValue, setInputValue] = useState<string>(MIN_CREDITS.toString());

  const totalPrice = useMemo(() => {
    return (selectedCredit * PRICE_PER_CREDIT).toFixed(2);
  }, [selectedCredit]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setCredit(val);
    setInputValue(val.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    // Allow empty string or partial typing
    if (val === '') return;

    const num = Number(val);
    // Only update slider if valid and within range
    if (!isNaN(num) && num >= MIN_CREDITS && num <= MAX_CREDITS) {
      setCredit(num);
    }
  };

  const handleInputBlur = () => {
    let num = Number(inputValue);
    // Clamp value on blur
    if (isNaN(num) || num < MIN_CREDITS) {
      num = MIN_CREDITS;
    } else if (num > MAX_CREDITS) {
      num = MAX_CREDITS;
    }
    setCredit(num);
    setInputValue(num.toString());
  };

  const sliderPercentage =
    ((selectedCredit - MIN_CREDITS) / (MAX_CREDITS - MIN_CREDITS)) * 100;

  const handlePurchase = () => {
    console.log("Processing purchase for credits:", selectedCredit);
  };

  return (
    <div className="w-full px-2 md:px-6 py-4 md:py-12 font-sans border-2 border-zinc-100/50 dark:border-zinc-900/50 rounded-2xl bg-zinc-100/10 dark:bg-zinc-900/10">

      {/* Header */}
      <div className="text-center mb-6 md:mb-16 space-y-2 md:space-y-4">
        <h2 className="text-[3vh] md:text-5xl font-bold text-zinc-700 dark:text-zinc-300 tracking-tight">
          Flexible <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">Pay-As-You-Go</span>
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto text-base md:text-lg">
          Purchase credits on demand. Scale up or down instantly.
        </p>
      </div>

      {/* Main Card */}
      <div className="max-w-5xl mx-auto rounded-3xl p-1 bg-zinc-100 dark:bg-zinc-800/50 shadow-md dark:shadow-2xl dark:shadow-zinc-900/50">
        <div className="bg-white dark:bg-zinc-950 rounded-[22px] overflow-hidden grid grid-cols-1 lg:grid-cols-12">

          {/* Left Features */}
          <div className="lg:col-span-5 p-4 md:p-10 flex flex-col justify-between bg-zinc-50 dark:bg-zinc-900/50 border-b lg:border-b-0 lg:border-r border-zinc-100 dark:border-zinc-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-8">
                <BoltIcon />
                Instant Activation
              </div>

              <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                Power your workflow
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8 text-sm md:text-base">
                Get full access to our premium infrastructure with a simple credit-based system. Pay only for what you use.
              </p>

              <div className="space-y-4">
                {FEATURE_LIST.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Tick2IconSvg />
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800/50">
              <p className="text-xs text-zinc-400 dark:text-zinc-500">Secure payment via Stripe •</p>
            </div>
          </div>

          {/* Right: Calculator */}
          <div className="lg:col-span-7 p-4 md:p-12 relative bg-zinc-100 dark:bg-zinc-900/30 flex flex-col justify-center">

            {/* Decorative Icon */}
            <div className="absolute top-6 right-6 opacity-20 pointer-events-none">
              <CreditIconSvg />
            </div>

            <div className="space-y-8 md:space-y-10">

              {/* Credit Header + Manual Input */}
              <div>
                <label className="block text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-3">
                  Select Credit Amount
                </label>

                <div className="flex items-center gap-4">
                  <span className="md:text-5xl text-3xl font-bold text-zinc-900 dark:text-white tracking-tighter">
                    {selectedCredit.toLocaleString()}
                  </span>

                  {/* Manual Input */}
                  <input
                    type="number"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className="px-3 py-2 w-28 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-700 dark:text-zinc-300 text-sm font-medium outline-none"
                  />
                </div>
              </div>

              {/* Slider */}
              <div className="relative h-10 flex items-center px-2 select-none">
                <input
                  type="range"
                  min={MIN_CREDITS}
                  max={MAX_CREDITS}
                  step={STEP}
                  value={selectedCredit}
                  onChange={(e) => setCredit(Number(e.target.value))}
                  className="w-full absolute z-20 opacity-0 cursor-pointer h-full"
                />

                <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden relative">
                  <div
                    className="h-full absolute top-0 left-0 bg-zinc-900 dark:bg-white transition-all duration-300 ease-out"
                    style={{ width: `${sliderPercentage}%` }}
                  />
                </div>

                <div
                  className="absolute h-7 w-7 bg-white dark:bg-zinc-950 rounded-full border-[3px] border-zinc-900 dark:border-white shadow-lg z-10 pointer-events-none transition-all duration-300 ease-out top-1/2"
                  style={{
                    left: `${sliderPercentage}%`,
                    transform: "translate(-50%, -50%)"
                  }}
                />
              </div>

              {/* Summary */}
              <div className="bg-zinc-50 dark:bg-zinc-900/30 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800/50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-zinc-500 dark:text-zinc-400 text-sm">Price per credit</span>
                  <span className="text-zinc-900 dark:text-zinc-300 font-mono text-sm bg-zinc-200/50 dark:bg-zinc-800 px-2 py-1 rounded">
                    ${PRICE_PER_CREDIT}
                  </span>
                </div>

                <div className="flex justify-between items-end pt-4 border-t border-zinc-200 dark:border-zinc-800/50">
                  <span className="text-zinc-600 dark:text-zinc-400 font-medium">Total</span>
                  <span className="md:text-3xl text-xl font-bold text-zinc-700 dark:text-zinc-300 tracking-tight">
                    ${totalPrice}
                  </span>
                </div>
              </div>

              {/* Purchase Button */}
              <button
                onClick={handlePurchase}
                className="w-full py-2 rounded-xl bg-light dark:bg-dark text-white font-semibold text-lg 
                hover:bg-light/80 dark:hover:bg-dark/80 transition-all duration-300 active:scale-[0.98]"
              >
                Purchase Credits
              </button>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default BuyCredit;
