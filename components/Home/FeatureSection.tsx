import React from 'react';
import { Zap, Shield, HardDrive } from '@/components/Svg/HomeSvg';
import { CheckSvg } from '../Svg/CommonSvg';

const FeatureSection: React.FC = () => {
  return (
    <section className="w-full">
      <div className="w-full overflow-hidden border-2 border-zinc-100/50 dark:border-zinc-900/50 rounded-2xl bg-zinc-100/10 dark:bg-zinc-900/10 text-white relative">
        
        {/* Background Gradient Decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-4 md:p-12 relative z-10">
          
          <div className="flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full dark:bg-zinc-800 bg-zinc-200/50 border dark:border-zinc-700 border-zinc-300 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium dark:text-zinc-300 text-zinc-700">Live Processing Engine</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight dark:text-zinc-300 text-zinc-700">
              Built for speed, designed for privacy.
            </h2>
            
            <p className="text-zinc-500 text-lg leading-relaxed">
              Most online tools upload and store your files. We don't. Your files stay in your browser during work, and any processing happens securely on our temporary servers—never permanently stored.
            </p>

            <ul className="space-y-3 mt-4">
              {['No server uploads', 'Military-grade encryption', 'Fast processing'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 dark:text-zinc-300 text-zinc-700">
                  <span className='w-5 h-5 text-emerald-400'><CheckSvg /></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="dark:bg-zinc-800/50 bg-zinc-100 border dark:border-zinc-700/50 border-zinc-200/50 p-6 rounded-xl backdrop-blur-sm">
              <div className="w-10 h-10 text-green-400 mb-4">
                <Shield />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-zinc-300 text-zinc-700">100% Private</h3>
              <p className="text-zinc-500 text-sm">Files never leave your device. Processing happens locally for maximum security.</p>
            </div>
            
            <div className="dark:bg-zinc-800/50 bg-zinc-100 border dark:border-zinc-700/50 border-zinc-200/50 p-6 rounded-xl backdrop-blur-sm sm:translate-y-8">
            <div className="text-yellow-400 mb-4 w-10 h-10"><Zap /></div>
              <h3 className="text-xl font-semibold mb-2 dark:text-zinc-300 text-zinc-700">Lightning Fast</h3>
              <p className="text-zinc-500 text-sm">Zero upload time. Instant conversion and compression powered by your hardware.</p>
            </div>

            <div className="dark:bg-zinc-800/50 bg-zinc-100 border dark:border-zinc-700/50 border-zinc-200/50 p-6 rounded-xl backdrop-blur-sm">
              <div className="text-blue-400 mb-4 w-10 h-10 "><HardDrive /></div>
              <h3 className="text-xl font-semibold mb-2 dark:text-zinc-300 text-zinc-700">Local Storage</h3>
              <p className="text-zinc-500 text-sm">Output files are saved directly to your chosen folder. No download links to expire.</p>
            </div>

             <div className="dark:bg-zinc-800/50 bg-zinc-100 border dark:border-zinc-700/50 border-zinc-200/50 p-6 rounded-xl backdrop-blur-sm flex flex-col justify-center items-center text-center sm:translate-y-8">
              <div className="text-4xl font-bold text-indigo-400 mb-1">1M+</div>
              <p className="text-zinc-500 text-sm">Files Processed Daily</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeatureSection;