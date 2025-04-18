import { DashboardLayout } from '../../components/templates/dashboard-layout';
import { SalesMetricsSection } from '../../components/organisms/sales-metrics-section';

const mockMetrics = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: 20.1,
    description: 'From last month',
  },
  {
    title: 'Active Deals',
    value: '12',
    change: -5.2,
    description: 'From last month',
  },
  {
    title: 'Conversion Rate',
    value: '3.2%',
    change: 12.5,
    description: 'From last month',
  },
  {
    title: 'Avg. Deal Size',
    value: '$3,769.32',
    change: 8.3,
    description: 'From last month',
  },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <SalesMetricsSection metrics={mockMetrics} />
      </div>
    </DashboardLayout>
  );
} 