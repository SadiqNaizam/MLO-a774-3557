import React from 'react';
import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface MiniStatsCardProps {
  value: string | number;
  label: string;
  className?: string;
  tooltipText?: string;
}

const MiniStatsCard: React.FC<MiniStatsCardProps> = ({
  value,
  label,
  className,
  tooltipText,
}) => {
  return (
    <div className={cn("text-center p-4 bg-card rounded-lg shadow-sm", className)}>
      <p className="text-3xl font-semibold text-foreground">{value}</p>
      <div className="flex items-center justify-center text-sm text-muted-foreground mt-1">
        <span>{label}</span>
        {tooltipText && (
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-3.5 w-3.5 ml-1.5 cursor-help text-muted-foreground hover:text-foreground transition-colors" />
              </TooltipTrigger>
              <TooltipContent className="bg-popover text-popover-foreground">
                <p>{tooltipText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
};

export default MiniStatsCard;
