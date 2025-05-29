"use client";

import { useState } from "react";
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

export default function SortTabs() {
  const [active, setActive] = useState("New");

  return (
    <div className="flex gap-2">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = active === tab.name;

        return (
          <button
            key={tab.name}
            onClick={() => setActive(tab.name)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-sm transition-colors
              ${
                isActive
                  ? "border-slate-300 bg-slate-100 text-slate-700"
                  : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
              }`}
          >
            <Icon className="w-4 h-4" />
            {tab.name}
          </button>
        );
      })}
    </div>
  );
}
