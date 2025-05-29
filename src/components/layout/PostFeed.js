"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Post from "@/components/post/Post";

export default function PostFeed({ onSelectPost, onMount }) {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setPosts(data);
    else console.error("Failed to load posts:", error);
  };

  const handleVoteToggle = async (postId, hasVoted) => {
    const votedPosts = JSON.parse(localStorage.getItem("votedPosts") || "[]");

    const { data, error } = await supabase
      .from("posts")
      .select("votes")
      .eq("id", postId)
      .single();

    if (error || !data) {
      console.error("Failed to fetch post for voting:", error);
      return;
    }

    let newVotes = data.votes;

    if (hasVoted) {
      newVotes = Math.max(0, newVotes - 1);
      localStorage.setItem(
        "votedPosts",
        JSON.stringify(votedPosts.filter((id) => id !== postId))
      );
    } else {
      newVotes = newVotes + 1;
      localStorage.setItem(
        "votedPosts",
        JSON.stringify([...votedPosts, postId])
      );
    }

    const { error: updateError } = await supabase
      .from("posts")
      .update({ votes: newVotes })
      .eq("id", postId);

    if (updateError) {
      console.error("Failed to update vote count:", updateError);
      return;
    }

    fetchPosts();
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
            hasVoted={
              typeof window !== "undefined" &&
              JSON.parse(localStorage.getItem("votedPosts") || "[]").includes(
                post.id
              )
            }
            onVoteToggle={handleVoteToggle}
          />
        </div>
      ))}
    </div>
  );
}
