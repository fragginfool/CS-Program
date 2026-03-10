import PostCard, { Post } from '@/components/PostCard';
import { Camera } from 'lucide-react';

const mockPosts: Post[] = [
  {
    id: '1',
    author: 'Alex',
    content: 'Feeling great after finishing the weekly goals review. Momentum is building.',
    createdAt: new Date().toISOString(),
    likes: 12,
    imageUrl: 'https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '2',
    author: 'Sam',
    content: 'Just journaled about the new project phase. Clarity is key.',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    likes: 5,
  },
  {
    id: '3',
    author: 'Alex',
    content: 'Morning hike to clear the mind before a busy week.',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    likes: 24,
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  }
];

export default function Home() {
  return (
    <div className="max-w-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Header / Feed top */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Your Journey</h1>
        <button className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors shadow-sm">
          <Camera size={20} />
        </button>
      </div>

      {/* Feed list */}
      <div className="space-y-8">
        {mockPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
