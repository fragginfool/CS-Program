"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Check, Trash2 } from 'lucide-react';

interface Habit {
  id: string;
  name: string;
  completedToday: boolean;
  lastCompletedDate: string | null;
}

export default function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabitName, setNewHabitName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  // Load from local storage and reset "completedToday" if a new day has started
  useEffect(() => {
    const savedHabits = localStorage.getItem('waypoint_habits');
    if (savedHabits) {
      try {
        const parsedHabits: Habit[] = JSON.parse(savedHabits);

        const today = new Date().toISOString().split('T')[0];
        const updatedHabits = parsedHabits.map(habit => {
          if (habit.lastCompletedDate !== today) {
            return { ...habit, completedToday: false };
          }
          return habit;
        });
        setHabits(updatedHabits);
      } catch (e) {
        console.error("Failed to parse habits", e);
      }
    } else {
      // Default dummy data
      setHabits([
        { id: '1', name: 'Read 20 pages', completedToday: false, lastCompletedDate: null },
        { id: '2', name: 'Drink 2L Water', completedToday: true, lastCompletedDate: new Date().toISOString().split('T')[0] },
      ]);
    }
  }, []);

  // Save to local storage whenever habits change
  useEffect(() => {
    localStorage.setItem('waypoint_habits', JSON.stringify(habits));
  }, [habits]);

  const toggleHabit = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const isCompletedNow = !habit.completedToday;
        return {
          ...habit,
          completedToday: isCompletedNow,
          lastCompletedDate: isCompletedNow ? today : habit.lastCompletedDate
        };
      }
      return habit;
    }));
  };

  const addHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;

    const newHabit: Habit = {
      id: Date.now().toString(),
      name: newHabitName.trim(),
      completedToday: false,
      lastCompletedDate: null
    };

    setHabits([...habits, newHabit]);
    setNewHabitName('');
    setIsAdding(false);
  };

  const deleteHabit = (id: string) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Daily Habits</h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="p-1 rounded-full hover:bg-gray-100 text-blue-600 transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>

      {isAdding && (
        <form onSubmit={addHabit} className="mb-4 flex gap-2">
          <input
            type="text"
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            placeholder="New habit..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            autoFocus
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </form>
      )}

      <div className="space-y-3">
        {habits.length === 0 && !isAdding && (
          <p className="text-sm text-gray-500 italic text-center py-2">No habits tracked yet.</p>
        )}

        {habits.map((habit) => (
          <div key={habit.id} className="flex items-center justify-between group">
            <div
              className="flex items-center gap-3 cursor-pointer flex-1"
              onClick={() => toggleHabit(habit.id)}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${
                  habit.completedToday
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-300 bg-gray-50 text-transparent group-hover:border-blue-400'
                }`}
              >
                <Check size={14} strokeWidth={3} />
              </div>
              <span className={`text-sm ${habit.completedToday ? 'text-gray-500 line-through' : 'text-gray-800 font-medium'}`}>
                {habit.name}
              </span>
            </div>

            <button
              onClick={() => deleteHabit(habit.id)}
              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-red-50"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
