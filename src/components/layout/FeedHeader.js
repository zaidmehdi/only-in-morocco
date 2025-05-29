import SortTabs from "../ui/SortTabs";
import SearchBar from "../ui/SearchBar";
import PostButton from "../post/PostButton";

export default function FeedHeader({ onPostClick }) {
  return (
    <div className="flex justify-between gap-3">
      <SortTabs />
      <SearchBar />
      <PostButton onClick={onPostClick} />
    </div>
  );
}
