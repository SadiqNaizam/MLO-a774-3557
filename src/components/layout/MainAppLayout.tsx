import React from 'react';
import { cn } from '@/lib/utils';
import SidebarNav from './SidebarNav';
import TopHeader from './TopHeader';

interface MainAppLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, pageTitle = 'Dashboard' }) => {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <SidebarNav 
        className={cn(
          'fixed top-0 left-0 h-full z-20',
           'w-72' // layoutRequirements.overall.sizing.sidebar & layoutRequirements.sidebar.layout
        )}
      />
      <div className="ml-72 flex flex-col min-h-screen"> {/* Adjusted for fixed sidebar width (w-72) */}
        <TopHeader 
          pageTitle={pageTitle} 
          className={cn(
            'fixed top-0 left-72 right-0 z-10',
            'h-16' // layoutRequirements.overall.sizing.header & layoutRequirements.header.height
          )}
        />
        <main 
          className={cn(
            'flex-grow min-w-0 overflow-y-auto',
            'px-6 py-4 mt-16' // layoutRequirements.mainContent.layout & mt-16 for fixed header
          )}
        >
          {/* 
            The container "flex flex-col gap-6" described in layoutRequirements.mainContent.container
            is typically applied to the content *within* a specific page, rather than globally 
            in the layout, to allow pages to define their own top-level structure if needed.
            If all pages share this exact structure, it can be added here.
            For flexibility, it's often better if the DashboardPage (or similar) implements this.
            However, if it's a strict requirement for MainAppLayout to provide this container, it would be: 
            <div className="flex flex-col gap-6">{children}</div> 
            Based on notes, this is MainContent's container, so it should be here.
          */}
          <div className="flex flex-col gap-6"> {/* From layoutRequirements.mainContent.container */}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainAppLayout;
