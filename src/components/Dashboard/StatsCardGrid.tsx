import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend as RechartsLegend, Tooltip as RechartsTooltip } from 'recharts';

interface FunnelStage {
  id: string;
  name: string;
  count: number;
  valueText: string;
  daysText: string;
  color: string; // Tailwind bg color class e.g., 'bg-red-500'
  percentage: number; // for the segmented bar width
}

const funnelStagesData: FunnelStage[] = [
  { id: 'discovery', name: 'Discovery', count: 200, valueText: '$ 200', daysText: '2 days', color: 'bg-destructive', percentage: (200/390) * 100 },
  { id: 'qualified', name: 'Qualified', count: 100, valueText: '$ 100', daysText: '2 days', color: 'bg-yellow-400', percentage: (100/390) * 100 },
  { id: 'inConversation', name: 'In conversation', count: 50, valueText: '$ 100', daysText: 'average time on this stage', color: 'bg-indigo-600', percentage: (50/390) * 100 },
  { id: 'negotiations', name: 'Negotiations', count: 20, valueText: '$ 50', daysText: '8 days', color: 'bg-accent-green', percentage: (20/390) * 100 },
  { id: 'closedWonFunnel', name: 'Closed won', count: 20, valueText: '$ 50', daysText: '10 days', color: 'bg-purple-600', percentage: (20/390) * 100 },
];

interface SourceData {
  name: string;
  value: number; // For pie chart segment size
  dollarValue: number;
  percentage: number;
  color: string; // Hex color for Recharts
}

const sourcesData: SourceData[] = [
  { name: 'Clutch', value: 50, dollarValue: 3000, percentage: 50, color: 'hsl(var(--destructive))' }, 
  { name: 'Behance', value: 40, dollarValue: 1000, percentage: 40, color: '#FBBF24' }, 
  { name: 'Instagram', value: 10, dollarValue: 1000, percentage: 10, color: '#14B8A6' }, 
  { name: 'Dribbble', value: 10, dollarValue: 1000, percentage: 10, color: 'hsl(var(--accent-green))' }, 
];

type SourceViewType = 'leadsCame' | 'leadsConverted' | 'totalDealsSize';

const StatsCardGrid: React.FC<{ className?: string }> = ({ className }) => {
  const [activeSourceView, setActiveSourceView] = React.useState<SourceViewType>('leadsConverted');

  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-6", className)}>
      {/* Funnel Count Card */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Funnel count</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <span className="text-5xl font-bold text-foreground">600</span>
            <span className="ml-2 text-sm text-muted-foreground">active leads</span>
          </div>
          <div className="flex h-3 w-full rounded-full overflow-hidden mb-6 bg-muted">
            {funnelStagesData.map(stage => (
              <TooltipProvider key={stage.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={cn("h-full", stage.color)}
                      style={{ width: `${stage.percentage}%` }}
                    />
                  </TooltipTrigger>
                  <TooltipContent className="bg-popover text-popover-foreground">
                    <p>{stage.name}: {stage.count} leads</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
          <ul className="space-y-3">
            {funnelStagesData.map(stage => (
              <li key={stage.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <span className={cn("h-2.5 w-2.5 rounded-full mr-2.5", stage.color)} />
                  <span className="text-foreground">{stage.name}</span>
                </div>
                <div className="flex items-center space-x-4 text-muted-foreground">
                  <span className="w-8 text-right">{stage.count}</span>
                  <span className="w-12 text-right">{stage.valueText}</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="w-auto min-w-[50px] text-right cursor-default">
                          {stage.daysText === 'average time on this stage' ? 'Avg. time' : stage.daysText}
                        </span>
                      </TooltipTrigger>
                      {stage.daysText === 'average time on this stage' && (
                         <TooltipContent className="bg-popover text-popover-foreground"><p>Average time on this stage</p></TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Sources Pie Chart Card */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[220px] w-full mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourcesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={90}
                  innerRadius={55} 
                  fill="#8884d8"
                  dataKey="value"
                  paddingAngle={2}
                  animationDuration={800}
                >
                  {sourcesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke={'hsl(var(--card))'} strokeWidth={2} />
                  ))}
                </Pie>
                <RechartsTooltip
                  cursor={{ fill: 'hsl(var(--muted))', opacity: 0.5 }}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--popover))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                    color: 'hsl(var(--popover-foreground))'
                  }}
                  formatter={(value: number, name: string, props: { payload: SourceData}) => [`$${props.payload.dollarValue.toLocaleString()} (${props.payload.percentage}%)`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="space-y-2 mb-4">
            {sourcesData.map(source => (
              <li key={source.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <span style={{ backgroundColor: source.color }} className="h-2.5 w-2.5 rounded-sm mr-2.5" />
                  <span className="text-foreground">{source.name}</span>
                </div>
                <div className="text-muted-foreground">
                  <span className="font-medium text-foreground">${source.dollarValue.toLocaleString()}</span>
                  <span className="ml-2">{source.percentage}%</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-center space-x-1 mb-1">
            {(['leadsCame', 'leadsConverted', 'totalDealsSize'] as const).map((view) => (
              <Button
                key={view}
                variant={activeSourceView === view ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setActiveSourceView(view)}
                className={cn(
                  "text-xs px-2.5 py-1 h-auto rounded-md",
                  activeSourceView === view ? "bg-secondary text-secondary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {view === 'leadsCame' && 'Leads came'}
                {view === 'leadsConverted' && 'Leads Converted'}
                {view === 'totalDealsSize' && 'Total deals size'}
              </Button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-right">from leads total</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCardGrid;
