"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="px-4 bg-white border-b border-gray-100/40 dark:border-gray-700 dark:bg-gray-900 md:px-6 xl:px-0 pb-4">
      <div className="max-w-5xl py-4 pb-0 mx-auto">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center flex-1 w-full mr-3 truncate">
            <div className="inline-flex items-center max-w-full truncate">
              <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 mr-2 overflow-hidden rounded-full border sm:h-9 sm:w-9 dark:bg-gray-800 dark:border-gray-600">
                <span className="inline-block overflow-hidden relative max-w-full">
                  <span className="block max-w-full">
                    <img
                      alt=""
                      aria-hidden="true"
                      src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2736%27%20height=%2736%27/%3e"
                      className="block max-w-full"
                    />
                  </span>
                  <img
                    alt="profile_pic"
                    src="/morocco_flag.svg"
                    className="absolute inset-0 box-border p-0 m-auto block w-0 h-0 min-w-full max-w-full min-h-full max-h-full object-cover rounded-full"
                  />
                </span>
              </div>
              <h2 className="w-full text-sm font-bold text-gray-600 truncate transform-gpu sm:text-xl dark:text-gray-50">
                Only in Morocco
              </h2>
            </div>
          </div>
          <div className="flex items-center flex-shrink-0 space-x-3 sm:space-x-4">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="h-9 w-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                {theme === "dark" ? (
                  <SunIcon className="h-5 w-5 text-yellow-400" />
                ) : (
                  <MoonIcon className="h-5 w-5 text-gray-800" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
