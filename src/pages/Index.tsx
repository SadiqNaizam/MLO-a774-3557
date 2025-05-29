import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import PageHeader from '../components/Dashboard/PageHeader';
import StatsCardGrid from '../components/Dashboard/StatsCardGrid';
import ChartCard from '../components/Dashboard/ChartCard';
import MiniStatsCard from '../components/Dashboard/MiniStatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Data for "Reasons of leads lost"
interface ReasonLost {
  id: string;
  percentage: string;
  description: string;
}

const reasonsLostData: ReasonLost[] = [
  { id: 'reason1', percentage: '40%', description: 'The proposal is unclear' },
  { id: 'reason2', percentage: '20%', description: 'However venture pursuit' },
  { id: 'reason3', percentage: '10%', description: 'Other' },
  { id: 'reason4', percentage: '30%', description: 'The proposal is unclear' }, // As per image
];

const IndexPage: React.FC = () => {
  return (
    <MainAppLayout pageTitle="Dashboard">
      {/* Page Header with Tabs and Date Picker */}
      <PageHeader />

      {/* Funnel Count and Sources Pie Chart */}
      <StatsCardGrid />

      {/* Leads Tracking Chart */}
      <ChartCard />

      {/* Reasons of leads lost and Other data section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reasons of leads lost Card */}
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Reasons of leads lost</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasonsLostData.map((reason) => (
              <div 
                key={reason.id} 
                className="p-4 bg-background rounded-lg text-center border border-border shadow-sm"
              >
                <p className="text-4xl font-bold text-foreground">{reason.percentage}</p>
                <p className="text-sm text-muted-foreground mt-1">{reason.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Other data Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground px-1 pt-1">Other data</h2> {/* Similar to CardTitle styling, px/pt to align if needed */} 
          <MiniStatsCard
            value="900"
            label="total leads count"
          />
          <MiniStatsCard
            value="12"
            label="days in average to convert lead"
          />
          <MiniStatsCard
            value="30"
            label="inactive leads"
            tooltipText="Leads with no activity in the last 30 days."
          />
        </div>
      </div>
    </MainAppLayout>
  );
};

export default IndexPage;
