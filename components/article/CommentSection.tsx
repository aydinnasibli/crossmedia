"use client";

import { submitComment, getComments } from "@/app/actions";
import { useActionState, useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { az } from "date-fns/locale";

const initialState = {
  success: false,
  message: "",
};

// Define IComment interface here since we can't import Mongoose model type in client component easily
// without stricter separation, but we receive JSON data anyway.
interface CommentData {
  _id: string;
  name: string;
  avatar: string;
  content: string;
  likes: number;
  createdAt: string;
}

export function CommentSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<CommentData[]>([]);

  useEffect(() => {
    getComments(postId).then(setComments);
  }, [postId]);

  const [state, formAction, isPending] = useActionState(
    async (_prevState: typeof initialState, formData: FormData) => {
      const result = await submitComment(postId, formData);
      if (result.success) {
        // Optimistic update or refetch
        getComments(postId).then(setComments);
        // Reset form would be nice here, handled by key or ref usually
      }
      return {
        success: result.success,
        message: result.message || "",
      };
    },
    initialState
  );

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-[#111318] dark:text-white mb-6 flex items-center gap-2">
        Şərhlər{" "}
        <span className="text-sm font-normal text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
          {comments.length}
        </span>
      </h3>

      <form
        action={formAction}
        className="mb-10 bg-white dark:bg-[#1A202C] border border-[#f0f2f4] dark:border-gray-800 p-6 rounded-xl shadow-sm"
      >
        <div className="flex gap-4">
          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined">person</span>
          </div>
          <div className="flex-1">
            <textarea
              name="content"
              required
              className="w-full bg-[#f8f9fa] dark:bg-gray-800 border-none rounded-lg p-4 text-[#111318] dark:text-white placeholder:text-[#616f89] focus:ring-2 focus:ring-primary/50 resize-y min-h-[100px]"
              placeholder="Fikirlərinizi yazın..."
            ></textarea>
            <div className="flex justify-end mt-3 items-center gap-4">
              {state.message && (
                <span className="text-sm text-green-600">{state.message}</span>
              )}
              <button
                type="submit"
                disabled={isPending}
                className="bg-primary hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-lg shadow-primary/30 disabled:opacity-70"
              >
                {isPending ? "Göndərilir..." : "Göndər"}
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="flex flex-col gap-6">
        {comments.map((comment) => (
          <div key={comment._id} className="flex gap-4">
            <div
              className="size-10 rounded-full bg-gray-200 overflow-hidden shrink-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${
                  comment.avatar ||
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuABbuG7cHMZv1AKPwkzJIOpcZdD6Lo_c0IkqeuXbXFdDSvXVPBgvJ3votw72Mav_WiSJ4eq6fIlTMBwj47M2ZveowX6ndS5kFo_dFcSn9_mQDyBjuKaFFyPaRIBmeYmraS8mgWJoACge-ZUuXbMdj-EfoRhEqVOJwrkT2zguRxAL_-g5OwcpHtZBvMOGLJJADyN1iVpLoaVhqr_E1FBMpNWxU-pV0Fovwc2FTB06umgQTwj1EgPz2HMTlRmPST3MsnrNCoRp8ef3voA"
                }')`,
              }}
            ></div>
            <div className="flex-1">
              <div className="bg-[#f8f9fa] dark:bg-gray-800/50 p-4 rounded-xl rounded-tl-none">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-[#111318] dark:text-white text-sm">
                    {comment.name}
                  </span>
                  <span className="text-xs text-[#616f89]">
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                      locale: az,
                    })}
                  </span>
                </div>
                <p className="text-sm text-[#4a5568] dark:text-gray-300">
                  {comment.content}
                </p>
              </div>
              <div className="flex items-center gap-4 mt-2 pl-2">
                <button className="text-xs font-bold text-[#616f89] hover:text-primary flex items-center gap-1">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "16px" }}
                  >
                    thumb_up
                  </span>{" "}
                  Bəyən ({comment.likes || 0})
                </button>
                <button className="text-xs font-bold text-[#616f89] hover:text-primary">
                  Cavab yaz
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
