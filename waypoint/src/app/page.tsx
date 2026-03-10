import PostCard, { Post } from '@/components/PostCard';
import ActivityHeatmap from '@/components/ActivityHeatmap';
import { Camera } from 'lucide-react';

const mockPosts: Post[] = [
  {
    id: '1',
    author: 'Alex',
    content: 'Feeling great after finishing the weekly goals review. Momentum is building.',
    createdAt: new Date().toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '2',
    author: 'Alex',
    content: 'Just journaled about the new project phase. Clarity is key.',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: '3',
    author: 'Alex',
    content: 'Morning hike to clear the mind before a busy week.',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  }
];

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Activity Heatmap */}
      <ActivityHeatmap />

      {/* Header / Journal top */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Journal</h1>
        <button className="bg-blue-600 text-white p-3 rounded-2xl hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2">
          <Camera size={20} />
          <span className="text-sm font-medium pr-1">New Entry</span>
        </button>
      </div>

      {/* Journal list */}
      <div className="max-w-xl mx-auto space-y-8">
        {mockPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
