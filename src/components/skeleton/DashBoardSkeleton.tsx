export default function  DashboardSkeleton() {
  return (
    <div className="container mx-auto p-4 md:p-8 animate-pulse">
      {/* Header */}
      <div className="h-8 w-72 bg-gray-300 rounded-lg mb-6"></div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-start"
          >
            <div className="h-5 w-32 bg-gray-300 rounded mb-3"></div>
            <div className="h-8 w-16 bg-gray-400 rounded"></div>
          </div>
        ))}
      </div>

      {/* Recent Attempts Table */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="h-6 w-56 bg-gray-300 rounded mb-4"></div>

        {/* Table header */}
        <div className="grid grid-cols-5 gap-4 border-b border-gray-200 py-3 bg-gray-50">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-3 w-20 bg-gray-300 rounded mx-auto"
            ></div>
          ))}
        </div>

        {/* Table rows */}
        <div>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-5 gap-4 items-center py-4 border-b border-gray-100"
            >
              <div className="h-4 w-28 bg-gray-200 rounded mx-auto"></div>
              <div className="h-4 w-20 bg-gray-200 rounded mx-auto"></div>
              <div className="h-4 w-12 bg-gray-200 rounded mx-auto"></div>
              <div className="h-5 w-16 bg-gray-300 rounded-full mx-auto"></div>
              <div className="h-4 w-24 bg-gray-200 rounded mx-auto"></div>
            </div>
          ))}
        </div>

        {/* Pagination skeleton */}
        <div className="flex justify-center items-center mt-4 space-x-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-8 w-10 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>

      {/* Quizzes to Retake */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="h-6 w-64 bg-gray-300 rounded mb-4"></div>
        <div className="h-4 w-96 bg-gray-200 rounded mb-6"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-100 p-4 rounded-lg border border-gray-300"
            >
              <div className="h-5 w-40 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
              <div className="h-4 w-28 bg-gray-200 rounded mb-1"></div>
              <div className="h-4 w-36 bg-gray-200 rounded mb-2"></div>
              <div className="h-8 w-20 bg-gray-300 rounded mt-2 ml-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
