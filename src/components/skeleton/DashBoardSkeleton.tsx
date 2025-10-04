
"use client";

export default function DashboardSkeleton() {
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8 bg-gray-900 min-h-screen text-white animate-pulse">
      {/* Title */}
      <div className="h-10 w-2/3 mx-auto rounded-lg bg-gray-700" />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, idx) => (
          <div
            key={idx}
            className="bg-gray-800 p-6 rounded-xl shadow-xl space-y-3"
          >
            <div className="h-4 w-1/2 bg-gray-700 rounded" />
            <div className="h-8 w-1/3 bg-gray-600 rounded" />
          </div>
        ))}
      </div>

      {/* Recent Attempts Table */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-xl">
        <div className="h-6 w-1/4 bg-gray-700 rounded mb-4" />
        <div className="space-y-3">
          {[...Array(5)].map((_, idx) => (
            <div
              key={idx}
              className="grid grid-cols-5 gap-4 items-center"
            >
              {[...Array(5)].map((_, col) => (
                <div
                  key={col}
                  className="h-4 bg-gray-700 rounded w-full"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Quizzes to Retake */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-xl space-y-4">
        <div className="h-6 w-1/3 bg-gray-700 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, idx) => (
            <div
              key={idx}
              className="bg-gray-900 p-4 rounded-xl border border-gray-700 shadow space-y-2"
            >
              <div className="h-4 w-2/3 bg-gray-700 rounded" />
              <div className="h-3 w-1/2 bg-gray-700 rounded" />
              <div className="h-3 w-1/3 bg-gray-700 rounded" />
              <div className="h-8 w-20 bg-gray-600 rounded ml-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

