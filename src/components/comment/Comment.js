"use client";

import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { formatDistanceToNow } from "date-fns";

export default function Comment({
  id,
  content,
  votes,
  name = "Anonymous",
  time,
  onVoteToggle,
  hasVoted,
}) {
  return (
    <div className="flex border border-gray-200 rounded-md overflow-hidden text-sm bg-white">
      <button
        onClick={() => onVoteToggle?.(id, hasVoted)}
        className={`w-12 flex flex-col items-center justify-center border-r border-gray-200 transition ${
          hasVoted ? "bg-blue-50 text-blue-600" : "bg-gray-50 hover:bg-gray-100"
        }`}
      >
        <ChevronUpIcon className="w-4 h-4" />
        <span className="font-medium">{votes}</span>
      </button>

      <div className="px-3 py-2 flex-1">
        <div className="text-xs text-gray-600 font-medium mb-1 flex items-center gap-2">
          <span>{name}</span>
          <span>·</span>
          <span>
            {time
              ? formatDistanceToNow(new Date(time), { addSuffix: true })
              : "some time ago"}
          </span>
        </div>
        <div className="text-gray-800">{content}</div>
      </div>
    </div>
  );
}
