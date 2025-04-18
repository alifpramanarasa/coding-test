import { DashboardLayout } from '../../../components/templates/dashboard-layout';
import { AIChatbot } from '../../../components/organisms/ai-chatbot';

export default function AIAssistantPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">AI Sales Assistant</h2>
        <AIChatbot />
      </div>
    </DashboardLayout>
  );
} 