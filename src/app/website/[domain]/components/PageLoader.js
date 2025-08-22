"use client";

import LoadingSpinner from "./LoadingSpinner";

export default function PageLoader({
  palette = { primary: "#3b82f6" },
  text = "Loading...",
  size = "large",
  className = "",
}) {
  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center bg-gray-50 ${className}`}
    >
      <LoadingSpinner size={size} palette={palette} className="mb-4" />
      {text && <p className="text-gray-600 text-lg font-medium">{text}</p>}
    </div>
  );
}
