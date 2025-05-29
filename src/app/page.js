"use client";

import { useState, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import AnnouncementBox from "@/components/layout/AnnouncementBox";
import FeedHeader from "@/components/layout/FeedHeader";
import PostFeed from "@/components/layout/PostFeed";
import CreatePostModal from "@/components/modal/CreatePostModal";
import ViewPostModal from "@/components/modal/ViewPostModal";

export default function HomePage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [sort, setSort] = useState("New");
  const [searchQuery, setSearchQuery] = useState("");

  const refreshPostsRef = useRef(() => {});

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl p-3 sm:p-4 md:p-6 flex flex-col gap-4 sm:gap-6">
        <AnnouncementBox />
        <FeedHeader
          onPostClick={() => setIsCreateModalOpen(true)}
          sort={sort}
          setSort={setSort}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <PostFeed
          sort={sort}
          searchQuery={searchQuery}
          onSelectPost={setSelectedPost}
          onMount={(refreshFn) => (refreshPostsRef.current = refreshFn)}
        />
      </main>

      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          refreshPostsRef.current();
        }}
      />

      <ViewPostModal
        isOpen={!!selectedPost}
        onClose={() => {
          setSelectedPost(null);
          refreshPostsRef.current();
        }}
        post={selectedPost}
      />
    </>
  );
}
