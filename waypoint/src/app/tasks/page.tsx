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
    high: 'text-red-700 bg-red-50 border-red-200',
    medium: 'text-amber-700 bg-amber-50 border-amber-200',
    low: 'text-green-700 bg-green-50 border-green-200',
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Tasks</h1>
          <p className="text-gray-500 mt-1">Manage your day-to-day action items.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium">
          <Plus size={20} />
          New Task
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header row */}
        <div className="flex items-center px-6 py-3 border-b border-gray-200 bg-gray-50/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
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
                  className="divide-y divide-gray-100 min-h-[100px]"
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
                            snapshot.isDragging ? 'bg-white shadow-lg ring-1 ring-gray-200 z-10' : 'hover:bg-gray-50 bg-white'
                          } ${task.completed ? 'opacity-60' : ''}`}
                        >
                          <div
                            className="flex items-center justify-center w-8 h-8 -ml-2 mr-2 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 opacity-50 group-hover:opacity-100 transition-opacity"
                            {...provided.dragHandleProps}
                          >
                            <GripVertical size={18} />
                          </div>

                          <div className="flex items-center gap-4 flex-1">
                            <input
                              type="checkbox"
                              checked={task.completed}
                              onChange={() => toggleTask(task.id)}
                              className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                            />
                            <span className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                              {task.title}
                            </span>
                          </div>

                          <div className="w-32 text-sm text-gray-500">
                            {task.category}
                          </div>

                          <div className="w-32 flex items-center gap-2 text-sm text-gray-500">
                            {task.dueDate ? (
                              <>
                                <Calendar size={14} className="text-gray-400" />
                                {format(new Date(task.dueDate), 'MMM d, yyyy')}
                              </>
                            ) : (
                              <span className="text-gray-300">-</span>
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
