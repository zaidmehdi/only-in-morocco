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

  const handleVote = async (postId) => {
    const votedPosts = JSON.parse(localStorage.getItem("votedPosts") || "[]");

    if (votedPosts.includes(postId)) {
      console.log("Already voted on this post.");
      return;
    }

    const { data, error } = await supabase
      .from("posts")
      .select("votes")
      .eq("id", postId)
      .single();

    if (error) {
      console.error("Failed to fetch post for voting:", error);
      return;
    }

    const { error: updateError } = await supabase
      .from("posts")
      .update({ votes: data.votes + 1 })
      .eq("id", postId);

    if (updateError) {
      console.error("Failed to update votes:", updateError);
      return;
    }

    localStorage.setItem("votedPosts", JSON.stringify([...votedPosts, postId]));

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
          <Post {...post} comments={[]} onVote={handleVote} />
        </div>
      ))}
    </div>
  );
}
