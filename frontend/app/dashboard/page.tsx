'use client';

import { DashboardLayout } from '../../components/templates/dashboard-layout';
import { SalesMetricsSection } from '../../components/organisms/sales-metrics-section';
import { MetricsCharts } from '../../components/organisms/metrics-charts';
import { useEffect, useState } from 'react';

interface Metric {
  title: string;
  value: string;
  change: number;
  description: string;
}

interface RevenueTrendData {
  month: string;
  revenue: number;
}

interface DealDistributionData {
  [key: string]: number;
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [revenueTrend, setRevenueTrend] = useState<RevenueTrendData[]>([]);
  const [dealDistribution, setDealDistribution] = useState<DealDistributionData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [metricsResponse, revenueResponse, distributionResponse] = await Promise.all([
          fetch('http://localhost:8000/api/metrics/dashboard'),
          fetch('http://localhost:8000/api/metrics/revenue-trend'),
          fetch('http://localhost:8000/api/metrics/deal-distribution')
        ]);

        if (!metricsResponse.ok || !revenueResponse.ok || !distributionResponse.ok) {
          throw new Error('Failed to fetch metrics data');
        }

        const [metricsData, revenueData, distributionData] = await Promise.all([
          metricsResponse.json(),
          revenueResponse.json(),
          distributionResponse.json()
        ]);

        setMetrics(metricsData.data);
        setRevenueTrend(revenueData.data);
        setDealDistribution(distributionData.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
      <div className="space-y-8">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <SalesMetricsSection metrics={metrics} />
        <MetricsCharts 
          revenueTrend={revenueTrend}
          dealDistribution={dealDistribution}
        />
      </div>
    </DashboardLayout>
  );
} 