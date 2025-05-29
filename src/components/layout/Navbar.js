"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="px-3 sm:px-4 bg-white border-b border-gray-100/40 dark:border-gray-700 dark:bg-gray-900 md:px-6 xl:px-0 pb-3 sm:pb-4">
      <div className="max-w-5xl py-3 sm:py-4 pb-0 mx-auto">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center flex-1 w-full mr-2 sm:mr-3 truncate">
            <div className="inline-flex items-center max-w-full truncate">
              <div className="flex items-center justify-center flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 mr-2 overflow-hidden rounded-full border sm:h-9 sm:w-9 dark:bg-gray-800 dark:border-gray-600">
                <span className="inline-block overflow-hidden relative max-w-full">
                  <span className="block max-w-full">
                    <Image
                      alt=""
                      aria-hidden="true"
                      src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2736%27%20height=%2736%27/%3e"
                      className="block max-w-full"
                      width={36}
                      height={36}
                    />
                  </span>
                  <Image
                    alt="profile_pic"
                    src="/morocco_flag.svg"
                    className="absolute inset-0 box-border p-0 m-auto block w-0 h-0 min-w-full max-w-full min-h-full max-h-full object-cover rounded-full"
                    width={36}
                    height={36}
                  />
                </span>
              </div>
              <h2 className="w-full text-sm font-bold text-gray-600 truncate transform-gpu sm:text-xl dark:text-gray-50">
                Only in Morocco
              </h2>
            </div>
          </div>
          <div className="flex items-center flex-shrink-0 space-x-2 sm:space-x-3 sm:space-x-4">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                {theme === "dark" ? (
                  <SunIcon className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                ) : (
                  <MoonIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-800" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
