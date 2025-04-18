'use client';

import { Button } from '../atoms/button';
import { BarChart3, Users, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: BarChart3 },
  { name: 'Sales Reps', href: '/dashboard/reps', icon: Users },
  { name: 'AI Assistant', href: '/dashboard/ai-assistant', icon: MessageSquare }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 border-r border-slate-800 bg-gradient-to-b from-slate-950 to-slate-900 md:block">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center border-b border-slate-800 px-4 bg-slate-900/50">
          <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Sales Dashboard</h1>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={`w-full justify-start transition-all duration-200 ${
                    isActive 
                      ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20' 
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                  }`}
                >
                  <item.icon className={`mr-2 h-4 w-4 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
} 