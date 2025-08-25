"use client";

import LoadingSpinner from "./LoadingSpinner";

export default function PageLoader({
  palette = { primary: "#3b82f6" },
  size = "large",
  className = "",
}) {
  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gray-50 ${className}`}
    >
      <LoadingSpinner size={size} palette={palette} />
    </div>
  );
}
