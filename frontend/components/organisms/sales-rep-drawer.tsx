'use client';

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '../atoms/drawer';
import { SalesRep } from '../../lib/mock-data';
import { Button } from '../atoms/button';
import { X } from 'lucide-react';

interface SalesRepDrawerProps {
  salesRep: SalesRep | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SalesRepDrawer({ salesRep, isOpen, onClose }: SalesRepDrawerProps) {
  if (!salesRep) return null;

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <div className="flex items-center justify-between">
              <DrawerTitle>Sales Representative Details</DrawerTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DrawerHeader>
          <div className="p-4 space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-semibold">
                {salesRep.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{salesRep.name}</h3>
                <p className="text-sm text-muted-foreground">{salesRep.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Region</h4>
                <p className="text-lg">{salesRep.region}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Deals</h4>
                <p className="text-lg">{salesRep.deals} active deals</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Total Revenue</h4>
                <p className="text-lg">${salesRep.revenue.toLocaleString()}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    salesRep.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {salesRep.status}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Recent Deals</h4>
                <div className="space-y-2">
                  {salesRep.recentDeals.map((deal, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted">
                      <div>
                        <p className="font-medium">{deal.client}</p>
                        <p className="text-sm text-muted-foreground">${deal.value.toLocaleString()}</p>
                      </div>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          deal.status === 'Closed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {deal.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
} 