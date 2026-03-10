import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

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
  description: "A hub for tracking tasks, goals, appointments, and journaling in an Instagram style feed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen w-screen overflow-hidden flex bg-slate-50`}
      >
        <Sidebar />
        <main className="flex-1 h-full overflow-y-auto bg-slate-50 text-slate-900">
          {children}
        </main>
      </body>
    </html>
  );
}
