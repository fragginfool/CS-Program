import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export interface Post {
  id: string;
  author: string;
  avatarUrl?: string;
  imageUrl?: string;
  content: string;
  createdAt: string;
  likes: number;
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const date = new Date(post.createdAt);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-sm">
            {post.author.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-sm">{post.author}</p>
          </div>
        </div>
        <button className="text-slate-400 hover:text-slate-600">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Image / Content */}
      {post.imageUrl ? (
        <div className="w-full aspect-square bg-slate-100 flex items-center justify-center">
           {/* In a real app we'd use next/image here */}
           {/* eslint-disable-next-line @next/next/no-img-element */}
           <img src={post.imageUrl} alt="Post content" className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="px-4 pb-2">
           <p className="text-slate-800 whitespace-pre-line text-lg font-serif">
              &quot;{post.content}&quot;
           </p>
        </div>
      )}

      {/* Actions */}
      <div className="p-4 pb-2">
        <div className="flex items-center gap-4 mb-3">
          <button className="text-slate-800 hover:text-slate-500 transition-colors">
            <Heart size={24} />
          </button>
          <button className="text-slate-800 hover:text-slate-500 transition-colors">
            <MessageCircle size={24} />
          </button>
          <button className="text-slate-800 hover:text-slate-500 transition-colors">
            <Share2 size={24} />
          </button>
        </div>

        <p className="font-semibold text-sm mb-1">{post.likes} likes</p>

        {post.imageUrl && (
          <p className="text-sm">
            <span className="font-semibold mr-2">{post.author}</span>
            {post.content}
          </p>
        )}

        <p className="text-xs text-slate-500 mt-2 uppercase tracking-wide">
          {formatDistanceToNow(date, { addSuffix: true })}
        </p>
      </div>
    </div>
  );
}
