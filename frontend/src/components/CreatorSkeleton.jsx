const CreatorSkeleton = () => {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg h-80 bg-gray-200 animate-pulse">
      {/* Background Skeleton */}
      <div className="absolute inset-0 bg-gray-300"></div>
      
      {/* Content Skeleton */}
      <div className="relative h-full flex flex-col justify-end p-6">
        <div className="mb-4">
          {/* Title Skeleton */}
          <div className="h-7 w-3/4 bg-gray-400 rounded mb-3"></div>
          
          {/* Description Skeleton */}
          <div className="space-y-2">
            <div className="h-3 bg-gray-400 rounded w-full"></div>
            <div className="h-3 bg-gray-400 rounded w-5/6"></div>
            <div className="h-3 bg-gray-400 rounded w-4/6"></div>
          </div>
        </div>

        {/* Buttons Skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-5 h-5 bg-gray-400 rounded-full mr-2"></div>
            <div className="h-4 w-12 bg-gray-400 rounded"></div>
          </div>
          
          <div className="flex space-x-2">
            <div className="w-10 h-10 rounded-full bg-gray-400"></div>
            <div className="w-10 h-10 rounded-full bg-gray-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorSkeleton;
