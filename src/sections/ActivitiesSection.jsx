import { useNavigate } from "react-router-dom";
import { ArrowRight, CalendarX, Plus } from "lucide-react";
import { useActivities } from "../features/activities/queries";
import { useUser } from "../features/auth/useAuth";

const icons = {
  ChevronRight: () => (
    <svg
      className="w-4 h-4 ml-1"
      fill="none"
      stroke="#37474F"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  ),
};

function ActivitiesSection() {
  const navigate = useNavigate();
  const { user } = useUser();

  const {
    data: activitiesData,
    isLoading,
    error,
  } = useActivities({
    page: 1,
    category: "all",
    searchTerm: "",
  });

  // Show loading state
  if (isLoading) {
    return (
      <section className="py-20 bg-backtext-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-text text-center mb-12">
            Our Activities
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map(skeleton => (
              <div
                key={skeleton}
                className="bg-backtext-background rounded-lg shadow-lg overflow-hidden animate-pulse"
              >
                <div className="w-full h-48 bg-gray-200" />
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-full mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="py-20 bg-backtext-background">
        <div className="container mx-auto px-4 text-center text-red-600">
          Error loading activities
        </div>
      </section>
    );
  }

  console.log(activitiesData);
  // Get only the first 3 activities
  const latestActivities =
    activitiesData?.data
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 3) || [];

  // Show empty state
  if (!latestActivities.length) {
    return (
      <section className="py-20 bg-backtext-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-text text-center mb-12">
            Our Activities
          </h2>
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <div className="max-w-md mx-auto">
              <CalendarX className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Activities Yet
              </h3>
              <p className="text-gray-600 mb-6">
                We haven&apos;t posted any activities yet. Check back soon for
                updates!
              </p>
              {/* Only show this button if you have an activities creation page */}
              {user && (
                <button
                  onClick={() => navigate("/create-activity")}
                  className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create First Activity
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="activities" className="py-20 bg-backtext-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-text text-center mb-12">
          Our Activities
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {latestActivities.map(activity => (
            <div
              key={activity.id}
              className="bg-backtext-background rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform"
            >
              <img
                src={activity.image_url}
                alt={activity.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-text mb-2">
                  {activity.title}
                </h3>
                <p className="text-gray-600 mb-4">{activity.description}</p>
                <button
                  // onClick={() => navigate(`/activities/${activity.id}`)}
                  className="text-primary hover:text-[#388E3C] font-medium flex items-center"
                >
                  Read More <icons.ChevronRight />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => navigate("/activities-posts")}
          className="bg-secondary p-4 rounded-full flex mx-auto mt-16 text-background font-semibold items-center gap-2"
        >
          See All Activities <ArrowRight />
        </button>
      </div>
    </section>
  );
}

export default ActivitiesSection;
