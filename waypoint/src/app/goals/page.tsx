'use client';

import { Plus, Target, Clock, Activity } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number; // 0 to 100
  targetDate: string;
  category: string;
  color: string;
}

const goals: Goal[] = [
  {
    id: '1',
    title: 'Launch Waypoint MVP',
    description: 'Complete core features including Tasks, Goals, and Calendar views.',
    progress: 75,
    targetDate: '2023-12-31',
    category: 'Work',
    color: 'bg-indigo-500'
  },
  {
    id: '2',
    title: 'Read 24 Books',
    description: 'Two books per month across various genres for continuous learning.',
    progress: 30,
    targetDate: '2023-12-31',
    category: 'Growth',
    color: 'bg-emerald-500'
  },
  {
    id: '3',
    title: 'Run a Half Marathon',
    description: 'Follow 12-week training plan. Current longest run: 8 miles.',
    progress: 60,
    targetDate: '2023-10-15',
    category: 'Health',
    color: 'bg-rose-500'
  },
  {
    id: '4',
    title: 'Save Emergency Fund',
    description: 'Save 6 months of living expenses in a high-yield savings account.',
    progress: 85,
    targetDate: '2023-11-30',
    category: 'Finance',
    color: 'bg-amber-500'
  }
];

export default function GoalsPage() {
  return (
    <div className="max-w-6xl mx-auto py-8 px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-100">Goals</h1>
          <p className="text-zinc-400 mt-1">Track your long-term objectives and milestones.</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors shadow-sm font-medium">
          <Plus size={20} />
          New Goal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        {goals.map((goal) => (
          <div key={goal.id} className="bg-zinc-900 rounded-xl shadow-sm border border-zinc-800 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg text-white ${goal.color}`}>
                    <Target size={20} />
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 bg-zinc-800 text-zinc-300 rounded-full">
                    {goal.category}
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-zinc-100 mb-1">{goal.title}</h3>
              <p className="text-sm text-zinc-400 mb-6 line-clamp-2 min-h-[40px]">{goal.description}</p>

              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-zinc-400">Progress</span>
                  <span className="text-zinc-200">{goal.progress}%</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-2.5 rounded-full ${goal.color}`}
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-950/50 px-6 py-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500 font-medium">
              <div className="flex items-center gap-1.5">
                <Clock size={14} />
                <span>Target: {new Date(goal.targetDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-500 cursor-pointer hover:text-emerald-400 transition-colors">
                <Activity size={14} />
                <span>View Details</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
