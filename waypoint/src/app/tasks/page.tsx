'use client';

import { useState, useEffect, useTransition } from 'react';
import { Plus, GripVertical, AlertCircle, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { getTasks, addTask, toggleTaskStatus, updateTaskOrder } from '@/actions/taskActions';

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    setMounted(true);
    fetchTasks();
  }, []);

  const toggleTask = (id: string, currentStatus: string) => {
    // Optimistic UI
    setTasks(tasks.map(t => t.id === id ? { ...t, status: currentStatus === 'done' ? 'todo' : 'done' } : t));

    startTransition(async () => {
      await toggleTaskStatus(id, currentStatus);
      await fetchTasks();
    });
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update order values sequentially
    const updatedItems = items.map((item, index) => ({ ...item, order: index }));
    setTasks(updatedItems);

    startTransition(async () => {
      await updateTaskOrder(updatedItems.map(item => ({ id: item.id, order: item.order })));
      await fetchTasks();
    });
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const title = newTaskTitle.trim();
    setNewTaskTitle('');
    setIsAdding(false);

    startTransition(async () => {
      await addTask(title, "Medium"); // Default priority
      await fetchTasks();
    });
  };

  const getPriorityColor = (priority: string) => {
    const p = priority.toLowerCase();
    if (p === 'high') return 'text-red-700 bg-red-50 border-red-200';
    if (p === 'medium') return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-green-700 bg-green-50 border-green-200';
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Tasks</h1>
          <p className="text-gray-500 mt-1">Manage your day-to-day action items.</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
        >
          <Plus size={20} />
          New Task
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddTask} className="mb-6 flex gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
            autoFocus
          />
          <button
            type="submit"
            disabled={isPending}
            className="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            Save
          </button>
        </form>
      )}

      <div className={`bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden ${isPending ? 'opacity-70' : ''}`}>
        {/* Header row */}
        <div className="flex items-center px-6 py-3 border-b border-gray-200 bg-gray-50/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <div className="w-8"></div>
          <div className="flex-1">Task</div>
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
                  {tasks.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No tasks found. Add one above!</div>
                  ) : (
                    tasks.map((task, index) => {
                      const isCompleted = task.status === 'done';
                      return (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`flex items-center px-6 py-4 transition-colors group ${
                                snapshot.isDragging ? 'bg-white shadow-lg ring-1 ring-gray-200 z-10' : 'hover:bg-gray-50 bg-white'
                              } ${isCompleted ? 'opacity-60' : ''}`}
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
                                  checked={isCompleted}
                                  onChange={() => toggleTask(task.id, task.status)}
                                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                />
                                <span className={`font-medium ${isCompleted ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                                  {task.title}
                                </span>
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
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                                  <AlertCircle size={12} />
                                  <span className="capitalize">{task.priority}</span>
                                </span>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    })
                  )}
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
