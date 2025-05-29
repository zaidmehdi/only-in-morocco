"use client";

import {
  ChevronUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/20/solid";
import { formatDistanceToNow } from "date-fns";

export default function Post({
  id,
  title,
  body,
  votes,
  time,
  name = "Anonymous",
  commentCount = 0,
  onVoteToggle,
  hasVoted,
}) {
  return (
    <div className="border border-gray-200 rounded-md flex overflow-hidden transition hover:bg-gray-50">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onVoteToggle?.(id, hasVoted);
        }}
        className={`w-12 sm:w-14 flex flex-col items-center justify-center border-r border-gray-200 transition ${
          hasVoted ? "bg-blue-50 text-blue-600" : "bg-gray-50 hover:bg-gray-100"
        }`}
      >
        <ChevronUpIcon className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-xs sm:text-sm font-medium">{votes}</span>
      </button>

      {/* UPDATED: Use flex-1 and min-w-0 to fix mobile layout issues */}
      <div className="flex flex-col gap-1 flex-1 min-w-0 px-3 sm:px-4 py-2 sm:py-3 relative min-h-[80px] sm:min-h-[90px]">
        <h2 className="font-semibold text-sm sm:text-base text-gray-900 pr-8 sm:pr-0 line-clamp-1 break-words">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-1 break-words pr-8 sm:pr-0">
          {body}
        </p>

        <div className="flex items-center gap-1 sm:gap-2 mt-1 text-xs text-gray-500 pr-8 sm:pr-0 overflow-hidden">
          <span className="text-gray-700 font-medium truncate">{name}</span>
          <span className="hidden sm:inline flex-shrink-0">·</span>
          <span role="img" className="hidden sm:inline flex-shrink-0">
            🇲🇦
          </span>
          <span className="hidden sm:inline flex-shrink-0">Morocco</span>
          <span className="hidden sm:inline flex-shrink-0">·</span>
          <span className="flex-shrink-0">
            {time
              ? formatDistanceToNow(new Date(time), { addSuffix: true })
              : "some time ago"}
          </span>
        </div>

        <div className="absolute right-2 sm:right-4 bottom-2 sm:bottom-3 flex items-center gap-1 text-xs text-gray-400">
          <ChatBubbleOvalLeftEllipsisIcon className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>{commentCount}</span>
        </div>
      </div>
    </div>
  );
}
