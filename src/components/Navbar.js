'use client';

export default function Navbar() {
  return (
    <nav className="w-full border-b p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Only In X</h1>
      <button className="text-sm text-gray-600">🌙 Toggle Theme</button>
    </nav>
  );
}
