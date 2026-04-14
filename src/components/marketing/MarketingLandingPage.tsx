'use client';

import MarketingNav from './MarketingNav';
import HeroSection from './HeroSection';
import ProblemSolution from './ProblemSolution';
import SixLayers from './SixLayers';
import Differentiators from './Differentiators';
import HowItWorks from './HowItWorks';
import CompetitiveTable from './CompetitiveTable';
import PricingPreview from './PricingPreview';
import FounderSection from './FounderSection';
import DemoRequestForm from './DemoRequestForm';
import MarketingFooter from './MarketingFooter';

export default function MarketingLandingPage() {
  return (
    <div className="font-[family-name:var(--font-body)] bg-[#0A0E1A] min-h-screen">
      <MarketingNav />
      <main>
        <HeroSection />
        <section id="platform">
          <ProblemSolution />
        </section>
        <section id="layers">
          <SixLayers />
        </section>
        <section id="features">
          <Differentiators />
        </section>
        <HowItWorks />
        <CompetitiveTable />
        <section id="pricing">
          <PricingPreview />
        </section>
        <FounderSection />
        <section id="demo">
          <DemoRequestForm />
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
