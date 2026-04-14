'use client';

import { Check } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface Row {
  capability: string;
  intelliops: string | true;
  jellyfish: string;
  linearb: string;
  faros: string | true;
}

const rows: Row[] = [
  {
    capability: 'Full lifecycle (L0\u2013L5)',
    intelliops: true,
    jellyfish: 'L1\u2013L3',
    linearb: 'L1\u2013L2',
    faros: 'L1\u2013L3',
  },
  {
    capability: 'Banking compliance',
    intelliops: 'Built-in',
    jellyfish: 'Add-on',
    linearb: 'No',
    faros: 'Partial',
  },
  {
    capability: 'AI audit trail',
    intelliops: true,
    jellyfish: 'No',
    linearb: 'No',
    faros: 'No',
  },
  {
    capability: 'Cross-layer traceability',
    intelliops: true,
    jellyfish: 'No',
    linearb: 'No',
    faros: 'Partial',
  },
  {
    capability: 'Incident intelligence',
    intelliops: '2.3s RCA',
    jellyfish: 'No',
    linearb: 'No',
    faros: 'Basic',
  },
  {
    capability: 'Tool-agnostic connectors',
    intelliops: true,
    jellyfish: 'Limited',
    linearb: 'GitHub only',
    faros: true,
  },
];

function CellValue({ value }: { value: string | true }) {
  if (value === true) {
    return <Check className="w-4 h-4 text-[#0AEFCF]" />;
  }
  if (value === 'No') {
    return <span className="text-[#475569]">{value}</span>;
  }
  return <span>{value}</span>;
}

export default function CompetitiveTable() {
  return (
    <section className="bg-[#0A0E1A] py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-white mb-4">
              Intelligence, Not Just Metrics
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-[family-name:var(--font-body)]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 pr-6 text-[#94A3B8] font-medium">Capability</th>
                  <th className="py-4 px-6 text-[#0AEFCF] font-medium bg-[#0AEFCF]/[0.03]">IntelliOps</th>
                  <th className="py-4 px-6 text-[#94A3B8] font-medium">Jellyfish</th>
                  <th className="py-4 px-6 text-[#94A3B8] font-medium">LinearB</th>
                  <th className="py-4 px-6 text-[#94A3B8] font-medium">Faros AI</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.capability}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors text-[#CBD5E1]"
                  >
                    <td className="py-4 pr-6 text-white">{row.capability}</td>
                    <td className="py-4 px-6 bg-[#0AEFCF]/[0.03]">
                      <CellValue value={row.intelliops} />
                    </td>
                    <td className="py-4 px-6">
                      <CellValue value={row.jellyfish} />
                    </td>
                    <td className="py-4 px-6">
                      <CellValue value={row.linearb} />
                    </td>
                    <td className="py-4 px-6">
                      <CellValue value={row.faros} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
