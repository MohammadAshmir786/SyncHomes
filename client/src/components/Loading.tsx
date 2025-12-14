import type { ReactNode } from "react";

interface LoadingProps {
  message?: ReactNode;
  fullScreen?: boolean;
  className?: string;
}

export default function Loading({
  message = "Loading...",
  fullScreen = true,
  className = "",
}: LoadingProps) {
  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? "min-h-screen" : "py-8"
      } ${className}`}
      aria-live="polite"
      role="status"
    >
      <div className="text-center space-y-3">
        <div className="mx-auto h-12 w-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
        {message && <div className="text-gray-700 font-medium">{message}</div>}
      </div>
    </div>
  );
}
