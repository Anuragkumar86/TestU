export default function NavbarSkeleton() {
  return (
    <div className="w-full h-14 flex items-center justify-between px-6 bg-white border-b">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
        <div className="h-6 w-20 bg-gray-500 rounded-md animate-pulse"></div>
      </div>

      {/* Right: Nav + Coins + Avatar */}
      <div className="flex items-center space-x-6">
        {/* Nav links */}
        <div className="h-5 w-16 bg-gray-500 rounded-md animate-pulse"></div>
        <div className="h-5 w-20 bg-gray-500 rounded-md animate-pulse"></div>

        {/* Coins */}
        <div className="flex items-center space-x-2">
          <div className="h-5 w-5 bg-gray-500 rounded-full animate-pulse"></div>
          <div className="h-5 w-10 bg-gray-500 rounded-md animate-pulse"></div>
        </div>

        {/* Avatar */}
        <div className="h-9 w-9 bg-gray-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}
