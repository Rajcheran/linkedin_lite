import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Post, Comment } from '../types';
import { useAuth } from '../context/AuthContext';
import { postsAPI } from '../services/api';

interface PostCardProps {
  post: Post;
  onPostUpdate?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onPostUpdate }) => {
  const { user } = useAuth();
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(post.likes.includes(user?.id || ''));
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>(post.comments);
  const [loading, setLoading] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}m ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}d ago`;
    }
  };

  const handleLike = async () => {
    try {
      const result = await postsAPI.likePost(post._id);
      setLikes(result.likes);
      setIsLiked(result.isLiked);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      setLoading(true);
      const updatedComments = await postsAPI.addComment(post._id, comment);
      setComments(updatedComments);
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postsAPI.deletePost(post._id);
        if (onPostUpdate) {
          onPostUpdate();
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">
              {post.author.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <Link
              to={`/profile/${post.author.id}`}
              className="font-semibold text-gray-900 hover:text-blue-600"
            >
              {post.author.name}
            </Link>
            <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
          </div>
        </div>
        {user?.id === post.author.id && (
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            Delete
          </button>
        )}
      </div>

      <div className="mt-4">
        <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
      </div>

      <div className="mt-4 flex items-center space-x-6 text-sm text-gray-500">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-1 hover:text-blue-600 ${
            isLiked ? 'text-blue-600' : ''
          }`}
        >
          <svg className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span>{likes} {likes === 1 ? 'like' : 'likes'}</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-1 hover:text-blue-600"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>{comments.length} {comments.length === 1 ? 'comment' : 'comments'}</span>
        </button>
      </div>

      {showComments && (
        <div className="mt-4 border-t pt-4">
          <form onSubmit={handleAddComment} className="mb-4">
            <div className="flex space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {user?.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !comment.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Posting...' : 'Post'}
              </button>
            </div>
          </form>

          <div className="space-y-3">
            {comments.map((comment) => (
              <div key={comment._id} className="flex space-x-3">
                <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {comment.user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-100 rounded-lg px-3 py-2">
                    <p className="font-semibold text-sm text-gray-900">{comment.user.name}</p>
                    <p className="text-gray-800">{comment.text}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(comment.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;