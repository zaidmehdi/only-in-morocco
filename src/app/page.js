"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import AnnouncementBox from "@/components/AnnouncementBox";
import FeedHeader from "@/components/FeedHeader";
import PostFeed from "@/components/PostFeed";
import CreatePostModal from "@/components/modals/CreatePostModal";
import ViewPostModal from "@/components/modals/ViewPostModal";

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
