import type { ReactNode } from "react";

interface ErrorBoxProps {
  title?: string;
  message?: ReactNode;
  onRetry?: () => void;
  className?: string;
}

export default function ErrorBox({
  title = "Something went wrong",
  message,
  onRetry,
  className = "",
}: ErrorBoxProps) {
  return (
    <div
      className={`rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 ${className}`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 text-lg" aria-hidden>
          ⚠️
        </span>
        <div className="space-y-2">
          <div className="font-semibold text-red-900">{title}</div>
          {message && <div className="text-red-800">{message}</div>}
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="mt-1 inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
