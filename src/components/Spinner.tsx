"use client"

export default function Spinner() {
  return (
    <div className="flex justify-center items-center h-32">
      <div className="animate-spin h-10 w-10 border-4 border-t-blue-500 border-gray-300 rounded-full" />
    </div>
  );
}