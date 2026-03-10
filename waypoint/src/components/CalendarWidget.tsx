"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';

export default function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });

  // Add padding for the first day of the month
  const firstDayOfWeek = start.getDay();
  const paddingDays = Array.from({ length: firstDayOfWeek }).map((_, i) => null);

  const allDays = [...paddingDays, ...days];

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={prevMonth}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextMonth}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500 mb-2">
        <div>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {allDays.map((day, idx) => {
          if (!day) return <div key={`empty-${idx}`} className="h-8"></div>;

          const isCurrentDay = isToday(day);

          return (
            <div
              key={day.toISOString()}
              className={`h-8 w-8 mx-auto flex items-center justify-center rounded-full text-sm ${
                isCurrentDay
                  ? 'bg-blue-600 text-white font-medium shadow-md shadow-blue-200'
                  : 'text-gray-700 hover:bg-blue-50 cursor-pointer transition-colors'
              }`}
            >
              {format(day, 'd')}
            </div>
          );
        })}
      </div>
    </div>
  );
}
