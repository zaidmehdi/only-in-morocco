"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Post from "@/components/post/Post";
import { toggleVote, hasVoted } from "@/lib/voteUtils";

export default function PostFeed({ onSelectPost, onMount }) {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const { data: posts, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to load posts:", error);
      return;
    }

    const postsWithComments = await Promise.all(
      posts.map(async (post) => {
        const { count, error: countError } = await supabase
          .from("comments")
          .select("*", { count: "exact", head: true })
          .eq("post_id", post.id);

        return {
          ...post,
          commentCount: countError ? 0 : count,
        };
      })
    );

    setPosts(postsWithComments);
  };

  useEffect(() => {
    fetchPosts();
    if (onMount) onMount(fetchPosts);
  }, []);

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} onClick={() => onSelectPost(post)}>
          <Post
            {...post}
            comments={[]}
            hasVoted={hasVoted("posts", post.id)}
            onVoteToggle={async () => {
              await toggleVote("posts", post.id);
              fetchPosts();
            }}
            commentCount={post.commentCount}
          />
        </div>
      ))}
    </div>
  );
}
