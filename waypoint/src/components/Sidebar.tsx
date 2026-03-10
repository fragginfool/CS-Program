import Link from 'next/link';
import { Home, CheckSquare, Target, Calendar } from 'lucide-react';

export default function Sidebar() {
  const links = [
    { href: '/', label: 'Feed', icon: Home },
    { href: '/tasks', label: 'Tasks', icon: CheckSquare },
    { href: '/goals', label: 'Goals', icon: Target },
    { href: '/calendar', label: 'Calendar', icon: Calendar },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-full shrink-0 border-r border-slate-800">
      <div className="p-6">
        <h1 className="text-2xl font-bold tracking-tight text-indigo-400">Waypoint</h1>
        <p className="text-sm text-slate-400 mt-1">Plan. Track. Capture.</p>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-slate-800 hover:text-indigo-300 transition-colors text-slate-300 font-medium"
            >
              <Icon size={20} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-semibold text-white">
            U
          </div>
          <div>
            <p className="text-sm font-medium">User</p>
            <p className="text-xs text-slate-400">user@waypoint.app</p>
          </div>
        </div>
      </div>
    </div>
  );
}
