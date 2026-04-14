'use client';

const platformLinks = ['Plan', 'Build', 'Test', 'Release', 'Operate', 'Learn'];
const companyLinks = ['About', 'Blog', 'Careers', 'Contact'];
const legalLinks = ['Privacy Policy', 'Terms of Service', 'Security'];

export default function MarketingFooter() {
  return (
    <footer className="bg-[#060A14] border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo + tagline */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-[family-name:var(--font-display)] text-lg text-white mb-3">
              IntelliOps<span className="text-[#0AEFCF]">AI</span>
            </p>
            <p className="font-[family-name:var(--font-body)] text-sm text-[#64748B] leading-relaxed">
              AI-powered SDLC intelligence for regulated industries
            </p>
          </div>

          {/* Platform */}
          <div>
            <p className="font-[family-name:var(--font-body)] text-sm font-semibold text-white mb-4">
              Platform
            </p>
            <ul className="flex flex-col gap-2">
              {platformLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-[family-name:var(--font-body)] text-sm text-[#64748B] hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="font-[family-name:var(--font-body)] text-sm font-semibold text-white mb-4">
              Company
            </p>
            <ul className="flex flex-col gap-2">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-[family-name:var(--font-body)] text-sm text-[#64748B] hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="font-[family-name:var(--font-body)] text-sm font-semibold text-white mb-4">
              Legal
            </p>
            <ul className="flex flex-col gap-2">
              {legalLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-[family-name:var(--font-body)] text-sm text-[#64748B] hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#475569] text-xs">
            &copy; {new Date().getFullYear()} IntelliOps AI. All rights reserved.
          </p>
          <p className="text-[#475569] text-xs">
            Built in Zurich, Switzerland
          </p>
        </div>
      </div>
    </footer>
  );
}
