'use client';

import { useState } from 'react';
import { Plus, GripVertical, AlertCircle, Calendar } from 'lucide-react';
import { format } from 'date-fns';

type Priority = 'high' | 'medium' | 'low';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  dueDate?: string;
  category: string;
}

const initialTasks: Task[] = [
  { id: '1', title: 'Review Q3 goals and milestones', completed: false, priority: 'high', dueDate: new Date().toISOString(), category: 'Planning' },
  { id: '2', title: 'Schedule dentist appointment', completed: false, priority: 'medium', category: 'Personal' },
  { id: '3', title: 'Finish the presentation draft', completed: true, priority: 'high', dueDate: new Date(Date.now() - 86400000).toISOString(), category: 'Work' },
  { id: '4', title: 'Read 2 chapters of new book', completed: false, priority: 'low', category: 'Growth' },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const priorityColors = {
    high: 'text-red-500 bg-red-50 border-red-200',
    medium: 'text-amber-500 bg-amber-50 border-amber-200',
    low: 'text-emerald-500 bg-emerald-50 border-emerald-200',
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Tasks</h1>
          <p className="text-slate-500 mt-1">Manage your day-to-day action items.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors shadow-sm font-medium">
          <Plus size={20} />
          New Task
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Header row */}
        <div className="flex items-center px-6 py-3 border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <div className="w-8"></div>
          <div className="flex-1">Task</div>
          <div className="w-32">Category</div>
          <div className="w-32">Due Date</div>
          <div className="w-24">Priority</div>
        </div>

        {/* Task list */}
        <div className="divide-y divide-slate-100">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center px-6 py-4 hover:bg-slate-50 transition-colors group ${task.completed ? 'opacity-60' : ''}`}
            >
              <div className="flex items-center gap-3 w-8">
                <GripVertical size={16} className="text-slate-300 opacity-0 group-hover:opacity-100 cursor-grab" />
              </div>

              <div className="flex items-center gap-4 flex-1">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
                />
                <span className={`font-medium ${task.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                  {task.title}
                </span>
              </div>

              <div className="w-32 text-sm text-slate-600">
                {task.category}
              </div>

              <div className="w-32 flex items-center gap-2 text-sm text-slate-600">
                {task.dueDate ? (
                  <>
                    <Calendar size={14} className="text-slate-400" />
                    {format(new Date(task.dueDate), 'MMM d, yyyy')}
                  </>
                ) : (
                  <span className="text-slate-400">-</span>
                )}
              </div>

              <div className="w-24">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${priorityColors[task.priority]}`}>
                  <AlertCircle size={12} />
                  <span className="capitalize">{task.priority}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
