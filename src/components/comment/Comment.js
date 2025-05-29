"use client";

import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { formatDistanceToNow } from "date-fns";

export default function Comment({
  id,
  content,
  votes,
  name = "Anonymous",
  time,
  parent_id,
  onVoteToggle,
  onReply,
  hasVoted,
}) {
  const isTopLevel = !parent_id;

  return (
    <div className={`flex border border-gray-200 rounded-md overflow-hidden text-sm bg-white ${!isTopLevel ? 'ml-4 sm:ml-8' : ''}`}>
      <button
        onClick={() => onVoteToggle?.(id, hasVoted)}
        className={`w-10 sm:w-12 flex flex-col items-center justify-center border-r border-gray-200 transition ${
          hasVoted ? "bg-blue-50 text-blue-600" : "bg-gray-50 hover:bg-gray-100"
        }`}
      >
        <ChevronUpIcon className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="font-medium text-xs sm:text-sm">{votes}</span>
      </button>

      <div className="px-2 sm:px-3 py-2 flex-1">
        <div className="text-xs text-gray-600 font-medium mb-1 flex items-center gap-1 sm:gap-2 flex-wrap">
          <span>{name}</span>
          <span className="hidden sm:inline">·</span>
          <span className="text-xs">
            {time
              ? formatDistanceToNow(new Date(time), { addSuffix: true })
              : "some time ago"}
          </span>
        </div>
        <div className="text-gray-800 mb-2 text-xs sm:text-sm break-words">{content}</div>
        
        {isTopLevel && onReply && (
          <button
            onClick={() => onReply(id)}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            Reply
          </button>
        )}
      </div>
    </div>
  );
}
