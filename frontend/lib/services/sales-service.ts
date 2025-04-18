import { SalesRep } from '../mock-data';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export class SalesService {
  private static instance: SalesService;

  private constructor() {}

  public static getInstance(): SalesService {
    if (!SalesService.instance) {
      SalesService.instance = new SalesService();
    }
    return SalesService.instance;
  }

  async getSalesReps(): Promise<SalesRep[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/sales/`);
      if (!response.ok) {
        throw new Error('Failed to fetch sales representatives');
      }
      const data = await response.json();
      return data.data.map((rep: any) => ({
        id: rep.id.toString(),
        name: rep.name,
        email: `${rep.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
        region: rep.region,
        deals: rep.deals.length,
        revenue: rep.deals.reduce((sum: number, deal: any) => sum + deal.value, 0),
        status: 'Active',
        recentDeals: rep.deals.map((deal: any) => ({
          client: deal.client,
          value: deal.value,
          status: deal.status,
        })),
      }));
    } catch (error) {
      console.error('Error fetching sales representatives:', error);
      throw error;
    }
  }
} 