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
    meeting: 'bg-blue-50 border-blue-200 text-blue-700',
    personal: 'bg-green-50 border-green-200 text-green-700',
    focus: 'bg-purple-50 border-purple-200 text-purple-700'
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-8 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8 flex-shrink-0">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Calendar</h1>
          <p className="text-gray-500 mt-1">Schedule your time effectively.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium">
          <Plus size={20} />
          New Event
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col flex-1 overflow-hidden min-h-[600px]">
        {/* Calendar Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {format(startDate, 'MMMM yyyy')}
            </h2>
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button onClick={prevWeek} className="p-1 hover:bg-white hover:shadow-sm rounded text-gray-600 transition-all"><ChevronLeft size={20} /></button>
              <button onClick={today} className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-blue-600">Today</button>
              <button onClick={nextWeek} className="p-1 hover:bg-white hover:shadow-sm rounded text-gray-600 transition-all"><ChevronRight size={20} /></button>
            </div>
          </div>
          <div className="flex bg-gray-100 p-1 rounded-lg text-sm font-medium">
            <button className="px-3 py-1 bg-white shadow-sm rounded-md text-gray-900">Week</button>
            <button className="px-3 py-1 text-gray-600 hover:text-gray-900">Month</button>
          </div>
        </div>

        {/* Weekly View Grid */}
        <div className="flex-1 flex flex-col">
          {/* Days header */}
          <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50/50">
            {weekDays.map((day, i) => (
              <div key={i} className="px-4 py-3 text-center border-r border-gray-200 last:border-0">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">
                  {format(day, 'EEE')}
                </span>
                <span className={`text-lg font-medium w-8 h-8 flex items-center justify-center mx-auto rounded-full ${format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-700'}`}>
                  {format(day, 'd')}
                </span>
              </div>
            ))}
          </div>

          {/* Agenda view for the week */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100 pb-2">Upcoming this week</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {mockAppointments.map((apt) => (
                <div key={apt.id} className={`p-4 rounded-xl border flex gap-4 ${typeStyles[apt.type]}`}>
                  <div className="flex flex-col items-center justify-center bg-white/60 rounded-lg px-3 py-2 min-w-[80px]">
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
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <CalendarIcon size={48} className="text-gray-300 mb-4" />
                <p className="text-lg text-gray-500 font-medium">No appointments this week.</p>
                <p className="text-sm">Enjoy your free time or schedule something new!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
