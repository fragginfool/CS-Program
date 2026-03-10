'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { format, addDays, startOfWeek, addWeeks, subWeeks } from 'date-fns';

interface Appointment {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  location?: string;
  type: 'meeting' | 'personal' | 'focus';
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const nextWeek = () => setCurrentDate(addWeeks(currentDate, 1));
  const prevWeek = () => setCurrentDate(subWeeks(currentDate, 1));
  const today = () => setCurrentDate(new Date());

  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start on Monday
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));

  const mockAppointments: Appointment[] = [
    {
      id: '1',
      title: 'Team Sync',
      date: addDays(startDate, 1), // Tuesday
      startTime: '10:00 AM',
      endTime: '11:00 AM',
      location: 'Zoom',
      type: 'meeting'
    },
    {
      id: '2',
      title: 'Deep Work: Waypoint Features',
      date: addDays(startDate, 2), // Wednesday
      startTime: '1:00 PM',
      endTime: '4:00 PM',
      type: 'focus'
    },
    {
      id: '3',
      title: 'Gym Session',
      date: addDays(startDate, 3), // Thursday
      startTime: '7:00 AM',
      endTime: '8:30 AM',
      location: 'Local Gym',
      type: 'personal'
    },
    {
      id: '4',
      title: 'Lunch with Sarah',
      date: addDays(startDate, 4), // Friday
      startTime: '12:30 PM',
      endTime: '1:30 PM',
      location: 'Downtown Cafe',
      type: 'personal'
    }
  ];

  const typeStyles = {
    meeting: 'bg-blue-950/30 border-blue-900 text-blue-400',
    personal: 'bg-emerald-950/30 border-emerald-900 text-emerald-400',
    focus: 'bg-purple-950/30 border-purple-900 text-purple-400'
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-8 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8 flex-shrink-0">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-100">Calendar</h1>
          <p className="text-zinc-400 mt-1">Schedule your time effectively.</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors shadow-sm font-medium">
          <Plus size={20} />
          New Event
        </button>
      </div>

      <div className="bg-zinc-900 rounded-xl shadow-sm border border-zinc-800 flex flex-col flex-1 overflow-hidden min-h-[600px]">
        {/* Calendar Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-zinc-100">
              {format(startDate, 'MMMM yyyy')}
            </h2>
            <div className="flex items-center bg-zinc-800 rounded-md p-1">
              <button onClick={prevWeek} className="p-1 hover:bg-zinc-700 rounded text-zinc-400 shadow-sm transition-all"><ChevronLeft size={20} /></button>
              <button onClick={today} className="px-3 py-1 text-sm font-medium text-zinc-300 hover:text-emerald-400">Today</button>
              <button onClick={nextWeek} className="p-1 hover:bg-zinc-700 rounded text-zinc-400 shadow-sm transition-all"><ChevronRight size={20} /></button>
            </div>
          </div>
          <div className="flex bg-zinc-800 p-1 rounded-md text-sm font-medium">
            <button className="px-3 py-1 bg-zinc-700 shadow-sm rounded text-zinc-100">Week</button>
            <button className="px-3 py-1 text-zinc-400 hover:text-zinc-200">Month</button>
          </div>
        </div>

        {/* Weekly View Grid */}
        <div className="flex-1 flex flex-col">
          {/* Days header */}
          <div className="grid grid-cols-7 border-b border-zinc-800 bg-zinc-950/50">
            {weekDays.map((day, i) => (
              <div key={i} className="px-4 py-3 text-center border-r border-zinc-800 last:border-0">
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-1">
                  {format(day, 'EEE')}
                </span>
                <span className={`text-lg font-medium w-8 h-8 flex items-center justify-center mx-auto rounded-full ${format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') ? 'bg-emerald-600 text-white' : 'text-zinc-200'}`}>
                  {format(day, 'd')}
                </span>
              </div>
            ))}
          </div>

          {/* Agenda view for the week */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider border-b border-zinc-800 pb-2">Upcoming this week</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {mockAppointments.map((apt) => (
                <div key={apt.id} className={`p-4 rounded-lg border flex gap-4 ${typeStyles[apt.type]}`}>
                  <div className="flex flex-col items-center justify-center bg-zinc-900/50 rounded-md px-3 py-2 min-w-[80px]">
                    <span className="text-sm font-bold">{format(apt.date, 'MMM')}</span>
                    <span className="text-xl font-bold">{format(apt.date, 'd')}</span>
                  </div>

                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-1">{apt.title}</h4>

                    <div className="flex items-center gap-4 text-sm opacity-80 mt-2">
                      <div className="flex items-center gap-1.5">
                        <Clock size={16} />
                        <span>{apt.startTime} - {apt.endTime}</span>
                      </div>

                      {apt.location && (
                        <div className="flex items-center gap-1.5">
                          <MapPin size={16} />
                          <span>{apt.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {mockAppointments.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-zinc-500">
                <CalendarIcon size={48} className="text-zinc-700 mb-4" />
                <p className="text-lg">No appointments this week.</p>
                <p className="text-sm">Enjoy your free time or schedule something new!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
