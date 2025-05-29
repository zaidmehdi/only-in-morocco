"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import BaseModal from "./BaseModal";
import Comment from "@/components/comment/Comment";
import { toggleVote, hasVoted } from "@/lib/voteUtils";
import { formatDistanceToNow } from "date-fns";

export default function ViewPostModal({ isOpen, onClose, post }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentName, setCommentName] = useState("Anonymous");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [replyName, setReplyName] = useState("Anonymous");
  const [expandedComments, setExpandedComments] = useState(new Set());
  const postIdRef = useRef(post?.id);

  useEffect(() => {
    postIdRef.current = post?.id;
  }, [post?.id]);

  useEffect(() => {
    async function fetchComments() {
      if (!postIdRef.current) return;
      
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", postIdRef.current)
        .order("created_at", { ascending: false });

      if (!error) {
        // Organize comments into top-level and replies
        const topLevelComments = data.filter(comment => !comment.parent_id)
          .sort((a, b) => {
            // First sort by votes (descending - highest votes first)
            if (b.votes !== a.votes) {
              return b.votes - a.votes;
            }
            // Then sort by created_at (descending - newest first as tiebreaker)
            return new Date(b.created_at) - new Date(a.created_at);
          });
        const replies = data.filter(comment => comment.parent_id);
        
        // Attach replies to their parent comments, sorting replies oldest first
        const commentsWithReplies = topLevelComments.map(comment => ({
          ...comment,
          replies: replies
            .filter(reply => reply.parent_id === comment.id)
            .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
        }));
        
        setComments(commentsWithReplies);
      } else {
        console.error("Failed to load comments:", error);
      }
    }

    if (post?.id) {
      fetchComments();
    }
  }, [post?.id]);

  const handleAddComment = async () => {
    if (!newComment.trim() || !post?.id) return;

    const name = commentName.trim() || "Anonymous";

    const { error } = await supabase.from("comments").insert([
      {
        post_id: post.id,
        content: newComment.trim(),
        name: name,
        parent_id: null, // Top-level comment
      },
    ]);

    if (error) {
      console.error("Failed to add comment:", error);
      return;
    }

    setNewComment("");
    setCommentName("Anonymous");
    // Fetch comments again
    const { data, error: fetchError } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", post.id)
      .order("created_at", { ascending: false });

    if (!fetchError) {
      const topLevelComments = data.filter(comment => !comment.parent_id)
        .sort((a, b) => {
          // First sort by votes (descending - highest votes first)
          if (b.votes !== a.votes) {
            return b.votes - a.votes;
          }
          // Then sort by created_at (descending - newest first as tiebreaker)
          return new Date(b.created_at) - new Date(a.created_at);
        });
      const replies = data.filter(comment => comment.parent_id);
      const commentsWithReplies = topLevelComments.map(comment => ({
        ...comment,
        replies: replies
          .filter(reply => reply.parent_id === comment.id)
          .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      }));
      setComments(commentsWithReplies);
    }
  };

  const handleAddReply = async () => {
    if (!replyContent.trim() || !replyingTo || !post?.id) return;

    const name = replyName.trim() || "Anonymous";

    const { error } = await supabase.from("comments").insert([
      {
        post_id: post.id,
        content: replyContent.trim(),
        name: name,
        parent_id: replyingTo,
      },
    ]);

    if (error) {
      console.error("Failed to add reply:", error);
      return;
    }

    setReplyContent("");
    setReplyName("Anonymous");
    setReplyingTo(null);
    
    // Auto-expand the comment that was replied to
    setExpandedComments(prev => new Set([...prev, replyingTo]));
    
    // Fetch comments again
    const { data, error: fetchError } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", post.id)
      .order("created_at", { ascending: false });

    if (!fetchError) {
      const topLevelComments = data.filter(comment => !comment.parent_id)
        .sort((a, b) => {
          // First sort by votes (descending - highest votes first)
          if (b.votes !== a.votes) {
            return b.votes - a.votes;
          }
          // Then sort by created_at (descending - newest first as tiebreaker)
          return new Date(b.created_at) - new Date(a.created_at);
        });
      const replies = data.filter(comment => comment.parent_id);
      const commentsWithReplies = topLevelComments.map(comment => ({
        ...comment,
        replies: replies
          .filter(reply => reply.parent_id === comment.id)
          .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      }));
      setComments(commentsWithReplies);
    }
  };

  const handleReply = (commentId) => {
    setReplyingTo(commentId);
  };

  const cancelReply = () => {
    setReplyingTo(null);
    setReplyContent("");
    setReplyName("Anonymous");
  };

  const toggleReplies = (commentId) => {
    setExpandedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  if (!isOpen || !post) return null;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4 sm:space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold mb-2">{post.title}</h2>
          <p className="text-sm text-gray-700 whitespace-pre-line">
            {post.body}
          </p>
        </div>

        <div className="flex items-center text-xs sm:text-sm text-gray-500 gap-2 sm:gap-4 flex-wrap">
          <div>
            <span className="text-gray-700 font-medium">{post.name || "Anonymous"}</span>
          </div>
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

          <div className="space-y-2 mb-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                placeholder="Anonymous"
                className="w-full sm:w-32 border rounded px-3 py-2 text-sm"
                maxLength={50}
              />
              <input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 border rounded px-3 py-2 text-sm"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <p className="text-xs text-gray-500">Leave name blank to post as Anonymous</p>
              <button
                onClick={handleAddComment}
                className="bg-blue-600 text-white text-sm px-3 py-2 rounded hover:bg-blue-700 self-end sm:self-auto"
              >
                Comment
              </button>
            </div>
          </div>

          {comments.length > 0 ? (
            <div className="space-y-3">
              {comments.map((comment) => {
                const isExpanded = expandedComments.has(comment.id);
                const hasReplies = comment.replies && comment.replies.length > 0;
                
                return (
                  <div key={comment.id} className="space-y-2">
                    {/* Top-level comment */}
                    <Comment
                      id={comment.id}
                      content={comment.content}
                      votes={comment.votes}
                      name={comment.name || "Anonymous"}
                      time={comment.created_at}
                      parent_id={comment.parent_id}
                      hasVoted={hasVoted("comments", comment.id)}
                      onVoteToggle={async () => {
                        await toggleVote("comments", comment.id);
                        // Fetch comments again
                        const { data, error: fetchError } = await supabase
                          .from("comments")
                          .select("*")
                          .eq("post_id", post.id)
                          .order("created_at", { ascending: false });

                        if (!fetchError) {
                          const topLevelComments = data.filter(comment => !comment.parent_id)
                            .sort((a, b) => {
                              // First sort by votes (descending - highest votes first)
                              if (b.votes !== a.votes) {
                                return b.votes - a.votes;
                              }
                              // Then sort by created_at (descending - newest first as tiebreaker)
                              return new Date(b.created_at) - new Date(a.created_at);
                            });
                          const replies = data.filter(comment => comment.parent_id);
                          const commentsWithReplies = topLevelComments.map(comment => ({
                            ...comment,
                            replies: replies
                              .filter(reply => reply.parent_id === comment.id)
                              .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
                          }));
                          setComments(commentsWithReplies);
                        }
                      }}
                      onReply={handleReply}
                    />
                    
                    {/* Show/Hide replies toggle */}
                    {hasReplies && (
                      <div className="ml-8 sm:ml-12">
                        <button
                          onClick={() => toggleReplies(comment.id)}
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                        >
                          {isExpanded ? (
                            <>
                              <span>▼</span>
                              <span>Hide replies</span>
                            </>
                          ) : (
                            <>
                              <span>▶</span>
                              <span>Show {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                    
                    {/* Reply form for this comment */}
                    {replyingTo === comment.id && (
                      <div className="ml-4 sm:ml-8 space-y-2 p-3 bg-gray-50 rounded border">
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            value={replyName}
                            onChange={(e) => setReplyName(e.target.value)}
                            placeholder="Anonymous"
                            className="w-full sm:w-32 border rounded px-2 py-1 text-sm"
                            maxLength={50}
                          />
                          <input
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="Write a reply..."
                            className="flex-1 border rounded px-2 py-1 text-sm"
                            autoFocus
                          />
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                          <p className="text-xs text-gray-500">Replying to {comment.name || "Anonymous"}</p>
                          <div className="flex gap-2 self-end sm:self-auto">
                            <button
                              onClick={cancelReply}
                              className="text-xs px-2 py-1 text-gray-600 hover:text-gray-800"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleAddReply}
                              className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700"
                            >
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Replies to this comment (only show when expanded) */}
                    {hasReplies && isExpanded && (
                      <div className="space-y-2">
                        {comment.replies.map((reply) => (
                          <Comment
                            key={reply.id}
                            id={reply.id}
                            content={reply.content}
                            votes={reply.votes}
                            name={reply.name || "Anonymous"}
                            time={reply.created_at}
                            parent_id={reply.parent_id}
                            hasVoted={hasVoted("comments", reply.id)}
                            onVoteToggle={async () => {
                              await toggleVote("comments", reply.id);
                              // Fetch comments again
                              const { data, error: fetchError } = await supabase
                                .from("comments")
                                .select("*")
                                .eq("post_id", post.id)
                                .order("created_at", { ascending: false });

                              if (!fetchError) {
                                const topLevelComments = data.filter(comment => !comment.parent_id)
                                  .sort((a, b) => {
                                    // First sort by votes (descending - highest votes first)
                                    if (b.votes !== a.votes) {
                                      return b.votes - a.votes;
                                    }
                                    // Then sort by created_at (descending - newest first as tiebreaker)
                                    return new Date(b.created_at) - new Date(a.created_at);
                                  });
                                const replies = data.filter(comment => comment.parent_id);
                                const commentsWithReplies = topLevelComments.map(comment => ({
                                  ...comment,
                                  replies: replies
                                    .filter(reply => reply.parent_id === comment.id)
                                    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
                                }));
                                setComments(commentsWithReplies);
                              }
                            }}
                            // No onReply for replies (flat structure)
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">No comments yet.</p>
          )}
        </div>
      </div>
    </BaseModal>
  );
}
