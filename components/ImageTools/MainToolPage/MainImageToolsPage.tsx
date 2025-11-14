import {
  ImageConverterTool,
  ImageCompressorTool,
  ImageResizerTool,
} from "@/components/Svg/ImageToolSvg";

import Link from "next/link";

const ImageToolsData = [
  { tool: "Image Converter", icon: <ImageConverterTool />, href: "/image-converter", colors:"bg-indigo-100/80 dark:bg-indigo-900/80" },
  { tool: "Image Compressor", icon: <ImageCompressorTool />, href: "/image-compressor" , colors:"bg-green-100 dark:bg-green-900" },
  { tool: "Image Resizer", icon: <ImageResizerTool />, href: "/image-resizer", colors:"bg-violet-100 dark:bg-violet-700/50" },
  
];

const MainImageToolsPage = () => {
  return (
    <div className="w-full space-y-4">
      <header className="w-full p-4 rounded-2xl bg-zinc-100/10 dark:bg-zinc-900/10 border-2 border-zinc-100/80 dark:border-zinc-900/50">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-zinc-700 dark:text-zinc-300 select-none text-center">
          Image Toolkit
        </h1>
      </header>

      <div className="w-full p-3 rounded-2xl bg-zinc-100/10 dark:bg-zinc-900/10 border-2 border-zinc-100/80 dark:border-zinc-900/50">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {ImageToolsData.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="p-4 rounded-xl border border-zinc-100 dark:border-zinc-900 flex flex-col items-center justify-center gap-2 select-none min-h-[15vh] md:min-h-[10vw] relative group hover:border-none"
            >
              <div className="w-12 h-12 md:w-[4vw] md:h-[4vw] flex items-center justify-center text-zinc-700 dark:text-zinc-300">{item.icon}</div>
              <p className="text-sm md:text-lg font-medium text-zinc-700 dark:text-zinc-300 text-center">
                {item.tool}
              </p>

              {/* hover bg */}
              <div className={`group-hover:opacity-100 group-hover:scale-100 opacity-0 scale-90 transition-all duration-300 ease-in-out absolute top-0 left-0 w-full h-full ${item.colors} rounded-xl absolute -z-10`}/>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainImageToolsPage;