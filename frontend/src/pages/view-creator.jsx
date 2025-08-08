import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Loader2,
  Trash2,
  Edit,
  X,
  ArrowBigLeft,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

// Custom hook to handle clicks outside of an element
const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

const ViewCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const deleteDialogRef = useRef(null);

  // Close dialog when clicking outside
  useOnClickOutside(deleteDialogRef, () => setShowDeleteDialog(false));

  // Prevent body scroll when dialog is open
  useEffect(() => {
    if (showDeleteDialog) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showDeleteDialog]);

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const response = await fetch(`http://localhost:4000/creators/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch creator");
        }
        const data = await response.json();
        setCreator(data);
      } catch (error) {
        console.error("Error fetching creator:", error);
        toast.error("Failed to load creator details");
        navigate("/creators");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCreator();
    }
  }, [id, navigate]);

  const handleDelete = async () => {
    setShowDeleteDialog(false);
    setIsDeleting(true);
    try {
      const response = await fetch(`http://localhost:4000/creators/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete creator");
      }

      toast.success("Creator deleted successfully");
      navigate("/creators");
    } catch (error) {
      console.error("Error deleting creator:", error);
      toast.error(error.message || "Failed to delete creator");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen mt-20 flex items-center justify-center">
        <Loader2 className="animate-spin text-gray-600" />
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center text-gray-500 hover:text-gray-900 transition-colors"
                aria-label="Go back"
              >
                <svg
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back
              </button>
              <div className="flex space-x-2">
                <Link
                  to={`/creators/${id}/edit`}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                >
                  <Edit className="h-3.5 w-3.5 mr-1.5" />
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => setShowDeleteDialog(true)}
                  disabled={isDeleting}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <div className="text-center mb-8">
            <div className="mx-auto h-32 w-32 rounded-full overflow-hidden border border-gray-200 mb-6">
              <img
                src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Creator"
                className="h-full w-full object-cover"
              />
            </div>
            <h1 className="text-3xl font-medium text-gray-900 mb-2">
              Creator not found
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-20 px-4 sm:px-6">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Go back"
            >
              <svg
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back
            </button>
            <div className="flex space-x-2">
              <Link
                to={`/creators/${id}/edit`}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                <Edit className="h-3.5 w-3.5 mr-1.5" />
                Edit
              </Link>
              <button
                type="button"
                onClick={() => setShowDeleteDialog(true)}
                disabled={isDeleting}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center mb-8">
          <div className="mx-auto h-56 w-56 rounded-full overflow-hidden border border-gray-200 mb-6">
            <img
              src={
                creator.imageUrl ||
                "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              }
              alt={creator.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
              }}
            />
          </div>
          <h1 className="text-3xl font-medium text-gray-900 mb-2">
            {creator.name}
          </h1>

          {creator.url && (
            <div className="mt-2">
              <a
                href={creator.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 inline-flex items-center justify-center text-sm"
              >
                <svg
                  className="h-3.5 w-3.5 mr-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                {new URL(creator.url).hostname}
              </a>
            </div>
          )}
        </div>

        {creator.description && (
          <div className="mt-8 border-t border-gray-100 pt-8">
            <h2 className="text-center md:text-left text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
              About
            </h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed text-center md:text-left">
                {creator.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCreator;
