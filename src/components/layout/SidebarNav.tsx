import React from 'react';
import { cn } from '@/lib/utils';
import {
  LayoutGrid,
  Users,
  FileText,
  FileSignature,
  ShoppingCart,
  Mail as MailIcon,
  Archive,
  CalendarDays,
  HelpCircle,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  Briefcase, // Using Briefcase as an example for 'B' in BO logo
  CircleDot // Using CircleDot as an example for 'O' in BO logo
} from 'lucide-react';

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ElementType; // Lucide icons are components
  active?: boolean;
  disabled?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, label, icon: Icon, active, disabled }) => {
  return (
    <li>
      <a
        href={disabled ? undefined : href}
        className={cn(
          'flex items-center py-2.5 px-4 rounded-md text-sm font-medium transition-colors',
          'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:outline-none focus:ring-2 focus:ring-sidebar-ring',
          active
            ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'
            : 'text-sidebar-foreground',
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        )}
        aria-current={active ? 'page' : undefined}
      >
        <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
        {label}
      </a>
    </li>
  );
};

interface NavSection {
  items: NavItemProps[];
}

const navigationSections: NavSection[] = [
  {
    items: [
      { label: 'Dashboard', href: '#', icon: LayoutGrid, active: true },
      { label: 'Leads', href: '#', icon: Users },
      { label: 'Customers', href: '#', icon: Users },
    ],
  },
  {
    items: [
      { label: 'Proposals', href: '#', icon: FileSignature },
      { label: 'Invoices', href: '#', icon: FileText },
      { label: 'Items', href: '#', icon: ShoppingCart },
    ],
  },
  {
    items: [
      { label: 'Mail', href: '#', icon: MailIcon },
      { label: 'Shoebox', href: '#', icon: Archive },
      { label: 'Calendar', href: '#', icon: CalendarDays },
    ],
  },
];

const bottomNavigationItems: NavItemProps[] = [
  { label: 'Help', href: '#', icon: HelpCircle },
  { label: 'Settings', href: '#', icon: SettingsIcon },
];

interface SidebarNavProps {
  className?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ className }) => {
  return (
    <aside
      className={cn(
        'w-72 bg-sidebar text-sidebar-foreground flex flex-col h-screen', // As per layoutRequirements.sidebar & overall.sizing.sidebar
        className
      )}
    >
      <div className="flex items-center h-16 px-4 border-b border-sidebar-border flex-shrink-0">
        {/* Logo placeholder - resembles image with hamburger and BO */} 
        <MenuIcon className="h-6 w-6 text-sidebar-foreground mr-3" />
        <div className="flex items-center">
          <Briefcase className="h-6 w-6 text-primary" /> 
          <CircleDot className="h-6 w-6 text-primary -ml-1" /> 
        </div>
        {/* Fallback text logo if icons are not preferred for "BO" */}
        {/* <span className="text-xl font-bold text-foreground">BO</span> */}
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {navigationSections.map((section, sectionIndex) => (
          <ul key={`section-${sectionIndex}`} className="space-y-1">
            {section.items.map((item) => (
              <NavItem key={item.label} {...item} />
            ))}
          </ul>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border flex-shrink-0">
        <ul className="space-y-1">
          {bottomNavigationItems.map((item) => (
            <NavItem key={item.label} {...item} />
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default SidebarNav;
