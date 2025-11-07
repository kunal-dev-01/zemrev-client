import { ImageConverterTool, ConvertLogoSvg, TrendingSvg } from "@/components/Svg/ImageToolSvg";

const MainImageConverterPage = () => {
  const converterTools = [
    { from: "Jpg", to: "Png", isTrending: true },
    { from: "Png", to: "WebP", isTrending: true },
    { from: "Jpg", to: "WebP", isTrending: true },
  ];

  return (
    <div aria-label="image-tool-page" className="w-full space-y-2 md:space-y-4">
      {/* Header */}
      <div className="w-full p-4 rounded-2xl bg-zinc-100/10 dark:bg-zinc-900/10 border-2 border-zinc-100/80 dark:border-zinc-900/50">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-zinc-700 dark:text-zinc-300 select-none">
          Image Toolkit
        </h1>
      </div>

      {/* Tools Grid */}
      <div className="w-full p-2 rounded-2xl bg-zinc-100/10 dark:bg-zinc-900/10 border-2 border-zinc-100/80 dark:border-zinc-900/50">

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 border-2 border-zinc-100/80 dark:border-zinc-900/50 rounded-2xl p-2">

          {/* Main Tool Card */}
          <div className="p-3 rounded-xl border-2 border-light dark:border-dark bg-transparent flex flex-col items-center justify-center cursor-pointer group relative overflow-hidden">
            <div className="h-16 md:h-20 lg:h-24 mb-2">
              <ImageConverterTool />
            </div>
            <p className="text-xs md:text-sm text-center rounded-md bg-zinc-100 dark:bg-zinc-900/50 w-full py-1.5 px-2">
              Image Converter
            </p>

            <div className="absolute inset-0 bg-linear-to-r from-indigo-400 to-purple-500 dark:from-indigo-500 dark:to-purple-600 flex items-center justify-center scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-in-out text-sm md:text-base font-semibold z-10 text-white rounded-xl">
              Convert Image
            </div>
          </div>

          {/* Converter Cards */}
          {converterTools.map((tool, index) => (
            <div
              key={index}
              className="p-3 rounded-xl flex flex-col gap-2 items-center justify-center cursor-pointer border-2 border-zinc-100/80 dark:border-zinc-900/50 relative overflow-hidden group"
            >
              <span className="text-base md:text-lg lg:text-xl font-medium">{tool.from}</span>
              <div className="h-6 md:h-8">
                <ConvertLogoSvg />
              </div>
              <span className="text-base md:text-lg lg:text-xl font-medium">{tool.to}</span>

              {tool.isTrending && (
                <div className="absolute top-2 right-2 p-1 bg-linear-to-r from-indigo-400 to-purple-500 dark:from-indigo-500 dark:to-purple-600 rounded-md text-white">
                  <TrendingSvg />
                </div>
              )}

              <div className="absolute inset-0 backdrop-blur-md bg-indigo-100/80 dark:bg-indigo-900/80 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out -z-10 rounded-xl" />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default MainImageConverterPage;
