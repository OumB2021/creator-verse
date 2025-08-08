import Creator from "../components/Creator";
import CreatorSkeleton from "../components/CreatorSkeleton";
import EmptyCreators from "../components/EmptyCreators";
import { useCreators } from "../context/CreatorsContext";

const ShowCreators = () => {
  const { creators, loading } = useCreators();

  const handleEdit = (id) => {
    // Handle edit functionality here
    console.log("Edit creator with id:", id);
  };

  return (
    <div className="mt-20 py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          // Show skeleton loaders with header
          <>
            <div className="text-center mb-12 animate-pulse">
              <div className="h-10 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6)
                .fill()
                .map((_, index) => (
                  <CreatorSkeleton key={`skeleton-${index}`} />
                ))}
            </div>
          </>
        ) : creators.length > 0 ? (
          // Show actual content with header
          <>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Our Talented Creators
              </h1>
              <p className="text-xl text-gray-600">
                Discover and connect with amazing creators from around the world
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {creators.map((creator) => (
                <Creator
                  key={creator.id}
                  id={creator.id}
                  name={creator.name}
                  description={creator.description}
                  url={creator.url}
                  imageUrl={creator.imageUrl}
                  onEdit={() => handleEdit(creator.id)}
                />
              ))}
            </div>
          </>
        ) : (
          // Show empty state with add creator button
          <EmptyCreators />
        )}
      </div>
    </div>
  );
};

export default ShowCreators;
