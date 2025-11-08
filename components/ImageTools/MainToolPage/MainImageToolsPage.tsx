import { 
  ImageConverterTool, 
  ConvertLogoSvg, 
  TrendingSvg, 
  ImageCompressorTool, 
  ImageResizerTool, 
  CompressLogoSvg, 
  ResizerLogoSvg 
} from "@/components/Svg/ImageToolSvg";

// Types for better type safety
interface ConverterTool {
  from: string;
  to: string;
  isTrending?: boolean;
}

interface SimpleTool {
  text: string;
  isTrending?: boolean;
}

interface ToolSection {
  title: string;
  mainTool: {
    icon: React.ReactNode;
    label: string;
    hoverText: string;
    borderColor: string;
    bgColor: string;
  };
  items: ConverterTool[] | SimpleTool[];
  type: 'converter' | 'simple';
}

// Reusable components
const MainToolCard = ({ 
  icon, 
  label, 
  hoverText, 
  borderColor, 
  bgColor 
}: {
  icon: React.ReactNode;
  label: string;
  hoverText: string;
  borderColor: string;
  bgColor: string;
}) => (
  <div className={`p-3 rounded-2xl border-2 ${borderColor} bg-transparent flex flex-col items-center justify-center cursor-pointer group relative overflow-hidden`}>
    <div className="h-16 md:h-20 lg:h-24 mb-2">
      {icon}
    </div>
    <p className="text-xs md:text-sm text-center rounded-md bg-zinc-100 dark:bg-zinc-900/50 w-full py-1.5 px-2">
      {label}
    </p>
    <div className={`absolute inset-0 ${bgColor} flex items-center justify-center scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-in-out text-sm md:text-base font-semibold z-10 text-white rounded-xl`}>
      {hoverText}
    </div>
  </div>
);

const ConverterCard = ({ tool, themeColor }: { tool: ConverterTool; themeColor: string }) => (
  <div className="p-3 rounded-xl flex flex-col gap-2 items-center justify-center cursor-pointer border-2 border-zinc-100/80 dark:border-zinc-900/50 relative overflow-hidden group min-h-32">
    <span className="text-base md:text-lg lg:text-xl font-medium">{tool.from}</span>
    <div className="h-6 md:h-8">
      <ConvertLogoSvg />
    </div>
    <span className="text-base md:text-lg lg:text-xl font-medium">{tool.to}</span>
    {tool.isTrending && (
      <div className={`absolute top-2 right-2 p-1 ${themeColor} rounded-md text-white`}>
        <TrendingSvg />
      </div>
    )}
    <div className={`absolute inset-0 ${themeColor.replace('bg-', 'bg-').replace('-200', '-100/80').replace('-800', '-900/80')} opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out -z-10 rounded-xl`} />
  </div>
);

const SimpleToolCard = ({ 
  tool, 
  icon, 
  themeColor 
}: { 
  tool: SimpleTool; 
  icon: React.ReactNode; 
  themeColor: string;
}) => (
  <div className="p-3 rounded-xl flex flex-col gap-2 items-center justify-center cursor-pointer border-2 border-zinc-100/80 dark:border-zinc-900/50 relative overflow-hidden group min-h-32">
    <div className="h-6 md:h-8">
      {icon}
    </div>
    <span className="text-base md:text-lg lg:text-xl font-medium">{tool.text}</span>
    {tool.isTrending && (
      <div className={`absolute top-2 right-2 p-1 ${themeColor} rounded-md text-white`}>
        <TrendingSvg />
      </div>
    )}
    <div className={`absolute inset-0 backdrop-blur-md ${themeColor.replace('-200', '-100').replace('-800', '-900')} opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out -z-10 rounded-xl`} />
  </div>
);

const ToolSection = ({ 
  title, 
  mainTool, 
  items, 
  type, 
  themeColor 
}: ToolSection & { themeColor: string }) => (
  <div className="border-2 border-zinc-100/80 dark:border-zinc-900/50 rounded-2xl p-2">
    <div className="p-2 text-zinc-700 dark:text-zinc-300 text-[2vh] md:text-[1.5vw] border-2 border-zinc-100/80 dark:border-zinc-900/50 rounded-xl font-semibold mb-2">
      {title}
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
      <MainToolCard {...mainTool} />
      {type === 'converter' 
        ? (items as ConverterTool[]).map((tool, index) => (
            <ConverterCard key={`${tool.from}-${tool.to}-${index}`} tool={tool} themeColor={themeColor} />
          ))
        : (items as SimpleTool[]).map((tool, index) => (
            <SimpleToolCard 
              key={`${tool.text}-${index}`} 
              tool={tool} 
              icon={title.includes('Compress') ? <CompressLogoSvg /> : <ResizerLogoSvg />}
              themeColor={themeColor}
            />
          ))
      }
    </div>
  </div>
);

const MainImageConverterPage = () => {
  const toolSections: (ToolSection & { themeColor: string })[] = [
    {
      title: "Converter Tool",
      mainTool: {
        icon: <ImageConverterTool />,
        label: "Image Converter",
        hoverText: "Convert Image",
        borderColor: "border-indigo-200 dark:border-indigo-800",
        bgColor: "bg-indigo-200 dark:bg-indigo-800",
      },
      items: [
        { from: "Jpg", to: "Png", isTrending: true },
        { from: "Png", to: "WebP", isTrending: true },
        { from: "Jpg", to: "WebP", isTrending: true },
      ],
      type: 'converter' as const,
      themeColor: "bg-indigo-200 dark:bg-indigo-800",
    },
    {
      title: "Compress Tool",
      mainTool: {
        icon: <ImageCompressorTool />,
        label: "Image Compressor",
        hoverText: "Compress Image",
        borderColor: "border-green-200 dark:border-green-800",
        bgColor: "bg-green-200 dark:bg-green-800",
      },
      items: [
        { text: "Jpg", isTrending: true },
        { text: "Png", isTrending: true },
        { text: "gif", isTrending: true },
      ],
      type: 'simple' as const,
      themeColor: "bg-green-200 dark:bg-green-800",
    },
    {
      title: "Resize Tool",
      mainTool: {
        icon: <ImageResizerTool />,
        label: "Image Resizer",
        hoverText: "Resize Image",
        borderColor: "border-violet-200 dark:border-violet-800",
        bgColor: "bg-violet-200 dark:bg-violet-800",
      },
      items: [
        { text: "Jpg", isTrending: true },
        { text: "Png", isTrending: true },
        { text: "WebP", isTrending: true },
      ],
      type: 'simple' as const,
      themeColor: "bg-violet-200 dark:bg-violet-800",
    },
  ];

  return (
    <div aria-label="image-tool-page" className="w-full space-y-2 md:space-y-4">
      {/* Header */}
      <header className="w-full p-4 rounded-2xl bg-zinc-100/10 dark:bg-zinc-900/10 border-2 border-zinc-100/80 dark:border-zinc-900/50">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-zinc-700 dark:text-zinc-300 select-none text-center">
          Image Toolkit
        </h1>
      </header>

      {/* Tools Grid */}
      <main className="w-full p-2 rounded-2xl bg-zinc-100/10 dark:bg-zinc-900/10 border-2 border-zinc-100/80 dark:border-zinc-900/50 space-y-5">
        {toolSections.map((section, index) => (
          <ToolSection key={`${section.title}-${index}`} {...section} />
        ))}
      </main>
    </div>
  );
};

export default MainImageConverterPage;