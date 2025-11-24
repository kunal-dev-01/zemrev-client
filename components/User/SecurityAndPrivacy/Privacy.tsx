import React from 'react';
import { CheckSvg, ClockSvg, DataBaseSvg } from '@/components/Svg/CommonSvg';
import { Shield, Lock, FileText } from '@/components/Svg/HomeSvg';
import { PaymentSvg } from '@/components/Svg/UserPageSvg';
import { useLoginModal } from '@/hooks/loginHooks/login.hooks';

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */
type IconWrapperProps = { children: React.ReactNode; className?: string };
type SectionProps = { title: React.ReactNode; children: React.ReactNode };
type BadgeProps = { icon: React.ReactNode; text: string; color: 'green' | 'blue' | 'purple' };

/* ------------------------------------------------------------------ */
/* Re-usable helpers                                                  */
/* ------------------------------------------------------------------ */
const IconWrapper: React.FC<IconWrapperProps> = ({ children, className = '' }) => (
  <span className={`w-5 h-5 mr-2 ${className}`}>{children}</span>
);

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <section>
    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
      {title}
    </h2>
    <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{children}</div>
  </section>
);

const Badge: React.FC<BadgeProps> = ({ icon, text, color }) => {
  const colors = {
    green: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-900/50',
    blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-900/50',
    purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-900/50',
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${colors[color]}`}>
      <IconWrapper>{icon}</IconWrapper>
      {text}
    </span>
  );
};

/* ------------------------------------------------------------------ */
/* Main component                                                     */
/* ------------------------------------------------------------------ */
const Privacy: React.FC = () => {
  const { setPrivacyPolicyModalOpen } = useLoginModal();

  return (
    <div className="w-full fade-in">
      <div className="mx-auto p-4 relative">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => setPrivacyPolicyModalOpen(false)}
          className="absolute top-4 left-4 text-sm font-medium text-white dark:hover:text-brand-400 transition-colors px-3 py-1 bg-light dark:bg-dark rounded-lg"
        >
          Back to Home
        </button>

        {/* Header */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-20 h-20 text-light dark:text-dark p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl mb-5 shadow-sm">
            <Shield />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">Privacy & Data Security</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-lg mx-auto">Transparent, secure, and built for your peace of mind.</p>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/50 rounded-2xl">
          {/* Badges */}
          <div className="border-b border-zinc-200 dark:border-zinc-800/50 px-6 py-4">
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
              <Badge icon={<ClockSvg />} text="24h Auto-Deletion" color="green" />
              <Badge icon={<Lock />} text="TLS/SSL Encrypted" color="blue" />
              <Badge icon={<DataBaseSvg />} text="No Data Mining" color="purple" />
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-10 space-y-8">
            <Section title={<><IconWrapper><FileText /></IconWrapper>About Our Service</>}>
              <strong>Zemrev</strong> is a dedicated SaaS tool designed to convert your images into high-quality PDF documents.
              We operate on a straightforward business model: you purchase credits to perform conversions. We do not sell your data,
              track your behavior for ads, or monetize your content in any way. Your files remain yours alone.
            </Section>

            <section className="bg-transparent rounded-xl p-4 border border-zinc-200 dark:border-zinc-800/50 relative overflow-hidden">
              <h2 className="text-md font-bold text-brand-900 dark:text-brand-100 mb-3 flex items-center relative z-10">
                <IconWrapper><ClockSvg /></IconWrapper>
                24-Hour Auto-Deletion Protocol
              </h2>
              <p className="text-brand-800 dark:text-brand-200 text-sm leading-relaxed mb-4 relative z-10">
                Security is our top priority. Our system is automated to handle your files with zero human intervention.
              </p>
              <ul className="space-y-2 relative z-10">
                <li className="flex items-start text-sm text-brand-900 dark:text-brand-100 font-medium">
                  <IconWrapper className="text-emerald-400"><CheckSvg /></IconWrapper>
                  <span>Images & PDFs are permanently deleted after 1 day.</span>
                </li>
                <li className="flex items-start text-sm text-brand-900 dark:text-brand-100 font-medium">
                  <IconWrapper className="text-emerald-400"><CheckSvg /></IconWrapper>
                  <span>Files are processed in ephemeral storage containers.</span>
                </li>
                <li className="flex items-start text-sm text-brand-900 dark:text-brand-100 font-medium">
                  <IconWrapper className="text-emerald-400"><CheckSvg /></IconWrapper>
                  <span>We never view, copy, or share your uploaded content.</span>
                </li>
              </ul>
            </section>

            <section className="grid sm:grid-cols-2 gap-6">
              <Section title={<><IconWrapper><PaymentSvg /></IconWrapper>Credits & Payments</>}>
                We collect your email ID solely to manage your credit balance and account history. All payments are processed by secure third-party providers. We <strong>never</strong> store your credit card details.
              </Section>
              <Section title={<><IconWrapper><Shield /></IconWrapper>Data Security</>}>
                All transfers are protected via industry-standard <strong>SSL/TLS encryption</strong>. Your data is encrypted in transit and isolated during processing to ensure maximum safety.
              </Section>
            </section>
          </div>

          {/* Footer */}
          <div className="border-t bg-transparent border-zinc-200 dark:border-zinc-800/50 p-4 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">Last updated: January 2026. By using Zemrev, you agree to these terms.</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Need help? <a href="mailto:contact@zemrev.com" className="text-brand-600 hover:text-brand-700 font-medium hover:underline">contact@zemrev.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;