import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { menuConfig, type RouteItem } from '@/types/routes';
import { ChevronDown, ChevronRight } from 'lucide-react';

export function Sidebar() {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Auto-expand menus based on current route
  useEffect(() => {
    const newExpanded: string[] = [];
    
    // Check if current path matches any menu item and expand its parents
    menuConfig.routes.forEach(route => {
      if (location.pathname.startsWith(route.path)) {
        newExpanded.push(route.path);
        
        route.children?.forEach(child => {
          if (location.pathname.startsWith(child.path)) {
            newExpanded.push(child.path);
          }
        });
      }
    });
    
    setExpandedItems(newExpanded);
  }, [location.pathname]);

  const toggleExpanded = (path: string) => {
    setExpandedItems(prev =>
      prev.includes(path)
        ? prev.filter(item => item !== path)
        : [...prev, path]
    );
  };

  const renderMenuItem = (item: RouteItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.path);
    const isActive = location.pathname === item.path;
    
    const IconComponent = item.icon as React.ComponentType<{ className?: string }>;

    return (
      <div key={item.path} className={cn(level > 0 ? "mx-4" : "w-full")}>
        {hasChildren ? (
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-2 font-medium text-foreground/80 hover:text-foreground hover:bg-accent/20 bg-transparent border-l-2 border-transparent",
              isActive && "bg-accent text-accent-foreground hover:bg-accent",
              level === 0 && "text-sm font-semibold text-foreground/90 pl-4",
              level === 1 && "text-sm font-medium pl-6",
              level >= 2 && "text-xs font-normal pl-8"
            )}
            onClick={() => toggleExpanded(item.path)}
          >
            {IconComponent && <IconComponent className={cn("h-4 w-4", level > 0 && "h-3 w-3")} />}
            {isExpanded ? (
              <ChevronDown className={cn("h-4 w-4", level > 0 && "h-3 w-3")} />
            ) : (
              <ChevronRight className={cn("h-4 w-4", level > 0 && "h-3 w-3")} />
            )}
            <span>{item.title}</span>
          </Button>
        ) : (
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-2 font-normal text-muted-foreground hover:text-foreground/90 hover:bg-accent/25 bg-transparent border-l-2 border-transparent hover:border-accent/50",
              isActive && "bg-accent text-accent-foreground hover:bg-accent border-accent",
              level > 0 && "text-xs pl-6",
              level === 1 && "pl-6",
              level >= 2 && "pl-8"
            )}
            asChild
          >
            <Link to={item.path}>
              {IconComponent && <IconComponent className={cn("h-4 w-4", level > 0 && "h-3 w-3")} />}
              <span>{item.title}</span>
            </Link>
          </Button>
        )}
        
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children!.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 bg-muted/25 border-r border-border h-full overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border hover:scrollbar-thumb-accent/50 transition-colors">
      <div className="p-4 border-b border-border">
        <h1 className="text-xl font-bold text-foreground">VyOS 管理系统</h1>
      </div>
      <nav className="px-4 py-4 space-y-1">
        {menuConfig.routes.map(route => renderMenuItem(route))}
      </nav>
    </div>
  );
}