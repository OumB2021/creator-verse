import { Globe, Pencil, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Creator = ({ id, name, url, description, imageUrl, onEdit }) => {
  const navigate = useNavigate();

  const handleView = (e) => {
    e.stopPropagation();
    console.log("from handleView", name);
    navigate(`/creators/${id}`);
  };
  const defaultImage =
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] h-80 group">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0">
        <img
          src={imageUrl || defaultImage}
          alt={`${name}'s profile`}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultImage;
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 group-hover:bg-opacity-40 transition-all duration-300" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 text-white">
        <div className="mb-4">
          <h3 className="text-2xl font-bold mb-2">{name}</h3>
          <p className="text-zinc-300 line-clamp-3 text-sm">{description}</p>
        </div>

        <div className="flex items-center justify-between">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-white hover:text-gray-200 transition-colors bg-white bg-opacity-10 backdrop-blur-sm rounded-full px-4 py-2"
            aria-label="Visit profile"
          >
            <Globe className="w-5 h-5 mr-1" />
            <span className="text-sm font-medium">Visit</span>
          </a>

          <div className="flex space-x-2">
            <button
              onClick={onEdit}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-sm transition-all"
              aria-label="Edit creator"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={handleView}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-sm transition-all"
              aria-label="View creator"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creator;
