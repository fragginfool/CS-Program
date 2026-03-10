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
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden mb-8 text-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-base">
            {post.author.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-900">{post.author}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-50">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Image / Content */}
      {post.imageUrl ? (
        <div className="w-full aspect-[4/3] bg-gray-100 flex items-center justify-center">
           {/* In a real app we'd use next/image here */}
           {/* eslint-disable-next-line @next/next/no-img-element */}
           <img src={post.imageUrl} alt="Post content" className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="px-5 pb-2">
           <p className="text-gray-800 whitespace-pre-line text-[15px] leading-relaxed">
              &quot;{post.content}&quot;
           </p>
        </div>
      )}

      {/* Footer / Caption */}
      <div className="p-5 pt-3 pb-4">
        {post.imageUrl && (
          <p className="text-[15px] leading-relaxed text-gray-800 mb-2">
            {post.content}
          </p>
        )}

        <p className="text-xs text-gray-500 mt-1 font-medium tracking-wide">
          {formatDistanceToNow(date, { addSuffix: true })}
        </p>
      </div>
    </div>
  );
}
