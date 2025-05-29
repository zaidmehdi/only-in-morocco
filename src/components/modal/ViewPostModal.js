"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import BaseModal from "./BaseModal";
import Comment from "@/components/comment/Comment";
import { toggleVote, hasVoted } from "@/lib/voteUtils";
import { formatDistanceToNow } from "date-fns";

export default function ViewPostModal({ isOpen, onClose, post }) {
  if (!isOpen || !post) return null;

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (post?.id) fetchComments();
  }, [post]);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", post.id)
      .order("created_at", { ascending: true });

    if (!error) setComments(data);
    else console.error("Failed to load comments:", error);
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const { error } = await supabase.from("comments").insert([
      {
        post_id: post.id,
        content: newComment.trim(),
      },
    ]);

    if (error) {
      console.error("Failed to add comment:", error);
      return;
    }

    setNewComment("");
    fetchComments();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
          <p className="text-sm text-gray-700 whitespace-pre-line">
            {post.body}
          </p>
        </div>

        <div className="flex items-center text-sm text-gray-500 gap-4">
          <div>
            <span className="font-medium text-gray-900">{post.votes}</span>{" "}
            upvotes
          </div>
          <div>
            <span className="text-gray-700">
              {post.created_at
                ? formatDistanceToNow(new Date(post.created_at), {
                    addSuffix: true,
                  })
                : "some time ago"}
            </span>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-sm text-gray-900">
              Comments ({comments.length})
            </h3>
          </div>

          <div className="flex gap-2 mb-4">
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 border rounded px-3 py-2 text-sm"
            />
            <button
              onClick={handleAddComment}
              className="bg-blue-600 text-white text-sm px-3 py-2 rounded hover:bg-blue-700"
            >
              Comment
            </button>
          </div>

          {comments.length > 0 ? (
            <div className="space-y-2">
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  id={comment.id}
                  content={comment.content}
                  votes={comment.votes}
                  hasVoted={hasVoted("comments", comment.id)}
                  onVoteToggle={async () => {
                    await toggleVote("comments", comment.id);
                    fetchComments();
                  }}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">No comments yet.</p>
          )}
        </div>
      </div>
    </BaseModal>
  );
}
