"use client";

import React, { useEffect, useState } from 'react';
import { ActivityCalendar, ThemeInput } from 'react-activity-calendar';
import { subDays, format } from 'date-fns';

type Activity = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

// Generate some mock activity for the last 365 days
function generateMockData(): Activity[] {
  const data: Activity[] = [];
  const today = new Date();

  for (let i = 365; i >= 0; i--) {
    const date = subDays(today, i);
    // Randomize activity, with higher probability for 0
    let count = 0;
    const rand = Math.random();

    if (rand > 0.85) count = Math.floor(Math.random() * 5) + 5; // Busy day
    else if (rand > 0.6) count = Math.floor(Math.random() * 3) + 2; // Moderate day
    else if (rand > 0.4) count = 1; // Light day

    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (count > 6) level = 4;
    else if (count > 3) level = 3;
    else if (count > 1) level = 2;
    else if (count === 1) level = 1;

    data.push({
      date: format(date, 'yyyy-MM-dd'),
      count,
      level
    });
  }
  return data;
}

const theme: ThemeInput = {
  light: ['#27272a', '#047857', '#059669', '#10b981', '#34d399'],
  dark: ['#27272a', '#064e3b', '#065f46', '#047857', '#10b981'],
};

export default function ActivityHeatmap() {
  const [data, setData] = useState<Activity[]>([]);

  useEffect(() => {
    setData(generateMockData());
  }, []);

  if (data.length === 0) return null;

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 mb-8 shadow-sm">
      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-2">
          Activity Heatmap
        </h2>
        <div className="overflow-x-auto pb-2 scrollbar-hide">
          <ActivityCalendar
            data={data}
            theme={theme}
            colorScheme="dark"
            showWeekdayLabels={true}
            labels={{
              totalCount: '{{count}} activities in the last year',
            }}
          />
        </div>
      </div>
    </div>
  );
}
