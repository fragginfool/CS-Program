import { MoreHorizontal } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export interface Post {
  id: string;
  author: string;
  avatarUrl?: string;
  imageUrl?: string;
  content: string;
  createdAt: string;
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const date = new Date(post.createdAt);

  return (
    <div className="bg-zinc-900 rounded-xl shadow-sm border border-zinc-800 overflow-hidden mb-8 text-zinc-100">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-900/50 flex items-center justify-center text-emerald-400 font-semibold text-sm">
            {post.author.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-sm text-zinc-200">{post.author}</p>
          </div>
        </div>
        <button className="text-zinc-500 hover:text-zinc-300 transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Image / Content */}
      {post.imageUrl ? (
        <div className="w-full aspect-square bg-zinc-950 flex items-center justify-center">
           {/* In a real app we'd use next/image here */}
           {/* eslint-disable-next-line @next/next/no-img-element */}
           <img src={post.imageUrl} alt="Post content" className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="px-4 pb-2">
           <p className="text-zinc-300 whitespace-pre-line text-lg font-serif">
              &quot;{post.content}&quot;
           </p>
        </div>
      )}

      {/* Footer / Caption */}
      <div className="p-4 pb-2">
        {post.imageUrl && (
          <p className="text-sm text-zinc-300 mb-2">
            {post.content}
          </p>
        )}

        <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wide">
          {formatDistanceToNow(date, { addSuffix: true })}
        </p>
      </div>
    </div>
  );
}
