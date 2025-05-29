import { ChevronUpIcon } from "@heroicons/react/20/solid";

export default function Post({ title, body, votes, time }) {
  return (
    <div className="border border-gray-200 rounded-md px-4 py-3 flex gap-4 cursor-pointer hover:bg-gray-100 transition">
      <div className="flex flex-col items-center justify-start pt-1 text-sm text-gray-500">
        <ChevronUpIcon className="w-4 h-4 mb-1 min-w-[40px]" />
        <span className="font-medium text-sm text-gray-800">{votes}</span>
      </div>

      <div className="flex flex-col gap-1 w-full">
        <h2 className="font-semibold text-base text-gray-900">{title}</h2>
        <p className="text-sm text-gray-600">{body}</p>

        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
          <span role="img">🇲🇦</span>
          <span>Morocco</span>
          <span>·</span>
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}
