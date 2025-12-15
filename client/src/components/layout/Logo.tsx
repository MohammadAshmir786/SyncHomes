export default function Logo({
  size = "md",
  variant = "default",
  layout = "horizontal",
}: {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "text-only";
  layout?: "horizontal" | "vertical" | "icon-only";
}) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const sizeValue = sizes[size] || sizes.md;

  const CreativeIcon = () => (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="homeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e0e7ff" />
        </linearGradient>
      </defs>

      <g>
        <circle
          cx="50"
          cy="50"
          r="42"
          stroke="white"
          strokeWidth="1.5"
          opacity="0.3"
          className="animate-pulse"
        />
        <circle
          cx="50"
          cy="50"
          r="35"
          stroke="white"
          strokeWidth="1.5"
          opacity="0.5"
        />
      </g>

      <g>
        <path
          d="M 50 20 L 75 45 L 25 45 Z"
          fill="url(#homeGradient)"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        <rect
          x="28"
          y="45"
          width="44"
          height="28"
          fill="url(#homeGradient)"
          stroke="white"
          strokeWidth="2"
          rx="2"
        />

        <rect
          x="43"
          y="55"
          width="14"
          height="18"
          fill="white"
          fillOpacity="0.2"
          stroke="white"
          strokeWidth="1.5"
          rx="1"
        />

        <circle cx="56" cy="64" r="1.5" fill="white" opacity="0.8" />

        <rect
          x="33"
          y="50"
          width="7"
          height="7"
          fill="white"
          fillOpacity="0.15"
          stroke="white"
          strokeWidth="1"
        />

        <rect
          x="60"
          y="50"
          width="7"
          height="7"
          fill="white"
          fillOpacity="0.15"
          stroke="white"
          strokeWidth="1"
        />
      </g>

      <g>
        <circle
          cx="15"
          cy="50"
          r="2.5"
          fill="white"
          className="animate-pulse"
        />
        <circle cx="85" cy="50" r="2.5" fill="white" opacity="0.6" />
        <line
          x1="20"
          y1="50"
          x2="80"
          y2="50"
          stroke="white"
          strokeWidth="1"
          opacity="0.3"
        />
      </g>
    </svg>
  );

  if (layout === "vertical" && variant === "default") {
    return (
      <div className="flex flex-col items-center gap-2 group cursor-pointer">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-white"></div>
          <CreativeIcon />
        </div>
        <div className="text-center">
          <h2 className="text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            SyncHomes
          </h2>
          <p className="text-xs text-gray-500 font-medium">Real Estate Sync</p>
        </div>
      </div>
    );
  }

  if (layout === "horizontal" && variant === "text-only") {
    return (
      <div className="flex items-center gap-3 group cursor-pointer">
        <div
          className={`${sizeValue} rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110`}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-white"></div>
          <CreativeIcon />
        </div>
        <div className="hidden sm:flex flex-col">
          <span className="font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            SyncHomes
          </span>
          <span className="text-xs text-gray-500">Real Estate Platform</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${sizeValue} rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer group`}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-white"></div>
      <CreativeIcon />
    </div>
  );
}
