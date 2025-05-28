'use client';

import Navbar from '@/components/Navbar';
import AnnouncementBox from '@/components/AnnouncementBox';
import SortTabs from '@/components/SortTabs';
import SearchBar from '@/components/SearchBar';
import PostButton from '@/components/PostButton';
import PostFeed from '@/components/PostFeed';
import PostModal from '@/components/PostModal';
import { useState } from 'react';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl p-4 sm:p-6 flex flex-col gap-6">
        <AnnouncementBox />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <SearchBar />
          <SortTabs />
          <PostButton onClick={() => setIsModalOpen(true)}/>
        </div>

        <PostFeed />
      </main>

      <PostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
