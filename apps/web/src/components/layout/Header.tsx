import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { menuConfig } from '@/types/routes';
import { User, Settings, Bell } from 'lucide-react';

export function Header() {
  const location = useLocation();

  const findRouteTitle = (pathname: string): string => {
    for (const route of menuConfig.routes) {
      if (pathname === route.path) return route.title;
      if (route.children) {
        for (const child of route.children) {
          if (pathname === child.path) return child.title;
          if (child.children) {
            for (const grandchild of child.children) {
              if (pathname === grandchild.path) return grandchild.title;
            }
          }
        }
      }
    }
    return '页面';
  };

  return (
    <header className="bg-background border-b border-border px-6 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-semibold">{findRouteTitle(location.pathname)}</h2>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}