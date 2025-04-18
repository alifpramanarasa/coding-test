import { salesReps } from '../mock-data';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export class ChatbotService {
  private static instance: ChatbotService;
  private salesData = salesReps;

  private constructor() {}

  public static getInstance(): ChatbotService {
    if (!ChatbotService.instance) {
      ChatbotService.instance = new ChatbotService();
    }
    return ChatbotService.instance;
  }

  public async generateResponse(query: string): Promise<string> {
    const lowerQuery = query.toLowerCase();

    // Handle revenue-related queries
    if (lowerQuery.includes('revenue')) {
      if (lowerQuery.includes('total')) {
        const totalRevenue = this.salesData.reduce((sum, rep) => sum + rep.revenue, 0);
        return `The total revenue across all sales representatives is $${totalRevenue.toLocaleString()}.`;
      } else if (lowerQuery.includes('by region')) {
        const revenueByRegion = this.salesData.reduce((acc, rep) => {
          acc[rep.region] = (acc[rep.region] || 0) + rep.revenue;
          return acc;
        }, {} as Record<string, number>);
        return `Revenue by region:\n${Object.entries(revenueByRegion)
          .map(([region, revenue]) => `${region}: $${revenue.toLocaleString()}`)
          .join('\n')}`;
      }
    }

    // Handle deals-related queries
    if (lowerQuery.includes('deal')) {
      if (lowerQuery.includes('total')) {
        const totalDeals = this.salesData.reduce((sum, rep) => sum + rep.deals, 0);
        return `There are currently ${totalDeals} active deals across all sales representatives.`;
      } else if (lowerQuery.includes('by rep')) {
        return `Deals by representative:\n${this.salesData
          .map((rep) => `${rep.name}: ${rep.deals} deals`)
          .join('\n')}`;
      }
    }

    // Handle sales rep queries
    if (lowerQuery.includes('rep') || lowerQuery.includes('representative')) {
      if (lowerQuery.includes('active')) {
        const activeReps = this.salesData.filter((rep) => rep.status === 'Active');
        return `There are ${activeReps.length} active sales representatives:\n${activeReps
          .map((rep) => `${rep.name} (${rep.region})`)
          .join('\n')}`;
      } else if (lowerQuery.includes('region')) {
        const regions = [...new Set(this.salesData.map((rep) => rep.region))];
        return `Our sales representatives are active in the following regions: ${regions.join(', ')}.`;
      }
    }

    // Handle recent deals queries
    if (lowerQuery.includes('recent') && lowerQuery.includes('deal')) {
      const recentDeals = this.salesData.flatMap((rep) =>
        rep.recentDeals.map((deal) => ({
          rep: rep.name,
          ...deal,
        }))
      );
      return `Recent deals:\n${recentDeals
        .map((deal) => `${deal.rep} - ${deal.client}: $${deal.value.toLocaleString()} (${deal.status})`)
        .join('\n')}`;
    }

    // Default response for unrecognized queries
    return `I can help you with information about:
- Total revenue and revenue by region
- Number of deals and deals by representative
- Sales representative information
- Recent deals and their status

Please ask a specific question about any of these topics.`;
  }
} 