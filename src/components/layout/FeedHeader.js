"use client";

import SortTabs from "../ui/SortTabs";
import SearchBar from "../ui/SearchBar";
import PostButton from "../post/PostButton";

export default function FeedHeader({
  onPostClick,
  sort,
  setSort,
  searchQuery,
  setSearchQuery,
}) {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-3">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-3 flex-1">
        <SortTabs activeTab={sort} onChange={setSort} />
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>
      <PostButton onClick={onPostClick} />
    </div>
  );
}
