"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import AnnouncementBox from "@/components/layout/AnnouncementBox";
import FeedHeader from "@/components/layout/FeedHeader";
import PostFeed from "@/components/layout/PostFeed";
import CreatePostModal from "@/components/modal/CreatePostModal";
import ViewPostModal from "@/components/modal/ViewPostModal";

export default function HomePage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl p-4 sm:p-6 flex flex-col gap-6">
        <AnnouncementBox />
        <FeedHeader onPostClick={() => setIsCreateModalOpen(true)} />
        <PostFeed onSelectPost={setSelectedPost} />
      </main>

      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <ViewPostModal
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        post={selectedPost}
      />
    </>
  );
}
