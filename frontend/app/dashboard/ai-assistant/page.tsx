import { DashboardLayout } from '../../../components/templates/dashboard-layout';
import { AIChatbot } from '../../../components/organisms/ai-chatbot';

export default function AIAssistantPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <AIChatbot />
      </div>
    </DashboardLayout>
  );
} 