import PostCard, { Post } from '@/components/PostCard';
import ActivityHeatmap from '@/components/ActivityHeatmap';
import { Camera } from 'lucide-react';
import { getPosts } from '@/actions/postActions';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const postsFromDb = await getPosts();

  // Transform DB posts to match the PostCard prop type
  const posts: Post[] = postsFromDb.map(post => ({
    id: post.id,
    author: post.author,
    content: post.content,
    imageUrl: post.imageUrl || undefined,
    createdAt: post.createdAt.toISOString()
  }));

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
        {posts.length === 0 ? (
          <div className="text-center py-10 text-gray-500">No journal entries yet. Capture your first moment!</div>
        ) : (
          posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </div>
    </div>
  );
}
