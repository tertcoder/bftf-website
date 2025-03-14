import { useState } from "react";
import { format } from "date-fns";
import { Search, Calendar, Tag, Loader2 } from "lucide-react";
import NavBar from "./NavBar";
import { useActivities } from "../features/activities/queries";
import Footer from "./Footer";

const ActivityPosts = () => {
  const [currentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const {
    data: activitiesData,
    isLoading,
    error,
  } = useActivities({
    page: currentPage,
    category: selectedCategory,
    searchTerm: searchTerm,
  });

  const categories = [
    { value: "all", label: "All Activities" },
    { value: "education", label: "Education" },
    { value: "health", label: "Health" },
    { value: "environment", label: "Environment" },
  ];

  // Calculate pagination
  // const totalPages = 6;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="min-h-[400px] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="min-h-[400px] flex items-center justify-center">
          <p className="text-red-500">
            Failed to load activities. Please try again later.
          </p>
        </div>
      );
    }

    if (!activitiesData?.data?.length) {
      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center">
          <Calendar className="w-16 h-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Activities Found
          </h3>
          <p className="text-gray-600">
            {searchTerm || selectedCategory !== "all"
              ? "Try adjusting your search or filter criteria"
              : "No activities have been posted yet"}
          </p>
        </div>
      );
    }

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activitiesData.data.map(activity => (
          <div
            key={activity.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform"
          >
            <img
              src={activity.image_url}
              alt={activity.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Calendar size={16} />
                {format(new Date(activity.created_at), "MMM dd, yyyy")}
                <Tag size={16} className="ml-2" />
                {activity.category}
              </div>
              <h3 className="text-xl font-bold text-text mb-2">
                {activity.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {activity.description}
              </p>
              {/* <button
                // onClick={() => navigate(`/activities/${activity.id}`)}
                className="text-primary hover:text-secondary font-medium flex items-center gap-2"
              >
                Read More <ChevronRight size={16} />
              </button> */}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      {/* Header */}
      <div className="bg-text text-background pt-40 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center">Our Activities</h1>
          <p className="text-center mt-4 max-w-2xl mx-auto">
            Discover our latest initiatives and join us in making a difference
            in our community
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 min-h-screen py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search activities..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* Activities Grid */}
        {renderContent()}

        {/* Pagination */}
        {/* {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || isLoading}
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-text">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage(prev => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages || isLoading}
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )} */}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ActivityPosts;
