import React from 'react';
import { 
  FileImage, 
  Minimize2, 
  FileText, 
  Scissors, 
  ArrowRightLeft, 
  Layers, 
  Lock, 
  FileJson 
} from '@/components/Svg/HomeSvg';

const tools = [
  {
    title: 'Image Compressor',
    desc: 'Reduce file size up to 80% without losing visible quality.',
    icon: Minimize2,
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-500/10'
  },
  {
    title: 'Format Converter',
    desc: 'Convert between JPG, PNG, WebP, and AVIF instantly.',
    icon: ArrowRightLeft,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-500/10'
  },
  {
    title: 'PDF Splitter',
    desc: 'Extract specific pages or split documents into separate files.',
    icon: Scissors,
    color: 'text-orange-500',
    bg: 'bg-orange-50 dark:bg-orange-500/10'
  },
  {
    title: 'PDF Merger',
    desc: 'Combine multiple PDF documents into a single organized file.',
    icon: Layers,
    color: 'text-purple-500',
    bg: 'bg-purple-50 dark:bg-purple-500/10'
  },
  {
    title: 'Image to PDF',
    desc: 'Turn your scanned images or photos into professional PDFs.',
    icon: FileImage,
    color: 'text-rose-500',
    bg: 'bg-rose-50 dark:bg-rose-500/10'
  },
  {
    title: 'PDF to Word',
    desc: 'Convert read-only PDFs into editable Word documents.',
    icon: FileText,
    color: 'text-indigo-500',
    bg: 'bg-indigo-50 dark:bg-indigo-500/10'
  },
  {
    title: 'Unlock PDF',
    desc: 'Remove password protection from secure PDF files.',
    icon: Lock,
    color: 'text-zinc-500',
    bg: 'bg-zinc-100 dark:bg-zinc-800/50'
  },
  {
    title: 'JSON Formatter',
    desc: 'Validate, format, and minify JSON data for development.',
    icon: FileJson,
    color: 'text-cyan-500',
    bg: 'bg-cyan-50 dark:bg-cyan-500/10'
  }
];

const ToolsGridSection: React.FC = () => {
  return (
    <section className="w-full">
       <div className="w-full p-6 md:p-10 border-2 border-zinc-100/50 dark:border-zinc-900/50 rounded-2xl bg-zinc-100/10 dark:bg-zinc-900/10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-700 dark:text-zinc-300">
              Powerful Utilities
            </h2>
            <p className="text-zinc-500 mt-2">
              Everything you need to manage your files efficiently.
            </p>
          </div>
          
          {/* Fixed Hover Button */}
          <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg px-5 py-1 font-medium text-light dark:text-indigo-400 transition duration-300 ease-out hover:text-white border border-indigo-100 dark:border-indigo-900/30 cursor-pointer">
            <span className="w-full h-full rounded-lg bg-light dark:bg-dark/30 absolute top-0 left-0 -z-10 scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition duration-300 ease-out"></span>
            <span className="relative flex items-center gap-2">
              View all tools 
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map((tool, idx) => (
            <div 
              key={idx}
              className="
                group relative p-5 flex flex-col gap-4 rounded-xl cursor-pointer transition-all duration-300 ease-out
                bg-zinc-100/80 dark:bg-zinc-900/50 
                border border-zinc-100 dark:border-zinc-800
                hover:-translate-y-1 
                hover:shadow-md hover:shadow-indigo-500/10 dark:hover:shadow-indigo-900/20
                hover:bg-zinc-50 dark:hover:bg-zinc-900
              "
            >
              <div className={`w-12 h-12 p-2.5 rounded-lg ${tool.bg} flex items-center justify-center ${tool.color} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                <tool.icon />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-zinc-700 dark:text-zinc-300 group-hover:text-light dark:group-hover:text-dark transition-colors">
                  {tool.title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                  {tool.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsGridSection;