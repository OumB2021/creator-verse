import Creator from "../components/Creator";
import CreatorSkeleton from "../components/CreatorSkeleton";
import { useState, useEffect } from "react";

// Dummy creators data
const dummyCreators = [
  {
    id: 1,
    name: "Alex Johnson",
    description:
      "3D artist specializing in character design and animation. Passionate about bringing imaginative worlds to life through digital art.",
    url: "https://example.com/creator/alex-johnson",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  },
  {
    id: 2,
    name: "Sarah Chen",
    description:
      "Digital illustrator and concept artist with a focus on fantasy and sci-fi themes. Loves creating immersive environments and characters.",
    url: "https://example.com/creator/sarah-chen",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  },
  {
    id: 3,
    name: "Marcus Rodriguez",
    description:
      "Motion graphics specialist and VFX artist. Creates stunning visual effects and animations for films and commercials.",
    url: "https://example.com/creator/marcus-rodriguez",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  },
  {
    id: 4,
    name: "Priya Patel",
    description:
      "UI/UX designer with a passion for creating intuitive and beautiful digital experiences. Specializes in mobile app design.",
    url: "https://example.com/creator/priya-patel",
    imageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
  },
  {
    id: 5,
    name: "Jordan Smith",
    description:
      "Photographer and visual storyteller. Captures authentic moments and creates compelling visual narratives.",
    url: "https://example.com/creator/jordan-smith",
    imageUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  },
  {
    id: 6,
    name: "Taylor Kim",
    description:
      "Graphic designer and illustrator. Creates bold, colorful designs that tell a story and capture attention.",
    url: "https://example.com/creator/taylor-kim",
    // No imageUrl to demonstrate the placeholder
  },
];

const ShowCreators = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleEdit = (id) => {
    // Handle edit functionality here
    console.log("Edit creator with id:", id);
  };

  useEffect(() => {
    const fetchCreators = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:4000/creators");

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response:", errorText);
          throw new Error(
            `Server responded with ${response.status}: ${errorText}`
          );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          console.error("Expected an array but got:", typeof data);
          throw new Error(
            "Expected an array of creators but got something else"
          );
        }

        setCreators(data);
      } catch (error) {
        console.error("Error in fetchCreators:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCreators();
  }, []);

  return (
    <div className="mt-20 py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Talented Creators
          </h1>
          <p className="text-xl text-gray-600">
            Discover and connect with amazing creators from around the world
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Show skeleton loaders
            Array(6)
              .fill()
              .map((_, index) => <CreatorSkeleton key={`skeleton-${index}`} />)
          ) : creators.length > 0 ? (
            // Show actual creator cards
            dummyCreators.map((creator) => (
              <Creator
                key={creator.id}
                name={creator.name}
                description={creator.description}
                url={creator.url}
                imageUrl={creator.imageUrl}
                onEdit={() => handleEdit(creator.id)}
              />
            ))
          ) : (
            // Show message if no creators found
            <div className="col-span-full text-center py-10">
              <p className="text-gray-600">No creators found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowCreators;
