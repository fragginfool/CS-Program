import Link from 'next/link';
import { Home, CheckSquare, Target, Calendar } from 'lucide-react';

export default function Sidebar() {
  const links = [
    { href: '/', label: 'Journal', icon: Home },
    { href: '/tasks', label: 'Tasks', icon: CheckSquare },
    { href: '/goals', label: 'Goals', icon: Target },
    { href: '/calendar', label: 'Calendar', icon: Calendar },
  ];

  return (
    <div className="w-64 bg-zinc-950 text-white flex flex-col h-full shrink-0 border-r border-zinc-900">
      <div className="p-6">
        <h1 className="text-2xl font-bold tracking-tight text-emerald-500">Waypoint</h1>
        <p className="text-sm text-zinc-400 mt-1">Plan. Track. Capture.</p>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-zinc-900 hover:text-emerald-400 transition-colors text-zinc-300 font-medium"
            >
              <Icon size={20} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-zinc-900">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-semibold text-white">
            U
          </div>
          <div>
            <p className="text-sm font-medium">User</p>
            <p className="text-xs text-zinc-400">user@waypoint.app</p>
          </div>
        </div>
      </div>
    </div>
  );
}
