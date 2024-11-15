import { useState } from "react";
import { format } from "date-fns";
import { Search, Calendar, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import youth from "../assets/youth.png";
import community from "../assets/community_hearth.jpg";
import logo2 from "../assets/logo_2.png";
import NavBar from "./NavBar";

const POSTS_PER_PAGE = 6;

const ActivityPosts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Sample data - in a real app, this would come from an API
  const activities = [
    {
      id: 1,
      title: "Youth Education Workshop",
      category: "education",
      date: "2024-03-15",
      image: youth,
      description:
        "Join us for an interactive workshop focusing on STEM education for local youth.",
      content: "Detailed description of the workshop and its objectives...",
    },
    {
      id: 2,
      title: "Community Health Fair",
      category: "health",
      date: "2024-03-20",
      image: community,
      description:
        "Free health screenings and wellness education for community members.",
      content: "Information about the health fair services and schedule...",
    },
    // Add more sample activities...
  ];

  const categories = [
    { value: "all", label: "All Activities" },
    { value: "education", label: "Education" },
    { value: "health", label: "Health" },
    { value: "environment", label: "Environment" },
  ];

  const filteredActivities = activities.filter(activity => {
    const matchesSearch =
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || activity.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredActivities.length / POSTS_PER_PAGE);
  const currentActivities = filteredActivities.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation bar can be reused from main page */}
      <NavBar />

      {/* Header */}
      <div className="bg-text text-background pt-40 pb-20 ">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentActivities.map(activity => (
            <div
              key={activity.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={activity.image}
                alt={activity.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Calendar size={16} />
                  {format(new Date(activity.date), "MMM dd, yyyy")}
                  <Tag size={16} className="ml-2" />
                  {activity.category}
                </div>
                <h3 className="text-xl font-bold text-text mb-2">
                  {activity.title}
                </h3>
                <p className="text-gray-600 mb-4">{activity.description}</p>
                <button className="text-primary hover:text-secondary font-medium">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
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
              disabled={currentPage === totalPages}
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
      <footer className="bg-text text-background py-12 border-t border-background/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img src={logo2} alt="" className="w-28" />
              <p className="text-gray-300">
                Empowering communities through sustainable development,
                education, and environmental conservation.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-background">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-background">
                    Our Activities
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-background">
                    Get Involved
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-background">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-background">
                    Donate
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-background">
                    Volunteer
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-background">
                    Partner with Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Stay Connected</h3>
              <p className="text-gray-300 mb-4">
                Subscribe to our newsletter for updates
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-l-lg bg-backtext-background/10 border border-backtext-background/20 focus:outline-none focus:border-primary flex-grow"
                />
                <button className="bg-primary px-4 py-2 rounded-r-lg hover:bg-[#388E3C] transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-background/10 text-center text-gray-300">
            <p>
              &copy; 2024 Bloom for Tomorrow Foundation. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ActivityPosts;
