"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import BaseModal from "./BaseModal";

export default function CreatePostModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const title = e.target.title.value.trim();
    const body = e.target.body.value.trim();

    if (!title || !body) {
      setError("Both title and body are required.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("posts").insert([{ title, body }]);

    setLoading(false);

    if (error) {
      console.error(error);
      setError("Failed to submit post.");
    } else {
      onClose();
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} maxWidth="max-w-lg">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        🇲🇦 Share your Morocco story
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            name="title"
            type="text"
            placeholder="Briefly describe your experience..."
            className="w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={200}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Your story <span className="text-red-500">*</span>
          </label>
          <textarea
            name="body"
            placeholder="Tell us what happened..."
            className="w-full border rounded px-3 py-2 text-sm h-32 resize-none outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={2000}
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded hover:bg-gray-50"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-rose-500 text-white rounded hover:bg-rose-600"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Story"}
          </button>
        </div>
      </form>
    </BaseModal>
  );
}
