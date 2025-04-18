import { Card, CardContent, CardHeader, CardTitle } from '../atoms/card';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

interface SalesMetricCardProps {
  title: string;
  value: string | number;
  change: number;
  description?: string;
}

export function SalesMetricCard({
  title,
  value,
  change,
  description,
}: SalesMetricCardProps) {
  const isPositive = change >= 0;
  const changeColor = isPositive ? 'text-green-600' : 'text-red-600';
  const ChangeIcon = isPositive ? ArrowUpIcon : ArrowDownIcon;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        <div className={`flex items-center text-xs ${changeColor}`}>
          <ChangeIcon className="mr-1 h-3 w-3" />
          {Math.abs(change)}% from last period
        </div>
      </CardContent>
    </Card>
  );
} 