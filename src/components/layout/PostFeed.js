"use client";

import { useEffect, useState, useCallback, useRef } from "react";
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
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const observer = useRef();

  const POSTS_PER_PAGE = 10;

  const fetchPosts = async (pageNum = 0, isNewSearch = false) => {
    if (loading) return;
    setLoading(true);

    try {
      let query = supabase.from("posts").select("*");

      // Focus on top posts as requested
      if (sort === "New") {
        query = query.order("created_at", { ascending: false });
      } else if (sort === "Top") {
        query = query.order("votes", { ascending: false });
      } else if (sort === "Trending") {
        // For trending, we need to fetch all and calculate scores (simplified for pagination)
        query = query.order("votes", { ascending: false });
      }

      // Add pagination
      const startRange = pageNum * POSTS_PER_PAGE;
      const endRange = startRange + POSTS_PER_PAGE - 1;
      query = query.range(startRange, endRange);

      const { data, error } = await query;
      
      if (error) {
        console.error("Failed to load posts:", error);
        setLoading(false);
        return;
      }

      // Add comment counts
      const postsWithComments = await Promise.all(
        (data || []).map(async (post) => {
          const { count } = await supabase
            .from("comments")
            .select("*", { count: "exact", head: true })
            .eq("post_id", post.id);
          return { ...post, commentCount: count ?? 0 };
        })
      );

      if (isNewSearch || pageNum === 0) {
        setPosts(postsWithComments);
      } else {
        setPosts(prev => [...prev, ...postsWithComments]);
      }

      // Check if we have more posts
      setHasMore(postsWithComments.length === POSTS_PER_PAGE);
      
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchPosts(nextPage, false);
    }
  }, [page, hasMore, loading]);

  // Intersection Observer for infinite scroll
  const lastPostElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, loadMore]);

  useEffect(() => {
    setPage(0);
    setPosts([]);
    setHasMore(true);
    fetchPosts(0, true);
    if (onMount) onMount(() => {
      setPage(0);
      setPosts([]);
      setHasMore(true);
      fetchPosts(0, true);
    });
  }, [sort]);

  const filteredPosts = posts.filter((post) => {
    if (!searchQuery) return true;
    const lower = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(lower) ||
      post.body?.toLowerCase().includes(lower)
    );
  });

  return (
    <div className="space-y-4">
      {filteredPosts.map((post, index) => (
        <div 
          key={post.id} 
          onClick={() => onSelectPost(post)}
          ref={index === filteredPosts.length - 1 ? lastPostElementRef : null}
        >
          <Post
            {...post}
            time={post.created_at}
            hasVoted={hasVoted("posts", post.id)}
            onVoteToggle={async () => {
              await toggleVote("posts", post.id);
              // Refresh current posts without resetting pagination
              const currentPage = Math.floor(posts.length / POSTS_PER_PAGE);
              setPage(0);
              setPosts([]);
              setHasMore(true);
              fetchPosts(0, true);
            }}
            commentCount={post.commentCount}
          />
        </div>
      ))}
      
      {loading && (
        <div className="flex justify-center py-8">
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"></div>
            <span>Loading more posts...</span>
          </div>
        </div>
      )}
      
      {!hasMore && posts.length > 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>You've reached the end! 🎉</p>
        </div>
      )}
      
      {!loading && posts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No posts found.</p>
        </div>
      )}
    </div>
  );
}
