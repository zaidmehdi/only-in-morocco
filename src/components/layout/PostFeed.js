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

  useEffect(() => {
    fetchPosts();
    if (onMount) onMount(fetchPosts);
  }, []);

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} onClick={() => onSelectPost(post)}>
          <Post {...post} comments={[]} />
        </div>
      ))}
    </div>
  );
}
