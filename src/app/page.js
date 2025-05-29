"use client";

import Navbar from "@/components/Navbar";
import AnnouncementBox from "@/components/AnnouncementBox";
import FeedHeader from "@/components/FeedHeader";
import PostFeed from "@/components/PostFeed";
import PostModal from "@/components/PostModal";
import { useState } from "react";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl p-4 sm:p-6 flex flex-col gap-6">
        <AnnouncementBox />
        <FeedHeader />
        <PostFeed />
      </main>

      <PostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
