import SortTabs from "./SortTabs";
import SearchBar from "./SearchBar";
import PostButton from "./PostButton";

export default function FeedHeader({ onPostClick }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <SortTabs />
      <SearchBar />
      <PostButton onClick={onPostClick} />
    </div>
  );
}
