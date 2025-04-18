import { Button } from '../atoms/button';
import { Bell, Search } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
      <div className="flex h-16 items-center gap-4 px-4">
        <div className="flex flex-1 items-center gap-4">
          <form className="flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="search"
                placeholder="Search..."
                className="w-full rounded-md border border-slate-800 bg-slate-900 pl-8 pr-4 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 transition-all duration-200 hover:border-slate-700"
              />
            </div>
          </form>
        </div>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hover:bg-slate-800/50 text-slate-400 hover:text-slate-200">
            <Bell className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3 border-l border-slate-800 pl-4">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center ring-1 ring-blue-500/20">
              <span className="text-sm font-medium text-blue-400">JD</span>
            </div>
            <span className="text-sm font-medium text-slate-200">John Doe</span>
          </div>
        </nav>
      </div>
    </header>
  );
} 