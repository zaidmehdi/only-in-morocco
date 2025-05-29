import {
  ChevronUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/20/solid";

export default function Post({
  id,
  title,
  body,
  votes,
  time,
  comments = [],
  onVote,
}) {
  return (
    <div className="border border-gray-200 rounded-md flex overflow-hidden transition hover:bg-gray-50">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onVote?.(id);
        }}
        className="w-14 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 border-r border-gray-200"
      >
        <ChevronUpIcon className="w-5 h-5 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">{votes}</span>
      </button>

      <div className="flex flex-col gap-1 w-full px-4 py-3 relative">
        <h2 className="font-semibold text-base text-gray-900">{title}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">{body}</p>

        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
          <span role="img">🇲🇦</span>
          <span>Morocco</span>
          <span>·</span>
          <span>{time}</span>
        </div>

        <div className="absolute right-4 bottom-3 flex items-center gap-1 text-xs text-gray-400">
          <ChatBubbleOvalLeftEllipsisIcon className="w-4 h-4" />
          <span>{comments.length}</span>
        </div>
      </div>
    </div>
  );
}
