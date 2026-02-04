"use client";

import { useEffect, useState } from "react";
import { getPendingComments, approveComment, denyComment } from "@/app/admin/actions";
import { format } from "date-fns";

interface Comment {
  _id: string;
  postId: string;
  name: string;
  content: string;
  createdAt: string;
}

export default function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    setLoading(true);
    const data = await getPendingComments();
    setComments(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleApprove = async (id: string) => {
    await approveComment(id);
    fetchComments();
  };

  const handleDeny = async (id: string) => {
    if (confirm("Are you sure you want to delete this comment?")) {
        await denyComment(id);
        fetchComments();
    }
  };

  if (loading) return <div className="text-gray-600 dark:text-gray-300">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Pending Comments</h1>

      {comments.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No pending comments.</p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">{comment.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    on Post ID: {comment.postId} • {format(new Date(comment.createdAt), "PPP p")}
                  </p>
                  <p className="mt-2 text-gray-700 dark:text-gray-200">{comment.content}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(comment._id)}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDeny(comment._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                  >
                    Deny
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
