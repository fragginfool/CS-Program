import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import CalendarWidget from "@/components/CalendarWidget";
import HabitTracker from "@/components/HabitTracker";
import TasksList from "@/components/TasksList";
import GoalsList from "@/components/GoalsList";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Waypoint | Plan, Track, Capture",
  description: "A hub for tracking tasks, goals, appointments, and visual journaling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen w-screen overflow-hidden flex bg-gray-50 text-gray-900`}
      >
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 h-full overflow-y-auto bg-gray-50 text-gray-900 flex flex-col xl:flex-row">
          {/* Left Column Area */}
          <aside className="w-[400px] h-full border-r border-gray-200 bg-gray-50 p-6 hidden xl:block overflow-y-auto shrink-0 sticky top-0">
            <GoalsList />
            <TasksList />
          </aside>
          <div className="flex-1 max-w-4xl mx-auto w-full h-full overflow-y-auto">
            {children}
          </div>

          {/* Right Sidebar */}
          <aside className="w-80 h-full border-l border-gray-200 bg-gray-50 p-6 hidden lg:block overflow-y-auto shrink-0 sticky top-0">
            <CalendarWidget />
            <HabitTracker />
          </aside>
        </main>
      </body>
    </html>
  );
}