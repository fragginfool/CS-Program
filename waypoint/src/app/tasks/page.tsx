'use client';

import { useState, useEffect } from 'react';
import { Plus, GripVertical, AlertCircle, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  };

  const priorityColors = {
    high: 'text-red-400 bg-red-950/30 border-red-900',
    medium: 'text-amber-400 bg-amber-950/30 border-amber-900',
    low: 'text-emerald-400 bg-emerald-950/30 border-emerald-900',
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-100">Tasks</h1>
          <p className="text-zinc-400 mt-1">Manage your day-to-day action items.</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors shadow-sm font-medium">
          <Plus size={20} />
          New Task
        </button>
      </div>

      <div className="bg-zinc-900 rounded-xl shadow-sm border border-zinc-800 overflow-hidden">
        {/* Header row */}
        <div className="flex items-center px-6 py-3 border-b border-zinc-800 bg-zinc-950/50 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
          <div className="w-8"></div>
          <div className="flex-1">Task</div>
          <div className="w-32">Category</div>
          <div className="w-32">Due Date</div>
          <div className="w-24">Priority</div>
        </div>

        {/* Task list */}
        {mounted && (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="tasks-list">
              {(provided) => (
                <div
                  className="divide-y divide-zinc-800/50 min-h-[100px]"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`flex items-center px-6 py-4 transition-colors group ${
                            snapshot.isDragging ? 'bg-zinc-800 shadow-md ring-1 ring-zinc-700' : 'hover:bg-zinc-800/50 bg-zinc-900'
                          } ${task.completed ? 'opacity-60' : ''}`}
                        >
                          <div
                            className="flex items-center justify-center w-8 h-8 -ml-2 mr-2 cursor-grab active:cursor-grabbing text-zinc-600 hover:text-zinc-400 opacity-50 group-hover:opacity-100 transition-opacity"
                            {...provided.dragHandleProps}
                          >
                            <GripVertical size={18} />
                          </div>

                          <div className="flex items-center gap-4 flex-1">
                            <input
                              type="checkbox"
                              checked={task.completed}
                              onChange={() => toggleTask(task.id)}
                              className="w-5 h-5 rounded border-zinc-700 bg-zinc-900 text-emerald-600 focus:ring-emerald-600 focus:ring-offset-zinc-900 cursor-pointer"
                            />
                            <span className={`font-medium ${task.completed ? 'line-through text-zinc-500' : 'text-zinc-200'}`}>
                              {task.title}
                            </span>
                          </div>

                          <div className="w-32 text-sm text-zinc-400">
                            {task.category}
                          </div>

                          <div className="w-32 flex items-center gap-2 text-sm text-zinc-400">
                            {task.dueDate ? (
                              <>
                                <Calendar size={14} className="text-zinc-500" />
                                {format(new Date(task.dueDate), 'MMM d, yyyy')}
                              </>
                            ) : (
                              <span className="text-zinc-600">-</span>
                            )}
                          </div>

                          <div className="w-24">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${priorityColors[task.priority]}`}>
                              <AlertCircle size={12} />
                              <span className="capitalize">{task.priority}</span>
                            </span>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    </div>
  );
}
