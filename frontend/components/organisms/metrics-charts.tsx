import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface RevenueTrendData {
  month: string;
  revenue: number;
}

interface DealDistributionData {
  [key: string]: number;
}

interface MetricsChartsProps {
  revenueTrend: RevenueTrendData[];
  dealDistribution: DealDistributionData;
}

export function MetricsCharts({ revenueTrend, dealDistribution }: MetricsChartsProps) {
  const revenueData = {
    labels: revenueTrend.map(item => item.month),
    datasets: [
      {
        label: 'Revenue',
        data: revenueTrend.map(item => item.revenue),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const dealData = {
    labels: Object.keys(dealDistribution),
    datasets: [
      {
        data: Object.values(dealDistribution),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
        ],
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
        <Line data={revenueData} />
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Deal Distribution</h3>
        <Doughnut data={dealData} />
      </div>
    </div>
  );
} 