import BaseModal from "./BaseModal";

export default function CreatePostModal({ isOpen, onClose }) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} maxWidth="max-w-lg">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        🇲🇦 Share your Morocco story
      </h2>

      <form className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Briefly describe your experience..."
            className="w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={200}
          />
          <div className="text-xs text-gray-500 mt-1">0/200 characters</div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Your story <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Tell us what happened, how it felt, and what could have been better."
            className="w-full border rounded px-3 py-2 text-sm h-32 resize-none outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={2000}
          />
          <div className="text-xs text-gray-500 mt-1">0/2000 characters</div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-3 py-2 rounded text-sm">
          <strong>Remember:</strong> your post is completely anonymous. No
          personal information will be shared.
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-rose-500 text-white rounded hover:bg-rose-600"
          >
            Post Story
          </button>
        </div>
      </form>
    </BaseModal>
  );
}
