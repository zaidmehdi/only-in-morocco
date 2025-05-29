"use client";

import {
  ClockIcon,
  FireIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/20/solid";

const tabs = [
  { name: "New", icon: ClockIcon },
  { name: "Top", icon: ArrowTrendingUpIcon },
  { name: "Trending", icon: FireIcon },
];

export default function SortTabs({ activeTab, onChange }) {
  return (
    <div className="flex gap-2">
      {tabs.map(({ name, icon: Icon }) => {
        const isActive = activeTab === name;
        return (
          <button
            key={name}
            onClick={() => onChange(name)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-sm transition-colors
              ${
                isActive
                  ? "border-slate-300 bg-slate-100 text-slate-700"
                  : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
              }`}
          >
            <Icon className="w-4 h-4" />
            {name}
          </button>
        );
      })}
    </div>
  );
}
