import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { CalendarDays } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

interface LeadsTrackingDataPoint {
  month: string;
  closedWon: number;
  closedLost: number;
}

const leadsTrackingDataInitial: LeadsTrackingDataPoint[] = [
  { month: 'March', closedWon: 65, closedLost: 90 },
  { month: 'April', closedWon: 40, closedLost: 38 },
  { month: 'May', closedWon: 82, closedLost: 20 },
  { month: 'June', closedWon: 70, closedLost: 5 },
  { month: 'July', closedWon: 40, closedLost: 60 },
  { month: 'August', closedWon: 95, closedLost: 32 },
];

const ChartCard: React.FC<{ className?: string }> = ({ className }) => {
  const [timeRange, setTimeRange] = React.useState<string>('last-6-months');
  // In a real app, data would be fetched based on timeRange
  const [leadsTrackingData, setLeadsTrackingData] = React.useState<LeadsTrackingDataPoint[]>(leadsTrackingDataInitial);

  const totalClosed = leadsTrackingData.reduce((sum, item) => sum + item.closedWon, 0);
  const totalLost = leadsTrackingData.reduce((sum, item) => sum + item.closedLost, 0);
  
  return (
    <Card className={cn("w-full shadow-sm", className)}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="text-lg">Leads tracking</CardTitle>
            <div className="mt-1 flex items-baseline gap-x-2 flex-wrap">
              <span className="font-semibold text-2xl text-foreground">{totalClosed}</span> 
              <span className="text-sm text-muted-foreground">total closed</span>
              <span className="text-muted-foreground mx-1">|</span>
              <span className="font-semibold text-2xl text-foreground">{totalLost}</span> 
              <span className="text-sm text-muted-foreground">total lost</span>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-center mt-2 sm:mt-0">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-auto sm:w-[180px] bg-card text-card-foreground border-border focus:ring-ring">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-6-months">Last 6 months</SelectItem>
                <SelectItem value="last-3-months">Last 3 months</SelectItem>
                <SelectItem value="last-year">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={leadsTrackingData}
              margin={{ top: 5, right: 20, left: -25, bottom: 5 }} 
            >
              <defs>
                <linearGradient id="colorClosedWonChart" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--accent-green))" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="hsl(var(--accent-green))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorClosedLostChart" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tickFormatter={(value) => `${value}`}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                domain={[0, 'dataMax + 20']}
              />
              <RechartsTooltip
                cursor={{ stroke: 'hsl(var(--muted))', strokeWidth: 1, strokeDasharray: '3 3'}}
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                  color: 'hsl(var(--popover-foreground))'
                }}
                labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
              />
              <Area
                type="monotone"
                dataKey="closedWon"
                stroke="hsl(var(--accent-green))"
                fillOpacity={1}
                fill="url(#colorClosedWonChart)"
                strokeWidth={2.5}
                dot={{ r: 0, strokeWidth:0 }}
                activeDot={{ r: 5, stroke: 'hsl(var(--card))', strokeWidth: 2, fill: 'hsl(var(--accent-green))'}}
              />
              <Area
                type="monotone"
                dataKey="closedLost"
                stroke="hsl(var(--destructive))"
                fillOpacity={1}
                fill="url(#colorClosedLostChart)"
                strokeWidth={2.5}
                dot={{ r: 0, strokeWidth:0 }}
                activeDot={{ r: 5, stroke: 'hsl(var(--card))', strokeWidth: 2, fill: 'hsl(var(--destructive))' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center space-x-6 mt-4">
          <div className="flex items-center text-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-accent-green mr-2" />
            <span className="text-muted-foreground">Closed won</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive mr-2" />
            <span className="text-muted-foreground">Closed lost</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartCard;
