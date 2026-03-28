'use client';

interface SummarySectionProps {
  summary: string[];
}

export default function SummarySection({ summary }: SummarySectionProps) {
  return (
    <section className="bg-gradient-to-br from-primary-500/10 to-purple-600/10 rounded-2xl p-8 mb-12 border border-primary-500/20">
      <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
        <span className="w-1 h-8 bg-gradient-to-b from-primary-400 to-purple-500 rounded-full"></span>
        今日要点总结
      </h2>
      <ul className="space-y-4">
        {summary.map((item, index) => (
          <li key={index} className="flex items-start gap-4">
            <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {index + 1}
            </span>
            <p className="text-gray-300 pt-1">{item}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
