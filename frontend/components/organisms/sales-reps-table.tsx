'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../atoms/card';
import { SalesRep } from '../../lib/mock-data';
import { SalesService } from '../../lib/services/sales-service';
import { useQuery } from '@tanstack/react-query';
import { Loader2, AlertCircle, RefreshCw, Eye } from 'lucide-react';
import { Button } from '../atoms/button';
import { cn } from '../../lib/utils';
import { SalesRepDrawer } from './sales-rep-drawer';
import { useState } from 'react';

const getInitials = (name: string) => name.charAt(0).toUpperCase();

const getRandomColor = (name: string) => {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-orange-500',
    'bg-teal-500',
    'bg-indigo-500',
    'bg-red-500',
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

export function SalesRepsTable() {
  const [selectedRep, setSelectedRep] = useState<SalesRep | null>(null);
  const { data: salesReps, isLoading, error, refetch } = useQuery({
    queryKey: ['salesReps', 'all'],
    queryFn: async () => {
      const salesService = SalesService.getInstance();
      return salesService.getSalesReps();
    },
    staleTime: 60 * 1000, // 1 minute
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sales Representatives</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-64 gap-4">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="text-muted-foreground">Loading sales representatives...</span>
          </div>
          <div className="text-sm text-muted-foreground">Please wait while we fetch the latest data</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sales Representatives</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-64 gap-4">
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-6 w-6" />
            <span>Failed to load sales representatives</span>
          </div>
          <div className="text-sm text-muted-foreground text-center max-w-sm">
            We encountered an error while fetching the data. Please try again or contact support if the problem persists.
          </div>
          <Button 
            variant="outline" 
            onClick={() => refetch()}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Region</th>
                  <th className="text-left p-4">Deals</th>
                  <th className="text-left p-4">Revenue</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {salesReps?.map((rep) => (
                  <tr key={rep.id} className="border-b">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-full text-white",
                          getRandomColor(rep.name)
                        )}>
                          {getInitials(rep.name)}
                        </div>
                        <div>
                          <div className="font-medium">{rep.name}</div>
                          <div className="text-sm text-muted-foreground">{rep.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{rep.region}</td>
                    <td className="p-4">{rep.deals}</td>
                    <td className="p-4">${rep.revenue.toLocaleString()}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          rep.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {rep.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedRep(rep)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View details</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      <SalesRepDrawer
        salesRep={selectedRep}
        isOpen={!!selectedRep}
        onClose={() => setSelectedRep(null)}
      />
    </>
  );
} 