"use client";

import { ChevronUpIcon } from "@heroicons/react/20/solid";

export default function Comment({
  id,
  content,
  votes,
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

      <div className="px-3 py-2 flex-1 text-gray-800">{content}</div>
    </div>
  );
}
