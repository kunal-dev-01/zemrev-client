import React from 'react';
import { UploadCloud, Sliders, Download } from '@/components/Svg/HomeSvg';
import { useAuthVerify } from '@/hooks/authHooks/auth.verify.hooks';

const steps = [
  {
    title: 'Upload File',
    desc: 'Drag & drop your files or select from your device. We support PDF, PNG, JPG, and more.',
    icon: UploadCloud
  },
  {
    title: 'Select Options',
    desc: 'Choose your desired format, compression level, or page range with our intuitive controls.',
    icon: Sliders
  },
  {
    title: 'Download',
    desc: 'Get your processed files instantly. High quality output, ready for professional use.',
    icon: Download
  }
];

const WorkflowSection: React.FC = () => {

  const { getCreditStatus } = useAuthVerify();

  const handle = async() => {
    await getCreditStatus();
  }

  return (
    <section className="w-full">
      <div className="w-full py-12 md:py-16 px-6 md:px-12 border-2 border-zinc-100/50 dark:border-zinc-900/50 rounded-2xl bg-zinc-100/10 dark:bg-zinc-900/10 text-center">
        
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-700 dark:text-zinc-300">
            How it works
          </h2>
          <p className="text-zinc-500 mt-2">
            Three simple steps to transform your documents.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          
          {/* Connection Line Desktop */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-zinc-200 dark:bg-zinc-800 z-0"></div>

          {steps.map((step, idx) => (
            <div onClick={handle} key={idx} className="relative flex flex-col items-center z-10">
              <div className="w-24 h-24 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mb-6">
                <div className="text-light dark:text-dark w-16 h-16"> <step.icon /></div>
              </div>
              <h3 className="text-xl font-semibold text-zinc-700 dark:text-zinc-300 mb-3">
                {step.title}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WorkflowSection;