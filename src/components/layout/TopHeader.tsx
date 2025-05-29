import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronDown, Plus, User as UserIcon, Settings, LogOut, LifeBuoy } from 'lucide-react';

interface TopHeaderProps {
  pageTitle: string;
  className?: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({ pageTitle, className }) => {
  return (
    <header
      className={cn(
        'h-16 flex items-center justify-between px-6 bg-card border-b border-border', // Per layoutRequirements.header (bg-surface is card, added border)
        className
      )}
    >
      <h1 className="text-2xl font-semibold text-foreground">{pageTitle}</h1>
      
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default">
              Create
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>New Record</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Plus className="mr-2 h-4 w-4" />
              <span>New Lead</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Plus className="mr-2 h-4 w-4" />
              <span>New Proposal</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Plus className="mr-2 h-4 w-4" />
              <span>New Item</span>
            </DropdownMenuItem>
             <DropdownMenuItem>
              <Plus className="mr-2 h-4 w-4" />
              <span>New Customer</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button 
              className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="User menu"
            >
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://cdn.dribbble.com/users/1040983/screenshots/5822609/media/f035e2934bd076897f18812231770976.png?compress=1&resize=400x300" alt="User Avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LifeBuoy className="mr-2 h-4 w-4" />
              <span>Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;
