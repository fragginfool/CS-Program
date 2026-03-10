'use client';

import { Target, Clock, Activity } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number; // 0 to 100
  targetDate: string;
  category: string;
  color: string;
}

const mockGoals: Goal[] = [
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
  }
];

export default function GoalsList() {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold tracking-tight text-gray-900">Goals</h2>
        <button className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockGoals.map((goal) => (
          <div key={goal.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg text-white ${goal.color}`}>
                    <Target size={16} />
                  </div>
                  <span className="text-[10px] font-medium px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                    {goal.category}
                  </span>
                </div>
              </div>

              <h3 className="text-sm font-semibold text-gray-900 mb-1">{goal.title}</h3>
              <p className="text-xs text-gray-500 mb-4 line-clamp-1">{goal.description}</p>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-500">Progress</span>
                  <span className="text-gray-900">{goal.progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-1.5 rounded-full ${goal.color}`}
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
