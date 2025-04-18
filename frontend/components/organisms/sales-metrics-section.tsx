import { SalesMetricCard } from '../molecules/sales-metric-card';

interface SalesMetricsSectionProps {
  metrics: {
    title: string;
    value: string | number;
    change: number;
    description?: string;
  }[];
}

export function SalesMetricsSection({ metrics }: SalesMetricsSectionProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <SalesMetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          description={metric.description}
        />
      ))}
    </div>
  );
} 