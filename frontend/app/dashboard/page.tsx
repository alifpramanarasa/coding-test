import { DashboardLayout } from '../../components/templates/dashboard-layout';
import { SalesMetricsSection } from '../../components/organisms/sales-metrics-section';
import { useEffect, useState } from 'react';

interface Metric {
  title: string;
  value: string;
  change: number;
  description: string;
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/metrics/dashboard');
        if (!response.ok) {
          throw new Error('Failed to fetch metrics');
        }
        const data = await response.json();
        setMetrics(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div>Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="text-red-500">Error: {error}</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <SalesMetricsSection metrics={metrics} />
      </div>
    </DashboardLayout>
  );
} 