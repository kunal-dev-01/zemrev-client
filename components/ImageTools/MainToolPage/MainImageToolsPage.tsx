import { ImageConverterTool, ConvertLogoSvg, TrendingSvg, ImageCompressorTool, ImageResizerTool, CompressLogoSvg , ResizerLogoSvg } from "@/components/Svg/ImageToolSvg";

const MainImageConverterPage = () => {
  const converterTools = [
    { from: "Jpg", to: "Png", isTrending: true },
    { from: "Png", to: "WebP", isTrending: true },
    { from: "Jpg", to: "WebP", isTrending: true },
  ];

  const compressorTools = [
    { text: "Jpg", isTrending: true },
    { text: "Png", isTrending: true },
    { text: "gif", isTrending: true },
  ]

  const resizerTools = [
    { text: "Jpg", isTrending: true },
    { text: "Png", isTrending: true },
    { text: "WebP", isTrending: true },
  ]

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
          <div className="p-3 rounded-2xl border-2 border-light dark:border-dark bg-transparent flex flex-col items-center justify-center cursor-pointer group relative overflow-hidden">
            <div className="h-16 md:h-20 lg:h-24 mb-2">
              <ImageConverterTool />
            </div>
            <p className="text-xs md:text-sm text-center rounded-md bg-zinc-100 dark:bg-zinc-900/50 w-full py-1.5 px-2">
              Image Converter
            </p>

            <div className="absolute inset-0 bg-light dark:bg-dark flex items-center justify-center scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-in-out text-sm md:text-base font-semibold z-10 text-white rounded-xl">
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
                <div className="absolute top-2 right-2 p-1 bg-light dark:bg-dark rounded-md text-white">
                  <TrendingSvg />
                </div>
              )}

              <div className="absolute inset-0 backdrop-blur-md bg-indigo-100/80 dark:bg-indigo-900/80 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out -z-10 rounded-xl" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 border-2 border-zinc-100/80 dark:border-zinc-900/50 rounded-2xl p-2 mt-2">

          {/* Main Tool Card */}
          <div className="p-3 rounded-2xl border-2 border-green-200 dark:border-green-800 bg-transparent flex flex-col items-center justify-center cursor-pointer group relative overflow-hidden">
            <div className="h-16 md:h-20 lg:h-24 mb-2">
              <ImageCompressorTool />
            </div>
            <p className="text-xs md:text-sm text-center rounded-md bg-zinc-100 dark:bg-zinc-900/50 w-full py-1.5 px-2">
              Image Compressor
            </p>

            <div className="absolute inset-0 bg-green-200 dark:bg-green-800 flex items-center justify-center scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-in-out text-sm md:text-base font-semibold z-10 text-white rounded-xl">
              Compress Image
            </div>
          </div>

          {/* Converter Cards */}
          {compressorTools.map((tool, index) => (
            <div
              key={index}
              className="p-3 rounded-xl flex flex-col gap-2 items-center justify-center cursor-pointer border-2 border-zinc-100/80 dark:border-zinc-900/50 relative overflow-hidden group"
            >
              <div className="h-6 md:h-8">
                <CompressLogoSvg />
              </div>
              <span className="text-base md:text-lg lg:text-xl font-medium">{tool.text}</span>

              {tool.isTrending && (
                <div className="absolute top-2 right-2 p-1 bg-green-200 dark:bg-green-800 rounded-md text-white">
                  <TrendingSvg />
                </div>
              )}

              <div className="absolute inset-0 backdrop-blur-md bg-green-100 dark:bg-green-900 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out -z-10 rounded-xl" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 border-2 border-zinc-100/80 dark:border-zinc-900/50 rounded-2xl p-2 mt-2">

          {/* Main Tool Card */}
          <div className="p-3 rounded-2xl border-2 border-violet-200 dark:border-violet-800 bg-transparent flex flex-col items-center justify-center cursor-pointer group relative overflow-hidden">
            <div className="h-16 md:h-20 lg:h-24 mb-2">
              <ImageResizerTool />
            </div>
            <p className="text-xs md:text-sm text-center rounded-md bg-zinc-100 dark:bg-zinc-900/50 w-full py-1.5 px-2">
              Image Resizer
            </p>

            <div className="absolute inset-0 bg-violet-300 dark:bg-violet-800 flex items-center justify-center scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-in-out text-sm md:text-base font-semibold z-10 text-white rounded-xl">
              Resize Image
            </div>
          </div>

          {/* Converter Cards */}
          {resizerTools.map((tool, index) => (
            <div
              key={index}
              className="p-3 rounded-xl flex flex-col gap-2 items-center justify-center cursor-pointer border-2 border-zinc-100/80 dark:border-zinc-900/50 relative overflow-hidden group"
            >

              <div className="h-6 md:h-8">
                <ResizerLogoSvg />
              </div>
              <span className="text-base md:text-lg lg:text-xl font-medium">{tool.text}</span>

              {tool.isTrending && (
                <div className="absolute top-2 right-2 p-1 bg-violet-200 dark:bg-violet-800 rounded-md text-white">
                  <TrendingSvg />
                </div>
              )}

              <div className="absolute inset-0 backdrop-blur-md bg-violet-100 dark:bg-violet-700/50 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out -z-10 rounded-xl" />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default MainImageConverterPage;
