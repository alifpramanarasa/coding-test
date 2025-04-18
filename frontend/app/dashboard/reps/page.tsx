import { DashboardLayout } from '../../../components/templates/dashboard-layout';
import { SalesRepsTable } from '../../../components/organisms/sales-reps-table';

export default function SalesRepsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Sales Representatives</h2>
        <SalesRepsTable />
      </div>
    </DashboardLayout>
  );
} 