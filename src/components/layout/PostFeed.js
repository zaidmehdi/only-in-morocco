"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Post from "@/components/post/Post";
import { toggleVote, hasVoted } from "@/lib/voteUtils";

export default function PostFeed({
  sort,
  searchQuery = "",
  onSelectPost,
  onMount,
}) {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    let query = supabase.from("posts").select("*");

    if (sort === "New") {
      query = query.order("created_at", { ascending: false });
    } else if (sort === "Top") {
      query = query.order("votes", { ascending: false });
    } else if (sort === "Trending") {
      const { data, error } = await supabase.from("posts").select("*");
      if (error) return console.error(error);

      const now = new Date();

      const withScore = data.map((post) => {
        const ageInHours =
          (now - new Date(post.created_at)) / 1000 / 60 / 60 || 1;
        const score = post.votes / ageInHours;
        return { ...post, _score: score };
      });

      withScore.sort((a, b) => b._score - a._score);

      const postsWithComments = await Promise.all(
        withScore.map(async (post) => {
          const { count } = await supabase
            .from("comments")
            .select("*", { count: "exact", head: true })
            .eq("post_id", post.id);
          return { ...post, commentCount: count ?? 0 };
        })
      );

      setPosts(postsWithComments);
      return;
    }

    const { data, error } = await query;
    if (!error) {
      const postsWithComments = await Promise.all(
        data.map(async (post) => {
          const { count } = await supabase
            .from("comments")
            .select("*", { count: "exact", head: true })
            .eq("post_id", post.id);
          return { ...post, commentCount: count ?? 0 };
        })
      );
      setPosts(postsWithComments);
    } else {
      console.error("Failed to load posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
    if (onMount) onMount(fetchPosts);
  }, [sort]);

  const filteredPosts = posts.filter((post) => {
    const lower = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(lower) ||
      post.body?.toLowerCase().includes(lower)
    );
  });

  return (
    <div className="space-y-4">
      {filteredPosts.map((post) => (
        <div key={post.id} onClick={() => onSelectPost(post)}>
          <Post
            {...post}
            time={post.created_at}
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
