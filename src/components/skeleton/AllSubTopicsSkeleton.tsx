export default function QuizPageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 
dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-16 px-0 animate-soft-pulse select-none">
      {/* Header Skeleton */}
      <div className="max-w-screen-xl mx-auto px-6 mb-16 text-center">
        <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-md max-w-48 mx-auto mb-4"></div>
        <div className="h-5 bg-gray-200 dark:bg-gray-600 rounded-md max-w-96 mx-auto"></div>
      </div>

      {/* Search Box Skeleton */}
      <div className="flex justify-center mb-12">
        <div className="w-full max-w-md h-12 bg-gray-200 dark:bg-gray-700 rounded-xl shadow-inner"></div>
      </div>

      {/* Table Skeleton */}
      <div className="overflow-x-auto w-full rounded-2xl shadow-2xl border border-gray-300 dark:border-gray-700 bg-gray-900 dark:bg-gray-950 mx-auto px-4">
        <table className="w-full min-w-full divide-y divide-gray-700 dark:divide-gray-600">
          <thead className="bg-gray-800 dark:bg-gray-900 sticky top-0 z-10">
            <tr>
              {["Test Name", "Last Score", "Status", "Actions"].map((header) => (
                <th
                  key={header}
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 dark:divide-gray-700">
            {/* Show 5 skeleton rows */}
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="border-b border-gray-700">
                <td className="px-6 py-4">
                  <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mx-auto"></div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mx-auto"></div>
                </td>
                <td className="px-6 py-4 text-center flex gap-2 justify-center">
                  <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                  <div className="h-8 w-28 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
