import SortTabs from "./SortTabs";
import SearchBar from "./SearchBar";
import PostButton from "./PostButton";

export default function FeedHeader({ onPostClick }) {
  return (
    <div className="flex justify-between gap-3">
      <SortTabs />
      <SearchBar />
      <PostButton onClick={onPostClick} />
    </div>
  );
}
