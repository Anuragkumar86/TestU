import React from "react";

const TopicsSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <h1 className="text-4xl font-bold text-pink-500 mb-2 animate-pulse bg-gray-500"></h1>

      <div className="w-full max-w-md mx-auto mb-8">
        <div className="h-12 bg-gray-700 rounded-md animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
          <div
            key={i}
            className="bg-gray-800 rounded-xl border border-gray-700 p-12 flex flex-col items-center animate-pulse mt-25"
          >
            <div className="w-12 h-12 bg-gray-700 rounded-full mb-4"></div>
            <div className="w-24 h-4 bg-gray-600 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicsSkeleton;
