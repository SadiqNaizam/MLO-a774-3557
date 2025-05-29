import React from 'react';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { CalendarDays } from 'lucide-react';

interface PageHeaderProps {
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ className }) => {
  const [activeTab, setActiveTab] = React.useState<string>('leads');
  const [timeRange, setTimeRange] = React.useState<string>('last-6-months');

  return (
    <div className={cn("flex flex-col sm:flex-row items-center justify-between gap-4 py-4", className)}>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-card border border-border">
          <TabsTrigger value="sales" className="data-[state=active]:bg-background data-[state=active]:text-foreground">Sales</TabsTrigger>
          <TabsTrigger value="leads" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Leads</TabsTrigger>
        </TabsList>
        {/* TabsContent can be added by the parent component consuming PageHeader 
            and wanting to display different content based on activeTab */}
      </Tabs>
      <div className="flex items-center gap-2">
        <CalendarDays className="h-4 w-4 text-muted-foreground" />
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-auto sm:w-[180px] bg-card text-card-foreground border-border focus:ring-ring">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last-6-months">Last 6 months</SelectItem>
            <SelectItem value="last-3-months">Last 3 months</SelectItem>
            <SelectItem value="last-month">Last month</SelectItem>
            <SelectItem value="last-year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PageHeader;
