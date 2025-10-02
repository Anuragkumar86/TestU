export default function TopicQuizzesSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-fuchsia-100 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-900 py-16 px-0 animate-pulse">
      <div className="w-full px-8">
        {/* Header */}
        <header className="mb-16 text-center">
          <div className="h-10 w-72 bg-gray-300 dark:bg-gray-700 rounded-lg mx-auto mb-4"></div>
          <div className="h-5 w-80 bg-gray-200 dark:bg-gray-600 rounded-lg mx-auto"></div>
        </header>

        {/* Search Box */}
        <section className="mb-12 flex justify-center">
          <div className="w-full max-w-md h-12 bg-gray-200 dark:bg-gray-700 rounded-xl shadow-lg"></div>
        </section>

        {/* Table Skeleton */}
        <div className="overflow-x-auto w-full rounded-2xl shadow-2xl border border-blue-300 dark:border-blue-700 bg-blue-900 dark:bg-gray-800">
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-4 px-6 py-4 bg-blue-900 dark:bg-blue-900">
            <div className="h-4 w-24 bg-blue-300/40 dark:bg-blue-600/40 rounded"></div>
            <div className="h-4 w-20 bg-blue-300/40 dark:bg-blue-600/40 rounded mx-auto"></div>
            <div className="h-4 w-20 bg-blue-300/40 dark:bg-blue-600/40 rounded mx-auto"></div>
            <div className="h-4 w-24 bg-blue-300/40 dark:bg-blue-600/40 rounded mx-auto"></div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-blue-800 dark:divide-blue-700">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-4 items-center gap-4 px-6 py-6"
              >
                {/* Test Name */}
                <div className="h-4 w-40 bg-gray-300 dark:bg-gray-600 rounded"></div>
                {/* Last Score */}
                <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded mx-auto"></div>
                {/* Status */}
                <div className="h-6 w-16 bg-gray-400 dark:bg-gray-500 rounded-full mx-auto"></div>
                {/* Actions */}
                <div className="flex justify-center gap-3">
                  <div className="h-8 w-20 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                  <div className="h-8 w-28 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
