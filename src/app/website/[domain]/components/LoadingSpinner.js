"use client";

export default function LoadingSpinner({
  size = "default",
  palette = { primary: "#3b82f6" },
  className = "",
}) {
  // Size variants
  const sizeClasses = {
    small: "w-8 h-8",
    default: "w-12 h-12",
    large: "w-16 h-16",
    xlarge: "w-20 h-20",
  };

  const sizeClass = sizeClasses[size] || sizeClasses.default;

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClass} animate-spin rounded-full border-4 border-gray-200 border-t-transparent`}
        style={{
          borderTopColor: palette.primary || "#3b82f6",
        }}
      />
    </div>
  );
}
