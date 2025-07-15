import React from "react";

const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center space-y-4 py-10">
    <div className="relative w-16 h-16">
      {/* Background ring (white) */}
      <div className="absolute inset-0 rounded-full border-4 border-white"></div>

      {/* Spinning arc (green) */}
      <div className="absolute inset-0 rounded-full border-4 border-green-500 border-t-transparent border-l-transparent animate-spin"></div>

      {/* Inner glowing dot */}
      <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-green-400 rounded-full shadow-md transform -translate-x-1/2 -translate-y-1/2"></div>
    </div>

    {/* Loading text */}
    <p className="text-green-600 font-semibold tracking-wide">Loading applications...</p>
  </div>
);

export default LoadingSpinner;
