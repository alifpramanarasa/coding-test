export interface SalesRep {
  id: string;
  name: string;
  email: string;
  region: string;
  deals: number;
  revenue: number;
  status: 'Active' | 'On Leave';
  recentDeals: {
    client: string;
    value: number;
    status: string;
  }[];
}

export const salesReps: SalesRep[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    region: 'North America',
    deals: 12,
    revenue: 150000,
    status: 'Active',
    recentDeals: [
      { client: 'Acme Corp', value: 25000, status: 'Closed' },
      { client: 'Tech Solutions', value: 35000, status: 'In Progress' },
    ],
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    region: 'Europe',
    deals: 8,
    revenue: 120000,
    status: 'Active',
    recentDeals: [
      { client: 'Global Industries', value: 45000, status: 'Closed' },
      { client: 'EuroTech', value: 28000, status: 'In Progress' },
    ],
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael.c@example.com',
    region: 'Asia Pacific',
    deals: 15,
    revenue: 180000,
    status: 'On Leave',
    recentDeals: [
      { client: 'Pacific Corp', value: 32000, status: 'Closed' },
      { client: 'AsiaTech', value: 42000, status: 'In Progress' },
    ],
  },
]; 