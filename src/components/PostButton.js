'use client';

export default function PostButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="self-center mt-6 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
    >
      Post your story
    </button>
  );
}
