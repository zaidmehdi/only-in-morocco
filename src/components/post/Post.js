import {
  ChevronUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/20/solid";

export default function Post({ title, body, votes, time, comments = [] }) {
  return (
    <div className="border border-gray-200 rounded-md px-4 py-3 flex gap-4 cursor-pointer hover:bg-gray-100 transition relative">
      <div className="flex flex-col items-center justify-start pt-1 text-sm text-gray-500 min-w-[40px]">
        <ChevronUpIcon className="w-4 h-4 mb-1" />
        <span className="font-medium text-sm text-gray-800">{votes}</span>
      </div>

      <div className="flex flex-col gap-1 w-full pr-10">
        {" "}
        <h2 className="font-semibold text-base text-gray-900">{title}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">{body}</p>
        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
          <span role="img">🇲🇦</span>
          <span>Morocco</span>
          <span>·</span>
          <span>{time}</span>
        </div>
      </div>

      <div className="absolute right-4 bottom-3 flex items-center gap-1 text-xs text-gray-400">
        <ChatBubbleOvalLeftEllipsisIcon className="w-4 h-4" />
        <span>{comments.length}</span>
      </div>
    </div>
  );
}
