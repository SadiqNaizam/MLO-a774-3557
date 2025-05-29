import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowUp, ArrowDown, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  className?: string;
  icon?: React.ReactElement;
  trend?: 'up' | 'down' | 'neutral' | null;
  trendValue?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  className,
  icon,
  trend = null,
  trendValue,
}) => {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-accent-green' : trend === 'down' ? 'text-destructive' : 'text-muted-foreground';

  return (
    <Card className={cn("w-full shadow-sm", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon && React.cloneElement(icon, { className: "h-4 w-4 text-muted-foreground" })}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && trendValue && (
          <div className="mt-1 flex items-center text-xs">
            <TrendIcon className={cn("h-4 w-4 mr-1", trendColor)} />
            <span className={cn("font-medium", trendColor)}>
              {trendValue}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
